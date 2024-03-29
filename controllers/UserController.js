const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Item = require('../models/Item');
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

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
      });

      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserFromToken(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, mySecret);

      const user = await User.findById(decodedToken.userId);
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
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
      const decodedToken = jwt.verify(token, mySecret);
      if (!decodedToken) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      const { userId } = decodedToken;
      const { name, email, phoneNumber } = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, { name, email, phoneNumber }, { new: true });

      return res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async changePassword(req, res) {
    try {
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, mySecret);
      if (!decodedToken) { return res.status(401).json({ message: 'Unauthorized: Invalid token' }); }
      const user = await User.findById(decodedToken.userId);
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
      const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const decodedToken = jwt.verify(token, mySecret);
      if (!decodedToken) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      const userId = decodedToken.userId;
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
}

module.exports = UserController;
