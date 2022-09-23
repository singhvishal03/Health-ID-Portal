const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if tokens are present
  try {
    if (token) {
      const decoded = jwt.verify(token, 'mysecrettoken');
      req.admin = decoded.admin;
      next();
    } else {
      return res
        .status(401)
        .json({ msg: 'No token present, authorization denied' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
