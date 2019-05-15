const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const passport = require('passport');

// come back later and fix the res => res.json(...)
// deconstruct to only show information we want to have

router.get("/test", (req, res) => res.json({ msg: "this is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
})

router.post('/register', (req, res) => {
  console.log("we were able to hit register route")
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = { id: user.id, name: user.name };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 604800 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  console.log("we were able to hit login route")
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'This user does not exist';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then( isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 604800 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors);
          }
        })
    })
})



module.exports = router;
