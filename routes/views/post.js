var keystone = require('keystone'),
    async = require('async'),
    Post = keystone.list('Post'),

exports = module.exports = function (req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  locals.section = 'blog';
  locals.filters = {
    post: req.params.post
  };
  
  // Load current post
  view.on('init', function (next) {
    
    var q = Post.model.findOne({
      state: 'published',
      key: locals.filters.post
    }).populate('author');
    
    q.exec(function (err, result) {
      locals.post = result;
      next(err);
    });
    
  });
  
  // Load other posts
  view.on('init', function (next) {
    
    var q = Post.model.find().where('state', 'published').sort('-publishedDate').populate('author').limit(4);
    
    q.exec(function (err, results) {
      locals.posts = results;
      next(err);
    });
    
  })
  
  // Render the view
  view.render('post');
  
}