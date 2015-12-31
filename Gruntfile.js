/**
 * Automata
 * Automated Website Generator
 * Michael Guerra | http://msguerra74.com
 * MIT License [See README]
 */

// 1. Enter the project directory name
var project = '_example.com';

// 2. Within the project directory, edit the '/website/_config.yml' variables as needed

// ---------- NO NEED TO EDIT BELOW THIS LINE ---------- //

module.exports = function(grunt) {

  grunt.initConfig({

    // Configurations
    config: grunt.file.readYAML('projects/' + project + '/website/_config.yml'),

    // Variables
    // ---------

    // Input/Source Directory
    input: 'projects/' + project + '/website',

    // Output/Compiled Directory
    output: '<%= input %>/<%= config.destination %>',

    // Packages
    // --------

    // Banner
    // Adds a simple banner to files
    // https://github.com/mattstyles/grunt-banner

    usebanner: {
      assets: {
        options: {
          banner: '/* <%= config.banner %> */'
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
          proxy: '<%= config.host %>:<%= config.port %>',
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
        src: '**/*.png',
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
          hostname: '<%= config.host %>',
          port: '<%= config.port %>'
        }
      }
    },

    // PostCSS
    // Apply several post-processors to your CSS using PostCSS
    // https://github.com/nDmitry/grunt-postcss

    postcss: {
      options: {
        processors: [
          require('autoprefixer')
        ]
      },
      css: {
        expand: true,
        cwd: '<%= output %>/assets/temp/css/',
        src: '**/*.css',
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
    },

    // Shell
    // Run shell commands
    // https://github.com/sindresorhus/grunt-shell

    shell: {
      bower: {
        command: 'node_modules/bower/bin/bower install <%= config.components %> --config.directory=<%= input %>/_assets/bower_components'
      },
      jekyll: {
        command: [
          'cd <%= input %>/',
          'jekyll build'
        ].join('&&')
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
          'imagemin:favicons'
        ]
      },
      favicons: {
        files: '<%= input %>/_assets/favicons/**/*.png',
        tasks: 'imagemin:favicons'
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