const express = require('express');
const router = express.Router();
const auth = require('../../middleware/doctorauth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');

//@route              POST api/doctorauth
//@desc               Authenticate doctor & get token
//@access_modifier    Public
router.post(
  '/',
  [
    // check('fname', 'Name is required').not().isEmpty(),
    check('adminid', 'Please include a valid adminid').exists(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //fname, lname, healthid,
    const { adminid, password } = req.body;

    try {
      // See if admin exists
      let admin = await Admin.findOne({ adminid });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        doctor: {
          id: admin.id,
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
