// models/calendar.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var calendarSchema = new Schema({
  year : {}
}, { strict: false });

// create the model for users and expose it to our app
module.exports = mongoose.model('Calendar', calendarSchema);