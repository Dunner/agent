// models/sound.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var postSchema = new Schema({
    userId : String,
    years : [
      {
        year: Number,
        months: [
          {
            month: Number,
            days: [
              {
                day: Number,
                tasks: [
                  {
                    task: String,
                    hour: Number
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
});

var yearSchema = new Schema({
  year: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);