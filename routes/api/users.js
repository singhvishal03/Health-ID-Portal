const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Importing Models
const User = require('../../models/User');

//@route              POST api/users
//@desc               Register user
//@access_modifier    Public
router.post(
  '/',
  [
    check('fname', 'Name is required').not().isEmpty(),
    check('healthid', 'Health ID is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('confirmpassword', 'Confirm Password is required').not().isEmpty(),
    check('phoneno', 'Please enter a valid phone number').isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fname,
      lname,
      healthid,
      email,
      password,
      confirmpassword,
      phoneno,
    } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //Check if password and confirm password matches

      if (password !== confirmpassword) {
        return res.status(400).json({
          errors: [{ msg: 'Password and Confirm Password does not match' }],
        });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm', // default image like user icon
      });

      user = new User({
        fname,
        lname,
        healthid,
        email,
        password,
        avatar,
        confirmpassword,
        phoneno,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      user.confirmpassword = await bcrypt.hash(confirmpassword, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),

        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error...');
    }
  }
);

module.exports = router;
