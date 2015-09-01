/**
 * Automata
 * Automated Static Website Generator
 * Michael Guerra | http://msguerra74.com
 * MIT License [See README]
 */

// Project Folder Name
var project = '_example.com';

// ---------- Do Not Edit Below This Line ---------- //

// Grunt Module
module.exports = function(grunt) {

  // Grunt Configurations
  grunt.initConfig({

    // ---------- Variables ---------- //

    // Project Settings
    prj: grunt.file.readYAML('Projects/' + project + '/_config.yml'),

    // Automata Packages
    pkg: grunt.file.readJSON('package.json'),

    // Directories
    site: '<%= source %>/_site',
    source: 'Projects/' + project + '/',

    // ---------- Common / Shared ---------- //

    /**
     * Banner
     * Adds a simple banner to files
     * https://github.com/mattstyles/grunt-banner
     */

    usebanner: {
      dist: {
        options: {
          banner: '/* <%= prj.banner %> */'
        },
        files: {
          src: [
            '<%= source %>/assets/css/**/*.css',
            '<%= source %>/assets/js/**/*.js'
          ]
        }
      }
    },

    /**
     * Clean
     * Clear files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     */

    clean: {
      pre: [
        '<%= site %>/**/{*,.*}',
        '!<%= site %>/.git',
        '<%= source %>/assets'
      ]
    },

    /**
     * Connect
     * Start a static web server
     * https://github.com/gruntjs/grunt-contrib-connect
     */

    connect: {
      server: {
        options: {
          base: '<%= site %>',
          hostname: '*',
          livereload: true,
          open: 'http://localhost:<%= connect.server.options.port %>',
          port: '4000'
        }
      }
    },

    /**
     * Copy
     * Copy files and folders
     * https://github.com/gruntjs/grunt-contrib-copy
     */

    copy: {
      buildFonts: {
        expand: true,
        cwd: '<%= source %>/assets/fonts',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= site %>/assets/fonts'
      },
      buildImages: {
        expand: true,
        cwd: '<%= source %>/assets/img',
        src: '**/*.{gif,jpg,png,svg}',
        dest: '<%= site %>/assets/img'
      },
      buildScripts: {
        expand: true,
        cwd: '<%= source %>/assets/js',
        src: '**/*.js',
        dest: '<%= site %>/assets/js'
      },
      buildStyles: {
        expand: true,
        cwd: '<%= source %>/assets/css',
        src: '**/*.css',
        dest: '<%= site %>/assets/css'
      },
      fonts: {
        expand: true,
        cwd: '<%= source %>/_assets/fonts',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= source %>/assets/fonts'
      }
    },

    /**
     * Curl
     * Download files from the internet
     * https://github.com/twolfson/grunt-curl
     */

    curl: {
      htaccess: {
        src: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/master/dist/.htaccess',
        dest: '<%= source %>/_includes/.htaccess'
      },
      html5shiv: {
        src: 'https://raw.githubusercontent.com/aFarkas/html5shiv/master/src/html5shiv.js',
        dest: '<%= source %>/_assets/scripts/oldie/html5shiv.js'
      },
      jquery: {
        // jQuery version can be manually updated here
        src: 'http://code.jquery.com/jquery-1.11.3.js',
        dest: '<%= source %>/_assets/scripts/vendor/jquery.js'
      },
      modernizr: {
        src: 'http://modernizr.com/downloads/modernizr-latest.js',
        dest: '<%= source %>/_assets/scripts/vendor/modernizr.js'
      },
      normalize: {
        src: 'https://raw.githubusercontent.com/necolas/normalize.css/master/normalize.css',
        dest: '<%= source %>/_assets/styles/vendor/_normalize.scss'
      },
      respond: {
        src: 'https://raw.githubusercontent.com/scottjehl/Respond/master/dest/respond.src.js',
        dest: '<%= source %>/_assets/scripts/oldie/respond.js'
      }
    },

    /**
     * Hashres
     * Hashes asset files and renames links in css/html/php/etc
     * https://github.com/luismahou/grunt-hashres
     */

    hashres: {
      assets: {
        options: {
          fileNameFormat: '${name}-${hash}.${ext}'
        },
        src: [
          '<%= site %>/assets/**/*.*',
          '!<%= site %>/assets/**/*.{css,js}'
        ],
        dest: [
          '<%= site %>/**/*.{css,html,js,php}',
          '!<%= site %>/**/{jquery*,modernizr*,oldie*}.js'
        ]
      },
      minifiedAssets: {
        options: {
          fileNameFormat: '${name}-${hash}.min.${ext}'
        },
        src: '<%= site %>/assets/**/*.{css,js}',
        dest: [
          '<%= site %>/**/*.{css,html,js,php}',
          '!<%= site %>/**/{jquery*,modernizr*,oldie*}.js'
        ]
      }
    },

    /**
     * Watch
     * Run tasks whenever watched files change
     * https://github.com/gruntjs/grunt-contrib-watch
     */

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      content: {
        files: [
          '<%= source %>/**/*',
          '!<%= source %>/_assets/**/*',
          '!<%= site %>/**/*',
          '!<%= source %>/assets/**/*'
        ],
        tasks: 'jekyll'
      },
      fonts: {
        files: '<%= source %>/_assets/fonts/**/*',
        tasks: [
          'copy:fonts',
          'copy:buildFonts'
        ]
      },
      images: {
        files: '<%= source %>/_assets/images/**/*',
        tasks: [
          'svg2png',
          'imagemin',
          'copy:buildImages'
        ]
      },
      scripts: {
        files: '<%= source %>/_assets/scripts/**/*',
        tasks: [
          'jshint',
          'uglify:devPlugins',
          'uglify:vendor',
          'copy:buildScripts'
        ]
      },
      styles: {
        files: '<%= source %>/_assets/styles/**/*',
        tasks: [
          'sass:devStyles',
          'postcss',
          'copy:buildStyles'
        ]
      }
    },

    // ---------- CSS / Sass ---------- //

    /**
     * PostCSS
     * Apply several post-processors to your CSS using PostCSS
     * https://github.com/nDmitry/grunt-postcss
     */

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: [
              'last 2 versions'
            ]
          })
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= source %>/assets/css',
        src: '*.css',
        dest: '<%= source %>/assets/css'
      }
    },

    /**
     * Sass
     * Compile Sass to CSS
     * https://github.com/gruntjs/grunt-contrib-sass
     */

    sass: {
      options: {
        noCache: true,
        sourcemap: 'none'
      },
      devStyles: {
        options: {
          style: 'expanded'
        },
        expand: true,
        cwd: '<%= source %>/_assets/styles',
        src: '*.scss',
        dest: '<%= source %>/assets/css',
        ext: '.css'
      },
      styles: {
        options: {
          style: 'compressed'
        },
        expand: true,
        cwd: '<%= source %>/_assets/styles',
        src: '*.scss',
        dest: '<%= source %>/assets/css',
        ext: '.css'
      }
    },

    // ---------- HTML / PHP ---------- //

    /**
     * Jekyll
     * Static site generator
     * https://github.com/dannygarcia/grunt-jekyll
     */

    jekyll: {
      content: {
        options: {
          dest: '<%= site %>',
          src: '<%= source %>'
        }
      }
    },

    /**
     * Prettify
     * Prettify HTML
     * https://github.com/jonschlinkert/grunt-prettify
     */

    prettify: {
      options: {
        'brace_style': 'end-expand',
        indent: 2,
        'indent_inner_html': false,
        'indent_scripts': 'normal',
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
        ]
      },
      content: {
        expand: true,
        cwd: '<%= site %>',
        src: '**/*.html',
        dest: '<%= site %>'
      }
    },

    // ---------- Images / SVGs ---------- //

    /**
     * Imagemin
     * Optimize GIF, JPG, and PNG images
     * https://github.com/gruntjs/grunt-contrib-imagemin
     */

    imagemin: {
      options: {
        optimizationLevel: 7
      },
      generatedImages: {
        expand: true,
        cwd: '<%= source %>/assets/img',
        src: '**/*.{gif,jpg,png,svg}',
        dest: '<%= source %>/assets/img'
      },
      images: {
        expand: true,
        cwd: '<%= source %>/_assets/images',
        src: '**/*.{gif,jpg,png,svg}',
        dest: '<%= source %>/assets/img'
      }
    },

    /**
     * SVG2PNG
     * Rasterize SVG to PNG using PhantomJS
     * https://github.com/dbushell/grunt-svg2png
     */

    svg2png: {
      svg: {
        files: [{
          cwd: '<%= source %>/_assets/images/',
          src: '**/*.svg',
          dest: '<%= source %>/assets/img'
        }]
      }
    },

    // ---------- Scripts ---------- //

    /**
     * JShint
     * Validate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-jshint
     */

    jshint: {
      options: {
        force: true
      },
      scripts: [
        'Gruntfile.js',
        '<%= source %>/_assets/scripts/plugins/**/*.js'
      ]
    },

    /**
     * Modernizr
     * Build out a lean, mean Modernizr machine
     * https://github.com/Modernizr/grunt-modernizr
     */

    modernizr: {
      build: {
        devFile: '<%= source %>/_assets/scripts/vendor/modernizr.js',
        outputFile: '<%= source %>/assets/js/modernizr.js',
        uglify: false,
        files: {
          src: ['<%= source %>/assets/**/*.{css,js}']
        }
      }
    },

    /**
     * Uglify
     * Minify JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     */

    uglify: {
      devPlugins: {
        options: {
          beautify: true,
          compress: false,
          mangle: false
        },
        src: [
          '<%= source %>/_assets/scripts/plugins/**/*.js',
          '<%= source %>/_assets/scripts/script.js'
        ],
        dest: '<%= source %>/assets/js/script.js'
      },
      oldie: {
        expand: true,
        cwd: '<%= source %>/_assets/scripts/oldie',
        src: '**/*.js',
        dest: '<%= source %>/assets/js'
      },
      plugins: {
        src: [
          '<%= source %>/_assets/scripts/plugins/**/*.js',
          '<%= source %>/_assets/scripts/script.js'
        ],
        dest: '<%= source %>/assets/js/script.js'
      },
      vendor: {
        expand: true,
        cwd: '<%= source %>/_assets/scripts/vendor',
        src: '**/*.js',
        dest: '<%= source %>/assets/js'
      },
      vendorModernizr: {
        expand: true,
        cwd: '<%= source %>/assets/js',
        src: '**/modernizr.js',
        dest: '<%= source %>/assets/js'
      }
    }

  });

  // ---------- Tasks ---------- //

  require('load-grunt-tasks')(grunt);

  // Dev task 'default'
  grunt.registerTask('default', [
    'clean',
    'copy:fonts',
    'jshint',
    'uglify:devPlugins',
    'uglify:vendor',
    'uglify:oldie',
    'svg2png',
    'imagemin',
    'sass:devStyles',
    'postcss',
    'jekyll',
    'connect',
    'watch'
  ]);

  // Build task (builds to the '_site' folder)
  grunt.registerTask('build', [
    'clean',
    'copy:fonts',
    'jshint',
    'uglify:plugins',
    'uglify:vendor',
    'uglify:oldie',
    'svg2png',
    'imagemin',
    'sass:styles',
    'postcss',
    'modernizr',
    'uglify:vendorModernizr',
    'usebanner',
    'jekyll',
    'hashres',
    'prettify',
  ]);

  // Downloads the latest versions of:
  // .htaccess, _normalize.scss, html5shiv, jquery.js, modernizr, and respond.js
  grunt.registerTask('download', [
    'curl'
  ]);

};