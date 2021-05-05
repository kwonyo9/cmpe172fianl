const mongoose = require('mongoose')
const Schema = mongoose.Schema

//SECTION  collection and schema for Registration
let SeatSchema = new Schema(
  {
    seatID: {
      type: String,
      required: [true, "can't be blank"]
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "can't be blank"]
    }
  },
  {
    collection: 'Seat'
  }
)

module.exports = mongoose.model('Seat', SeatSchema)
