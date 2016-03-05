/**
 * Automata
 * Automated Website Generator
 * Michael Guerra | http://msguerra74.com
 * The MIT License (MIT) [See README]
 */

// Enter the Project Directory Name
// --------------------------------
// _example.com

var project = '_example.com';

// ---------- EDIT BELOW THIS LINE AT YOUR OWN RISK ---------- //

module.exports = function(grunt) {

  // Project Configurations and Variables
  // ------------------------------------

  // Configurations

  var config = grunt.file.readYAML('projects/' + project + '/website/_config.yml');

  // Generates a WordPress theme path if a wordpress variable is active in _config.yml

  var wordpress_path = '';
  if (config.wordpress_theme_name) {
    wordpress_path = '/wp-content/themes/' + config.wordpress_theme_name;
  }

  // Input/Source Directory

  var input = 'projects/' + project + '/website';

  // Output/Compiled Directory

  var output = input + '/' + config.destination + wordpress_path;

  grunt.initConfig({

    // General Tasks
    // -------------

    // Banner
    // Adds a simple banner to files
    // https://github.com/mattstyles/grunt-banner

    usebanner: {
      assets: (function() {
        if (config.developer.name) {
          return {
            options: {
              banner: '/* Developed by ' + config.developer.name + ' | ' + config.developer.url + ' */'
            },
            files: {
              src: output + '/assets/**/*.{css,js}'
            }
          };
        } else {
          return {};
        }
      })()
    },

    // BrowserSync
    // Grunt Task for keeping multiple browsers & devices in sync when building websites
    // https://github.com/BrowserSync/grunt-browser-sync

    browserSync: {
      sync: {
        bsFiles: {
          src: output + '/**/*'
        },
        options: {
          logLevel: 'silent',
          notify: false,
          open: true,
          proxy: config.host + ':' + config.port,
          watchTask: true
        }
      }
    },

    // Clean
    // Clear files and folders
    // https://github.com/gruntjs/grunt-contrib-clean

    clean: {
      pre: [
        output + '/**/{.*,*}',
        '!' + output + '/.{git,svn}'
      ],
      setup: [
        input + '/_assets/bower_components/',
        input + '/_includes/.htaccess',
        '<%= clean.pre %>'
      ]
    },

    // Copy
    // Copy files and folders
    // https://github.com/gruntjs/grunt-contrib-copy

    copy: {
      favicons: (function() {
        if (config.link.favicons) {
          return {
            expand: true,
            cwd: input + '/_assets/favicons/',
            src: [
              '*',
              '!*.png'
            ],
            dest: output + '/'
          };
        } else {
          return {};
        }
      })(),
      fonts: {
        expand: true,
        cwd: input + '/_assets/fonts/',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: output + '/assets/fonts/'
      }
    },

    // Curl
    // Download files from the internet via grunt
    // https://github.com/twolfson/grunt-curl

    curl: {
      htaccess: {
        src: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/master/dist/.htaccess',
        dest: input + '/_includes/.htaccess'
      }
    },

    // Hashres
    // Hashes your js and css files and rename the <script> and <link> declarations that refer to them in your html/php/etc files
    // https://github.com/luismahou/grunt-hashres

    hashres: {
      assets: {
        options: (function() {
          if (config.cache_bust) {
            return {
              fileNameFormat: '${hash}-${name}.${ext}'
            };
          } else {
            return {
              fileNameFormat: '${name}.${ext}'
            };
          }
        })(),
        src: [
          output + '/assets/**/*.*'
        ],
        dest: output + '/**/*.{css,html,js,php}'
      }
    },

    // JS Beautifier
    // https://github.com/vkadam/grunt-jsbeautifier
    // Beautify js, css, html and json files using Grunt and jsbeautify

    jsbeautifier: {
      options: {
        html: {
          braceStyle: 'end-expand',
          extraLiners: '',
          indentInnerHtml: true,
          indentScripts: 'normal',
          indentSize: 2,
          maxPreserveNewlines: '0',
          unformatted: [
            'a',
            'abbr',
            'acronym',
            'b',
            'bdo',
            'big',
            'cite',
            'code',
            'del',
            'dfn',
            'em',
            'font',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'i',
            'ins',
            'kbd',
            'p',
            'pre',
            'q',
            's',
            'samp',
            'script',
            'small',
            'span',
            'strike',
            'strong',
            'style',
            'sub',
            'sup',
            'tt',
            'u',
            'var'
          ],
          wrapLineLength: '0'
        },
      },
      content: {
        expand: true,
        cwd: output + '/',
        src: '**/*.html',
        dest: output + '/'
      }
    },

    // PHP
    // Start a PHP-server
    // https://github.com/sindresorhus/grunt-php

    php: {
      content: {
        options: {
          base: output + '/',
          hostname: config.host,
          port: config.port
        }
      }
    },

    // Shell
    // Run shell commands
    // https://github.com/sindresorhus/grunt-shell

    shell: {
      bower: {
        command: 'node_modules/bower/bin/bower install ' + config.bower_components + ' --config.directory=' + input + '/_assets/bower_components/'
      },
      jekyll: {
        command: [
          'cd ' + input + '/',
          'jekyll build --destination ' + config.destination + wordpress_path
        ].join('&&')
      }
    },

    // Watch
    // Run tasks whenever watched files change
    // https://github.com/gruntjs/grunt-contrib-watch

    watch: {
      options: {
        spawn: false
      },
      content: {
        files: [
          input + '/**/*',
          '!' + input + '/_assets/**/*',
          '!' + output + '/**/*'
        ],
        tasks: [
          'shell:jekyll',
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      favicons: {
        files: input + '/_assets/favicons/*',
        tasks: [
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      fonts: {
        files: input + '/_assets/fonts/**/*.{eot,svg,ttf,woff}',
        tasks: 'copy:fonts'
      },
      images: {
        files: input + '/_assets/img/**/*.{gif,jpg,png,svg}',
        tasks: 'imagemin:images'
      },
      scripts: {
        files: input + '/_assets/js/**/*.js',
        tasks: [
          'includereplace',
          'babel',
          'uglify'
        ]
      },
      styles: {
        files: input + '/_assets/scss/**/*.scss',
        tasks: [
          'sass',
          'postcss'
        ]
      }
    },

    // Image Tasks
    // -----------

    // Imagemin
    // Minify PNG and JPEG images
    // https://github.com/gruntjs/grunt-contrib-imagemin

    imagemin: {
      options: {
        optimizationLevel: 7
      },
      favicons: (function() {
        if (config.link.favicons) {
          return {
            expand: true,
            cwd: input + '/_assets/favicons/',
            src: '*.png',
            dest: output + '/'
          };
        } else {
          return {};
        }
      })(),
      images: {
        expand: true,
        cwd: input + '/_assets/img/',
        src: '**/*.{gif,jpg,png,svg}',
        dest: output + '/assets/img/'
      }
    },

    // Script Tasks
    // ------------

    // Babel
    // Use next generation JavaScript today
    // https://github.com/babel/grunt-babel

    babel: {
      options: {
        presets: ['es2015']
      },
      dist: {
        expand: true,
        cwd: output + '/assets/js/',
        src: '*.js',
        dest: output + '/assets/js/',
      }
    },

    // Include Replace
    // Grunt task to include files and replace variables
    // https://github.com/alanshaw/grunt-include-replace

    includereplace: {
      scripts: {
        options: {
          prefix: '// @'
        },
        expand: true,
        cwd: input + '/_assets/js/',
        src: [
          '*.js'
        ],
        dest: output + '/assets/js/',
        ext: '.min.js'
      }
    },

    // Uglify
    // Minify files with UglifyJS
    // https://github.com/gruntjs/grunt-contrib-uglify

    uglify: {
      scripts: {
        expand: true,
        cwd: output + '/assets/js/',
        src: '*.js',
        dest: output + '/assets/js/'
      }
    },

    // Style Tasks
    // -----------

    // PostCSS
    // Apply several post-processors to your CSS using PostCSS
    // https://github.com/nDmitry/grunt-postcss

    // cssnano
    // A modular minifier, composed of single-responsibility PostCSS plugins
    // https://github.com/ben-eb/cssnano

    postcss: {
      css: {
        options: {
          processors: [
            require('cssnano')({
              autoprefixer: {
                add: true,
                browsers: [
                  'last 2 versions',
                  'ie >= 9',
                  'and_chr >= 2.3'
                ]
              }
            })
          ]
        },
        expand: true,
        cwd: output + '/assets/css/',
        src: '*.css',
        dest: output + '/assets/css/'
      }
    },

    // Sass
    // Compile Sass to CSS
    // https://github.com/sindresorhus/grunt-sass

    sass: {
      styles: (function() {
        if (config.link.style) {
          return {
            expand: true,
            cwd: input + '/_assets/scss/',
            src: '*.scss',
            dest: output + '/assets/css/',
            ext: '.min.css'
          };
        } else {
          return {};
        }
      })()
    }

  });

  require('load-grunt-tasks')(grunt);

  // Tasks
  // -----

  // Build Task

  grunt.registerTask('build', [
    'clean:pre',
    'shell:jekyll',
    'copy',
    'sass',
    'postcss',
    'imagemin:favicons',
    'imagemin:images',
    'includereplace',
    'babel',
    'uglify',
    'usebanner',
    'hashres',
    'jsbeautifier'
  ]);

  // Default Task

  grunt.registerTask('default', [
    'clean:pre',
    'shell:jekyll',
    'copy',
    'sass',
    'postcss',
    'imagemin:favicons',
    'imagemin:images',
    'includereplace',
    'babel',
    'uglify',
    'php',
    'browserSync',
    'watch'
  ]);

  // Setup Task

  grunt.registerTask('setup', [
    'clean:setup',
    'curl',
    'shell:bower'
  ]);

};