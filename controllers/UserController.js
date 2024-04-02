const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Item = require('../models/Item');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../utils/email');

const mySecret = process.env.JWT_SECRET || 'techdinos';

class UserController {
  static async register(req, res) {
    try {
      const {
        username, email, password, fullName, phoneNumber,
      } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const verificationToken = jwt.sign({ email }, mySecret, { expiresIn: '24h' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        verificationToken,
      });

      await newUser.save();

      sendVerificationEmail(email, verificationToken);
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserFromToken(req, res) {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user from token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static logout(req, res) {
    res.clearCookie('jwtToken');
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  static async updateUserProfile(req, res) {
    try {
      const userId = req.userId;
      const { fullName, email, phoneNumber } = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, { fullName, email, phoneNumber }, { new: true });

      return res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async changePassword(req, res) {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { currentPassword, newPassword } = req.body;

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteAccount(req, res) {
    try {
      const userId = req.userId;
      await Item.deleteMany({ owner: userId });

      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async initiatePasswordReset(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = jwt.sign({ userId: user._id }, mySecret, { expiresIn: '1h' });
      user.resetToken = resetToken;
      await user.save();

      await sendPasswordResetEmail(email, resetToken);

      return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error initiating password reset:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async renderPasswordResetForm(req, res) {
    try {
      const resetToken = req.params.token;
      res.render('password-reset-form', { token: resetToken });
    } catch (error) {
      console.error('Error rendering password reset form:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const decodedToken = jwt.verify(token, mySecret);
      const currentTime = Date.now();

      if (decodedToken.exp * 1000 < currentTime) {
        return res.status(400).json({ message: 'Reset token has expired' });
      }

      const { userId } = decodedToken;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ message: 'Invalid reset token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Reset token has expired' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: 'User not found or already verified' });
      }

      user.verified = true;
      user.verificationToken = undefined;
      await user.save();

      return res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;
