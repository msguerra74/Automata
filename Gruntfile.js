/**
 * Automata
 * Automated Website Generator
 * Michael Guerra | http://msguerra74.com
 * MIT License [See README]
 */

module.exports = function(grunt) {

  // Enter the project directory name

  var project = '_example.com';

  // ---------- NO NEED TO EDIT BELOW THIS LINE ---------- //

  // Project Configurations

  var config = grunt.file.readYAML('projects/' + project + '/website/_config.yml');

  grunt.initConfig({

    // Variables
    // ---------

    // Input/Source Directory

    input: 'projects/' + project + '/website',

    // Output/Compiled Directory

    output: '<%= input %>/' + config.destination,

    // General Tasks
    // -------------

    // Banner
    // Adds a simple banner to files
    // https://github.com/mattstyles/grunt-banner

    usebanner: {
      assets: {
        options: {
          banner: '/* ' + config.banner + ' */'
        },
        files: {
          src: '<%= output %>/assets/**/*.{css,js}'
        }
      }
    },

    // BrowserSync
    // Grunt Task for keeping multiple browsers & devices in sync when building websites
    // https://github.com/BrowserSync/grunt-browser-sync

    browserSync: {
      sync: {
        bsFiles: {
          src: '<%= output %>/**/*'
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
      components: '<%= input %>/_assets/bower_components/',
      pre: [
        '<%= output %>/**/{.*,*}',
        '!<%= output %>/.{git,svn}'
      ],
      post: '<%= output %>/assets/temp/'
    },

    // Copy
    // Copy files and folders
    // https://github.com/gruntjs/grunt-contrib-copy

    copy: {
      favicons: {
        expand: true,
        cwd: '<%= input %>/_assets/favicons/',
        src: [
          '**/*',
          '!**/*.png'
        ],
        dest: '<%= output %>/'
      },
      fonts: {
        expand: true,
        cwd: '<%= input %>/_assets/fonts/',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= output %>/assets/fonts/'
      }
    },

    // Curl
    // Download files from the internet via grunt
    // https://github.com/twolfson/grunt-curl

    curl: {
      htaccess: {
        src: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/master/dist/.htaccess',
        dest: '<%= input %>/_includes/.htaccess'
      }
    },

    // Hashres
    // Hashes your js and css files and rename the <script> and <link> declarations that refer to them in your html/php/etc files
    // https://github.com/luismahou/grunt-hashres

    hashres: {
      assets: {
        options: {
          fileNameFormat: '${hash}-${name}.${ext}'
        },
        src: [
          '<%= output %>/assets/**/*.*'
        ],
        dest: '<%= output %>/**/*.{css,html,js,php}'
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
        cwd: '<%= output %>/',
        src: '**/*.html',
        dest: '<%= output %>/'
      }
    },

    // PHP
    // Start a PHP-server
    // https://github.com/sindresorhus/grunt-php

    php: {
      content: {
        options: {
          base: '<%= output %>/',
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
        command: 'node_modules/bower/bin/bower install ' + config.components + ' --config.directory=<%= input %>/_assets/bower_components/'
      },
      jekyll: {
        command: [
          'cd <%= input %>/',
          'jekyll build'
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
          '<%= input %>/**/*',
          '!<%= input %>/_assets/**/*',
          '!<%= output %>/**/*'
        ],
        tasks: [
          'shell:jekyll',
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      favicons: {
        files: '<%= input %>/_assets/favicons/*',
        tasks: [
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      fonts: {
        files: '<%= input %>/_assets/fonts/**/*.{eot,svg,ttf,woff}',
        tasks: 'copy:fonts'
      },
      images: {
        files: '<%= input %>/_assets/img/**/*.{gif,jpg,png,svg}',
        tasks: [
          'svg2png',
          'imagemin:svg2png',
          'imagemin:images'
        ]
      },
      scripts: {
        files: '<%= input %>/_assets/js/**/*.js',
        tasks: [
          'import_js',
          'uglify'
        ]
      },
      styles: {
        files: '<%= input %>/_assets/scss/**/*.scss',
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
      favicons: {
        expand: true,
        cwd: '<%= input %>/_assets/favicons/',
        src: '*.png',
        dest: '<%= output %>/'
      },
      images: {
        expand: true,
        cwd: '<%= input %>/_assets/img/',
        src: '**/*.{gif,jpg,png,svg}',
        dest: '<%= output %>/assets/img/'
      },
      svg2png: {
        expand: true,
        cwd: '<%= output %>/assets/temp/img/',
        src: '**/*.png',
        dest: '<%= output %>/assets/img/'
      }
    },

    // SVG2PNG
    // Grunt plugin to rasterize SVG to PNG images using PhantomJS
    // https://github.com/dbushell/grunt-svg2png

    svg2png: {
      svg: {
        files: [{
          cwd: '<%= input %>/_assets/img/',
          src: '**/*.svg',
          dest: '<%= output %>/assets/temp/img/'
        }]
      }
    },

    // Script Tasks
    // ------------

    // Import JS
    // https://github.com/dev113/grunt-import-js
    // Import JS files within JS files by // @import 'script.js'; instruction

    import_js: {
      files: {
        expand: true,
        cwd: '<%= input %>/_assets/',
        src: 'js/*.js',
        dest: '<%= output %>/assets/temp/'
      }
    },

    // Uglify
    // Minify files with UglifyJS
    // https://github.com/gruntjs/grunt-contrib-uglify

    uglify: {
      scripts: {
        expand: true,
        cwd: '<%= output %>/assets/temp/js/',
        src: '**/*.js',
        dest: '<%= output %>/assets/js/',
        ext: '.min.js'
      }
    },

    // Style Tasks
    // -----------

    // PostCSS
    // Apply several post-processors to your CSS using PostCSS
    // https://github.com/nDmitry/grunt-postcss

    // Autoprefixer
    // Parse CSS and add vendor prefixes to rules by Can I Use
    // https://github.com/postcss/autoprefixer

    // Oldie
    // Provide CSS compatible with old Internet Explorer
    // https://github.com/jonathantneal/oldie

    postcss: {
      options: {
        processors: [
          require('autoprefixer')
        ]
      },
      css: {
        expand: true,
        cwd: '<%= output %>/assets/temp/css/',
        src: [
          '**/*.css',
          '!oldie.min.css'
        ],
        dest: '<%= output %>/assets/css/'
      },
      oldie: {
        options: {
          processors: [
            require('oldie')
          ]
        },
        expand: true,
        cwd: '<%= output %>/assets/temp/css/',
        src: 'oldie.min.css',
        dest: '<%= output %>/assets/css/'
      }
    },

    // Sass
    // Compile Sass to CSS
    // https://github.com/sindresorhus/grunt-sass

    sass: {
      styles: {
        options: {
          outputStyle: 'compressed'
        },
        expand: true,
        cwd: '<%= input %>/_assets/scss/',
        src: '*.scss',
        dest: '<%= output %>/assets/temp/css/',
        ext: '.min.css'
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Tasks
  // -----

  // Base Task

  grunt.registerTask('base', [
    'clean:pre',
    'shell:jekyll',
    'copy',
    'sass',
    'postcss',
    'svg2png',
    'imagemin:svg2png',
    'imagemin:favicons',
    'imagemin:images',
    'import_js',
    'uglify'
  ]);

  // Build Task

  grunt.registerTask('build', [
    'base',
    'clean:post',
    'usebanner',
    'hashres',
    'jsbeautifier'
  ]);

  // Default Task

  grunt.registerTask('default', [
    'base',
    'php',
    'browserSync',
    'watch'
  ]);

  // Setup Task

  grunt.registerTask('setup', [
    'clean',
    'curl',
    'shell:bower'
  ]);

};