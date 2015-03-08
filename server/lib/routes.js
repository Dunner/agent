// lib/routes.js

'use strict';
var middleware = require('./middleware'),
    index = require('./controllers/index'),
    calendar = require('./controllers/calendar');

module.exports = function(app) {
  // Server API Routes
  // -------
  // -------
  // Calendar
  // -------
  app.get('/api/calendar/:year/:month', calendar.getMonth);
  app.get('/api/calendar/:year/:month/:day', calendar.getDay);
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