// lib/controllers/calendar.js

var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Calendar = mongoose.model('Calendar');


// Get taks of specific day
exports.getMonth = function(req, res) {
  var year = JSON.parse(req.params.year),
      month = JSON.parse(req.params.month),
      push = {};
  push[year] = {};

  Calendar
  .findOne()
  .exec(function(err, calendar) {
    if (!calendar) {
      calendar = new Calendar();
    }
    if (err) {
      return res.end();
    };
    //There is no year, create the one requested
    if (!calendar.year) {
      calendar.year = push;
    };
    //There is no month, create the one requested
    if (!calendar.year[year][month]) {
      calendar.year[year][month] = {};
    };
    //Month has no days, create days
    if(Object.keys(calendar.year[year][month]).length === 0){
      var daysinmonth = new Date(year, month, 0).getDate();
      for (var i = 1; i <= daysinmonth; i++) {
        calendar.year[year][month][i] = [];
      };
    }
    //Send back the calendar
    calendar.markModified('year');
    calendar.save(function(){
      res.json(calendar.year[year][month]);
    });
  })
};

// Get tasks of specific day
exports.getDay = function(req, res) {
  var year = JSON.parse(req.params.year),
      month = JSON.parse(req.params.month),
      day = JSON.parse(req.params.day);
  Calendar
  .findOne()
  .exec(function(err, calendar) {
    res.json({response:calendar.year[year][month][day]});
  });
};

// Create a post
exports.create = function(req, res) {
  var year = JSON.parse(req.params.year),
      month = JSON.parse(req.params.month),
      day = JSON.parse(req.params.day);
      newtask = req.body;
  newtask._id = new ObjectId;

  Calendar
  .findOne()
  .exec(function(err, calendar) {
    calendar.year[year][month][day].push(newtask);
    calendar.markModified('year');
    calendar.save();
    res.json(newtask);
  });
};

// Remove a todo
exports.remove = function(req, res) {
  var year = JSON.parse(req.params.year),
      month = JSON.parse(req.params.month),
      day = JSON.parse(req.params.day),
      id = req.params.id;

  Calendar
  .findOne()
  .exec(function(err, calendar) {
    for (var i = calendar.year[year][month][day].length - 1; i >= 0; i--) {
      var task = calendar.year[year][month][day][i];
      if (task._id == id) {
        calendar.year[year][month][day].splice(i,1);
        calendar.markModified('year');
        calendar.save();
        res.json(task);
      }
    };
  });
};