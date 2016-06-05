exports.config = {
  // See http://brunch.io/#documentation for docs.
  paths: {
    public: './../static',
    watched: [
      'app',
      'assets',
      'styles',
      'vendor',
    ]
  },
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^node_modules/,
        'base.js': /^app/
      },
      order: {
        after: [/\.html$/, /\.css$/]
      }
    },
    stylesheets: {
      joinTo: 'base.css'
    },
    templates: {
      joinTo: 'base.js'
    }
  }
};
