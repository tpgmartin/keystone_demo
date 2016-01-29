var keystone = require('keystone'),
    async = require('async'),
    Post = keystone.list('Post');

exports = module.exports = function (res, req) {

  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  locals.section = 'blog';
  locals.post = [];
  
  // Load all the posts
  view.on('init', function (next) {
    
    var q = Post.paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10
    })
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author');
    
    q.exec(function (err, results) {
      locals.posts = results;
      next(err);
    });
    
  });
  
  // Render the view
  view.render('blog');
  
}