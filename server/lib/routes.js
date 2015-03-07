// lib/routes.js

'use strict';
var middleware = require('./middleware'),
    index = require('./controllers/index'),
    posts = require('./controllers/posts'),
    calendar = require('./controllers/calendar');

module.exports = function(app) {
  // Server API Routes
  // -------
  // Posts
  // -------
  // app.get('/api/posts', posts.query);
  app.get('/api/posts/:year/:month/:day', posts.query);
  app.post('/api/posts/:year/:month/:day', posts.create);
  app.delete('/api/posts/:year/:month/:day/:id', posts.remove);
  // -------
  // Calendar
  // -------
  app.get('/api/calendar/:year/:month/:day', calendar.query);
  app.post('/api/calendar/:year/:month/:day', calendar.create);
  app.delete('/api/calendar/:year/:month/:day/:id', calendar.remove);
  // -------
  // Other
  // -------
  // 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/views/*', index.views);
  app.get('/*', index.index);
};