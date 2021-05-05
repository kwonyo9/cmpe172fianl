const express = require('express')
const router = express.Router()
let Seat = require('./schema/Seats')
//NOTE  Registration route
router.post('/register', (req, res) => {
  if (req.body.seatID && req.body.userID) {
    Seat.find({ seatID: req.body.seatID }).then((seat, err) => {
      if (seat) {
        seat.remove().exec()
        return res.send('removed', req.body.seatID)
      }
    })
    let newSeat = new Seat({
      seatID: req.body.seatID,
      userID: req.body.userID
    })
    newSeat
      .save()
      .then(seat => res.json(seat))
      .catch(err => console.log(err))
  }
})
router.get('/', (req, res) => {
  Seat.find().then((result, err) => {
    if (err) console.log(err)
    res.send(result)
  })
})
router.get('/:userID', (req, res) => {
  let seats = Seat.find({ userID })
  res.send(seats)
})
router.delete('/:seatID', (req, res) => {
  Seat.findByIdAndDelete(req.params.seatID).then((result, err) => {
    if (err) res.send(err)
    res.send(result)
  })
})

// Login Router
module.exports = router
