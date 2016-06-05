/**
 * Brunch configuration file.
 * A Brunch configuration file is just a Node module that exports a config
 * property; that property has at least a files property that describes
 * concatenations.
 */
exports.config = {
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
        '/javascript/base.js': /^app/,
        '/javascript/vendor.js': /^(vendor|node_modules)/
      },
      order: {
        before: ['app/app.js', 
                  'app/app-config.js']
      }
    },
    stylesheets: {
      joinTo: {
        '/styles/base.css': /^styles/,
        '/styles/vendor.css': /^(vendor|node_modules)/,
      }
    },
    templates: {
      joinTo: {
        '/javascript/templates.js': /^(app|templates)/
      }
    }
  },
  conventions: {
    assets: function(path) {
      /**
       * Loops every path and returns path|true|false according what we need
       * stackoverflow.com/questions/18595609/brunch-config-file-conventions
       * @param   path    file or directory's path
       * @returns path    if it is a directory
       *          true    if it fit with the regular expression
       *          false   otherwise
       *
       */
      if( /\/$/.test(path) ) return path;
      // RegExp for anything we need
      return /assets[\\/]/.test(path)
            // regex for font files
            || /.*(?:\.eot|\.svg|\.ttf|\.woff|\.woff2)/.test(path);
    }
  },
  modules: {
    // wrap non-vendor files in an IIFE
    wrapper: function(path, data, vendor) {
              return vendor ? data : "(function() {\n  'use strict';\n " + data + " \n})();\n\n";
            }
  },
  overrides: {
    production: {
      files: {
        javascripts: {
          joinTo: {
            '/javascript/base.min.js': /^app\/*.js/,
            '/javascript/vendor.min.js': /^(vendor|node_modules)/,
          }
        },
        stylesheets: {
          joinTo: {
            '/styles/base.min.css': /^styles/,
            '/styles/vendor.min.css': /^(vendor|node_modules)/,
          }
        }
      },
    }
  },
  plugins: {
    on: ['ng-annotate-brunch', 'angular_templates'],
    angular_templates:{
      path_transform: function (path)  {return path.replace(/.*\/.*\//, 'templates/');}
    }
  }
};
