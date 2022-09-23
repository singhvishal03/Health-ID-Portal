const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Importing Models
const Admin = require('../../models/Admin');

//@route              POST api/admin
//@desc               Register Admin
//@access_modifier    Public
router.post(
  '/',
  [
    check('adminid', 'Login ID is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { adminid, password } = req.body;

    try {
      // // See if doctor exists
      // let admin = await Admin.findOne({ adminid });

      // if (admin) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'Dcotor already exists' }] });
      // }

      // //Check if password and confirm password matches

      // if (password !== confirmpassword) {
      //   return res.status(400).json({
      //     errors: [{ msg: 'Password and Confirm Password does not match' }],
      //   });
      // }

      const admin = new Admin({
        adminid,
        password,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      // Return jsonwebtoken
      const payload = {
        admin: {
          id: admin.id,
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
