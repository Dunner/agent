// lib/controllers/posts.js

var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Post = mongoose.model('Post');



// Get taks of specific day
exports.query = function(req, res) {
  var lookfor = {
    year: JSON.parse(req.params.year),
    month: JSON.parse(req.params.month),
    day: JSON.parse(req.params.day)
  };
  Post
  .findOne()
  .exec(function(err, calendar) {
    for (var i = calendar.years.length - 1; i >= 0; i--) {
      var year = calendar.years[i];
      if (year.year === lookfor.year) {
        for (var i = year.months.length - 1; i >= 0; i--) {
          var month = year.months[i];
          if (month.month === lookfor.month) {

            //Wish I didn't need this. warning
            if (month.days.length - 1 < 0) {
              console.log('que2');
              month.days.push({
                day: lookfor.day
              });
              calendar.save(function(){
                console.log('day added2');
              });
            };
            //

            for (var i = month.days.length - 1; i >= 0; i--) {
              var day = month.days[i];
              if (day.day === lookfor.day) {
                res.json(day.tasks);
                res.end();
                return;
              }else if (i === 0) {
                console.log('que2');
                month.days.push({
                  day: lookfor.day
                });
                calendar.save(function(){
                  console.log('day added');
                });
                i = month.days.length;
                console.log('dayskip')
                continue;
              }
            }
          }else if (i === 0) {
            year.months.push({
              month: lookfor.month
            });
            calendar.save(function(){
              console.log('month added');
            });
            i = year.months.length;
            console.log('monthskip')
            continue;
          }
        }
      }else if (i === 0) {
        calendar.years.push({
          year: lookfor.year
        });
        calendar.save(function(){
          i = calendar.years.length;
          console.log('year added');
          res.end();
        });
        i = calendar.years.length;
        console.log('yearskip')
        continue;
      }
    };
    res.end();
  });
};

// Create a post
exports.create = function(req, res) {
  var post = req.body;
  console.log(post)
  var lookfor = {
    year: JSON.parse(req.params.year),
    month: JSON.parse(req.params.month),
    day: JSON.parse(req.params.day)
  };
  Post
  .findOne()
  .exec(function(err, calendar) {
    for (var i = calendar.years.length - 1; i >= 0; i--) {
      var year = calendar.years[i];
      if (year.year === lookfor.year) {
        for (var i = year.months.length - 1; i >= 0; i--) {
          var month = year.months[i];
          if (month.month === lookfor.month) {
            for (var i = month.days.length - 1; i >= 0; i--) {
              var day = month.days[i];
              if (day.day === lookfor.day) {
                post._id = new ObjectId;
                day.tasks.push(post);
                calendar.save();
                res.json(post);
              }else if (i === 0) {
                return res.end();
              }
            }
          }else if (i === 0) {
            return res.end();
          }
        }
      }else if (i === 0) {
        return res.end();
      }
    };
  });
};



// Update a todo

// exports.update = function(req, res) {
//   Todo.update({ _id: req.todo._id }, req.body, { }, function(err, updatedTodo) {
//     if (err) return res.json(500, err);
//     res.json(updatedTodo);
//   });
// };


// Remove a todo

exports.remove = function(req, res) {
  var lookfor = {
    year: JSON.parse(req.params.year),
    month: JSON.parse(req.params.month),
    day: JSON.parse(req.params.day),
    id: req.params.id
  };
  Post
  .findOne()
  .exec(function(err, calendar) {
    for (var i = calendar.years.length - 1; i >= 0; i--) {
      var year = calendar.years[i];
      if (year.year === lookfor.year) {
        for (var i = year.months.length - 1; i >= 0; i--) {
          var month = year.months[i];
          if (month.month === lookfor.month) {
            for (var i = month.days.length - 1; i >= 0; i--) {
              var day = month.days[i];
              if (day.day === lookfor.day) {
                for (var i = day.tasks.length - 1; i >= 0; i--) {
                  var task = day.tasks[i];
                  if (task._id == lookfor.id) {
                    res.json(task);
                    day.tasks.splice(i,1);
                    console.log('removed '+day.tasks);
                    calendar.save();
                  }else if (i === 0) {
                    return res.end();
                  }
                }
              }else if (i === 0) {
                return res.end();
              }
            }
          }else if (i === 0) {
            return res.end();
          }
        }
      }else if (i === 0) {
        return res.end();
      }
    };
  });
};