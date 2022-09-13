const express = require('express');
const router = express.Router();
const auth = require('../../middleware/doctorauth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Doctor = require('../../models/Doctor');

//@route              GET api/doctorauth/:id
//@desc               Test route
//@access_modifier    Public
router.get('/', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select(
      '-password -confirmpassword'
    );
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('There was a Server Error');
  }
});

//@route              POST api/doctorauth
//@desc               Authenticate doctor & get token
//@access_modifier    Public
router.post(
  '/',
  [
    // check('fname', 'Name is required').not().isEmpty(),
    check('doctorid', 'Please include a valid doctorid').exists(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //fname, lname, healthid,
    const { doctorid, password } = req.body;

    try {
      // See if doctor exists
      let doctor = await Doctor.findOne({ doctorid });

      if (!doctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        doctor: {
          id: doctor.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { notBefore: 10 },
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
