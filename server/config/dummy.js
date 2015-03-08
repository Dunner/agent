'use strict';

var mongoose = require('mongoose'),
   Calendar = mongoose.model('Calendar');

// Calendar.find({}).remove(function() {
//     var newCalendar = new Calendar();
//     newCalendar.year = {2015: {}};
//     newCalendar.year[2015][0] = {};
//     newCalendar.save(function(err, post) {
//       if (err)
//         console.log(err);
//       console.log('dummy created', post);
//     });
// });