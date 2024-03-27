const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'techdinos');

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
}

module.exports = UserController;
