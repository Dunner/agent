'use strict';

var mongoose = require('mongoose'),
   Calendar = mongoose.model('Calendar'),
   Post = mongoose.model('Post');

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


// Remove all sounds and add dummy
Post.find({}).remove(function() {

    // var userId  = 1,
    //     newPost = new Post();


    // newPost.userId = userId;
    // newPost.years.push({
    //   year: 2015
    // });
    // newPost.years[0].months.push({
    //   month: 1,
    // })
    // newPost.years[0].months[0].days.push({
    //   day: 1,
    // })
    // newPost.years[0].months[0].days[0].tasks.push({
    //   task: 'test-task',
    //   hour: 1
    // })
    // newPost.save(function(err) {
    //   if (err)
    //     console.log(err);
    //   console.log('dummy created');
    // });

    // setTimeout(function(){
    //   var lookfor = {
    //     year: 2015,
    //     month: 1,
    //     day: 1
    //   };

    //   Post
    //   .findOne()
    //   .exec(function(err, calendar) {
    //     for (var i = calendar.years.length - 1; i >= 0; i--) {
    //       var year = calendar.years[i];
    //       if (year.year === lookfor.year) {
    //         for (var i = year.months.length - 1; i >= 0; i--) {
    //           var month = year.months[i];
    //           if (month.month === lookfor.month) {
    //             for (var i = month.days.length - 1; i >= 0; i--) {
    //               var day = month.days[i];
    //               if (day.day === lookfor.day) {
    //                 console.log(day.tasks);
    //               }else if (i === 0) {
    //                 console.log('this day doesnt exist')
    //               }
    //             }
    //           }else if (i === 0) {
    //             console.log('this month doesnt exist')
    //           }
    //         }
    //       }else if (i === 0) {
    //         console.log('this year doesnt exist')
    //       }
    //     };
    //   });
    // },100)



});
