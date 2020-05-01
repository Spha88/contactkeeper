const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password'); //this returns user or error.
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
   '/',
   [
      check('email', 'Please include a valid email.').isEmail(),
      check('password', 'Password is required.').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ erros: errors.array() }); // Return if we have validation errors
      }

      const { email, password } = req.body;

      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // Check if the user exists
         }
         const isMatch = await bcrypt.compare(password, user.password); //check if the password matches

         if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // if doesn't match
         }
         // JSON WEBTOKEN
         //=================================
         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
               expiresIn: 360000,
            },
            (err, token) => {
               if (err) throw err;
               res.json({ token });
            }
         );
         //=================================
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server error');
      }
   }
);

module.exports = router;
