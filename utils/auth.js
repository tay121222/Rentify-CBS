require('dotenv').config();
const jwt = require('jsonwebtoken');

const mySecret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || mySecret);
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decodedToken.userId;
    // console.log('Decoded user ID:', req.userId);
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = verifyToken;
