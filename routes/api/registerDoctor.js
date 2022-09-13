const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Importing Models
const Doctor = require('../../models/Doctor');

//@route              POST api/doctor
//@desc               Register Doctor
//@access_modifier    Public
router.post(
  '/',
  [
    check('fname', 'Name is required').not().isEmpty(),
    check('doctorid', 'Login ID is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('confirmpassword', 'Confirm Password is required').not().isEmpty(),
    check('phoneno', 'Please enter a valid phone number').isMobilePhone(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('experience', 'Experience is required').not().isEmpty(),
    check('consultancycharge', 'Consultancy Charge is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fname,
      lname,
      doctorid,
      department,
      email,
      password,
      confirmpassword,
      phoneno,
      gender,
      experience,
      consultancycharge,
      status,
    } = req.body;

    try {
      // See if doctor exists
      let doctor = await Doctor.findOne({ doctorid });

      if (doctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Dcotor already exists' }] });
      }

      //Check if password and confirm password matches

      if (password !== confirmpassword) {
        return res.status(400).json({
          errors: [{ msg: 'Password and Confirm Password does not match' }],
        });
      }

      doctor = new Doctor({
        fname,
        lname,
        doctorid,
        department,
        email,
        password,
        confirmpassword,
        phoneno,
        gender,
        experience,
        consultancycharge,
        status,
      });

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      doctor.password = await bcrypt.hash(password, salt);
      doctor.confirmpassword = await bcrypt.hash(confirmpassword, salt);

      await doctor.save();

      // Return jsonwebtoken
      const payload = {
        doctor: {
          id: doctor.id,
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
