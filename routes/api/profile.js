const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route              GET api/profile/me
//@desc               Get current user profile
//@access_modifier    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['fname', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error ...');
  }
});

//@route              POST api/profile
//@desc               Create/Update user profile
//@access_modifier    Private
router.post(
  '/',
  [auth, [check('gender', 'Gender is required').not().isEmpty()]],
  [auth, [check('dob', 'Date of Birth is required').not().isEmpty()]],
  [auth, [check('bloodgroup', 'Blood Group is required').not().isEmpty()]],
  [auth, [check('state', 'State is required').not().isEmpty()]],
  [auth, [check('district', 'District is required').not().isEmpty()]],
  [auth, [check('address', 'Address is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gender, dob, bloodgroup, state, district, address, healthidno } =
      req.body;

    // Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (gender) profileFields.gender = gender;
    if (dob) profileFields.dob = new Date(dob);
    if (bloodgroup) profileFields.bloodgroup = bloodgroup;
    if (state) profileFields.state = state;
    if (district) profileFields.district = district;
    if (address) profileFields.address = address;
    if (healthidno) profileFields.healthidno = healthidno;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
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

//@route              GET api/profile
//@desc               Get all profiles
//@access_modifier    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'fname',
      'lname',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route              GET api/profile/user/:user_id
//@desc               Get profile by user ID
//@access_modifier    Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['fname', 'lname', 'avatar']);
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

//@route              DELETE api/profile/
//@desc               Delete profile & user
//@access_modifier    Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
