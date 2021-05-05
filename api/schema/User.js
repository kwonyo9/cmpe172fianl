const mongoose = require('mongoose')
const Schema = mongoose.Schema

//SECTION  collection and schema for Registration
let UserSchema = new Schema(
  {
    username: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"]
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    collection: 'User'
  }
)

module.exports = mongoose.model('User', UserSchema)
