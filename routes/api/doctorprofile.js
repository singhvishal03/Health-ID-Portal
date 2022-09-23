const express = require('express');
const router = express.Router();
const auth = require('../../middleware/doctorauth');
const { check, validationResult } = require('express-validator');

// Importing Models
const Profile = require('../../models/DoctorProfile');
// const Doctor = require('../../models/Doctor');

//@route              GET api/doctor/profile/me
//@desc               Get current Doctor profile
//@access_modifier    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ doctor: req.doctor.id }).populate(
      'doctor',
      ['fname', 'lname']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this doctor' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error ...');
  }
});

//@route              POST api/doctor/profile
//@desc               Register Doctor
//@access_modifier    Public
router.post(
  '/',

  [auth, [check('phoneno', 'Phone Number is required').not().isEmpty()]],
  [auth, [check('email', 'Please include a valid email').isEmail()]],
  [auth, [check('department', 'Department is required').not().isEmpty()]],
  [auth, [check('gender', 'Gender is required').not().isEmpty()]],
  [auth, [check('experience', 'Experience is required').not().isEmpty()]],
  [
    auth,
    [
      check('consultancycharge', 'Consultancy Charge is required')
        .not()
        .isEmpty(),
    ],
  ],
  [auth, [check('status', 'Status is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      phoneno,
      email,
      department,
      gender,
      experience,
      consultancycharge,
      status,
    } = req.body;
    // Build Profile object
    const profileFields = {};
    profileFields.doctor = req.doctor.id;
    if (phoneno) profileFields.phoneno = phoneno;
    if (email) profileFields.email = email;
    if (department) profileFields.department = department;
    if (gender) profileFields.gender = gender;
    if (experience) profileFields.experience = experience;
    if (consultancycharge) profileFields.consultancycharge = consultancycharge;
    if (status) profileFields.status = status;

    try {
      let profile = await Profile.findOne({ doctor: req.doctor.id });
      if (profile) {
        // Update Profile
        profile = await Profile.findOneAndUpdate(
          { doctor: req.doctor.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create if no profile is present
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
    // console.log(profileFields);
    // res.send('Hello');
  }
);

//@route              GET api/doctor/profile
//@desc               Get all doctor profiles
//@access_modifier    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('doctor', [
      'fname',
      'lname',
      'doctorid',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route              GET api/doctor/profile/:doctor_id
//@desc               Get profile by user ID
//@access_modifier    Public
router.get('/:doctor_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      doctor: req.params.doctor_id,
    }).populate('doctor', ['fname', 'lname', 'doctorid']);
    if (!profile)
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this userID' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this userID' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
