exports.config = {
    // See http://brunch.io/#documentation for docs.
    paths: {
        public: './../dreamail_tracker/static',
        watched: [
            'app',
            'assets',
            'styles',
            'vendor',
            'node_modules/bootstrap/dist',
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
            joinTo: {
                'base.css': /^styles/,
                'vendor.css': /^node_modules/
            },
        },
        templates: {
            joinTo: 'base.js'
        }
    },
    conventions: {
        assets: function (path) {
            /**
             * Loops every path and returns path|true|false according what we need
             * stackoverflow.com/questions/18595609/brunch-config-file-conventions
             * @param   path    file or directory's path
             * @returns path    if it is a directory
             *          true    if it fit with the regular expression
             *          false   otherwise
             *
             */
            if (/\/$/.test(path)) return path;
            // RegExp for anything we need
            return /assets[\\/]/.test(path)
                    // regex for font files
                || /.*(?:\.eot|\.svg|\.ttf|\.woff|\.woff2)/.test(path);
        }
    },
};
