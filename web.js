var keystone = require('keystone');

keystone.init({
  
  'name': 'My Project',
  
  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': 'mongodb://localhost/keystone_demo',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'
  
});

keystone.import('models')

keystone.set('routes', require('./routes'));

keystone.start();
