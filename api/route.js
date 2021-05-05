const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
let Registration = require('./schema/User')
//NOTE  Registration route
router.post('/register', (req, res) => {
  Registration.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    } else {
      if (req.body.password === req.body.repeatPassword) {
        const newUser = new Registration({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err)
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      } else {
        res.status(400).send('password missmatch')
      }
    }
  })
})

// Login Router
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // Find user by email
  Registration.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' })
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.username,
          email: user.email
        }
        // Sign token
        res.send(payload)
      } else {
        return res.status(400).json({ passwordincorrect: 'Password incorrect' })
      }
    })
  })
})
module.exports = router
