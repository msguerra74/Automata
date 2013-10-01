/**
 * Automata
 * Automated Static Website Generator
 * @author Michael Guerra | @msguerra74 | http://msguerra74.com
 * @license MIT [See README]
 */

// Grunt module
module.exports = function(grunt) {

  // Grunt configurations
  grunt.initConfig({

    /* ---------- Variables ---------- */

    // Project variables file (Change '_example.com' to current project)
    prj: grunt.file.readJSON('Projects/msguerra74.com/project.json'),

    // Automata package
    pkg: grunt.file.readJSON('package.json'),

    // Directories
    build: '<%= source %>/.BUILD',
    source: 'Projects/<%= prj.name %>',
    temp: '<%= source %>/.temp',

    // Current year
    current_year: grunt.template.today('yyyy'),

    /* ---------- Packages ---------- */

    /**
     * Assemble
     * Build web projects from reusable templates and data
     * https://github.com/assemble/assemble
     */

    assemble: {
      options: {
        data: '{<%= source %>,<%= temp %>}/**/*.json',
        ext: '.<%= prj.site.html_php %>'
      },
      content: {
        src: '<%= build %>/**/*.{html,php}',
        dest: './'
      }
    },

    /**
     * Autoprefixer
     * Adds vendor-prefixed CSS properties
     * https://github.com/nDmitry/grunt-autoprefixer
     */

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'android 4', 'ff 17', 'ie >= 8', 'ios 6', 'opera 12.1', 'safari 6']
      },
      devStyles: {
        files: [{
          expand: true,
          cwd: '<%= temp %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= build %>/assets/css',
          ext: '.min.css'
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= temp %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= temp %>/assets/css',
          ext: '.prefixed.css'
        }]
      }
    },

    /**
     * Clean
     * Clear files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     */

    clean: {
      build: ['<%= build %>/**/{*,.*}', '!<%= build %>/.git'],
      temp: '<%= temp %>'
    },

    /**
     * Connect
     * Start a static web server
     * https://github.com/gruntjs/grunt-contrib-connect
     */

    connect: {
      server: {
        options: {
          base: '<%= build %>',
          hostname: '*',
          livereload: true,
          open: '<%= prj.dev.url %>',
          port: '<%= prj.dev.port %>'
        }
      }
    },

    /**
     * Copy
     * Copy files and folders
     * https://github.com/gruntjs/grunt-contrib-copy
     */

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= source %>/assets/fonts',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= build %>/assets/fonts'
      },
      vendorScripts: {
        expand: true,
        cwd: '<%= source %>/assets/scripts/vendor',
        src: '**/*.js',
        dest: '<%= build %>/assets/js'
      }
    },

    /**
     * CSSmin
     * Compress CSS files
     * https://github.com/gruntjs/grunt-contrib-cssmin
     */

    cssmin: {
      options: {
        banner: '/* <%= prj.dev.banner %> */',
        keepSpecialComments: 0
      },
      styles: {
        expand: true,
        cwd: '<%= temp %>/assets/css',
        src: '*.prefixed.css',
        dest: '<%= build %>/assets/css',
        ext: '.min.css'
      }
    },

    /**
     * Curl
     * Download files from the internet
     * https://github.com/twolfson/grunt-curl
     */

    curl: {
      htaccess: {
        src: 'http://raw.github.com/h5bp/html5-boilerplate/master/.htaccess',
        dest: '<%= source %>/content/.htaccess'
      },
      jquery: {
        src: 'http://code.jquery.com/jquery.min.js',
        dest: '<%= source %>/assets/scripts/vendor/jquery.min.js'
      },
      oldie: {
        src: ['http://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv-printshiv.js', 'http://raw.github.com/scottjehl/Respond/master/respond.min.js'],
        dest: '<%= source %>/assets/scripts/vendor/oldie.min.js'
      },
      normalize: {
        src: 'http://raw.github.com/necolas/normalize.css/master/normalize.css',
        dest: '<%= source %>/assets/styles/vendor/_normalize.scss'
      }
    },

    /**
     * Hashify
     * Cache busting
     * https://github.com/suprMax/grunt-hashify
     */

    hashify: {
      options: {
        basedir: './',
        copy: true,
        hashmap: '<%= temp %>/hashmap.json',
        length: '5'
      },
      assets: {
        files: [{
          src: '<%= build %>/assets/js/jquery.min.js',
          dest: '<%= build %>/assets/js/jquery.min.js',
          key: 'jquery_js'
        }, {
          src: '<%= build %>/assets/js/oldie.min.js',
          dest: '<%= build %>/assets/js/oldie.min.js',
          key: 'oldie_js'
        }, {
          src: '<%= build %>/assets/js/script.min.js',
          dest: '<%= build %>/assets/js/script.min.js',
          key: 'script_js'
        }, {
          src: '<%= build %>/assets/css/style.min.css',
          dest: '<%= build %>/assets/css/style.min.css',
          key: 'style_css'
        }]
      }
    },

    /**
     * Imagemin
     * Optimize GIF, JPG, and PNG images
     * https://github.com/gruntjs/grunt-contrib-imagemin
     */

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/images',
          src: '**/*.{gif,jpg,png}',
          dest: '<%= build %>/assets/img'
        }, {
          expand: true,
          cwd: '<%= temp %>/assets/img',
          src: '**/*.{gif,jpg,png}',
          dest: '<%= build %>/assets/img'
        }]
      }
    },

    /**
     * Jekyll
     * Static site generator
     * https://github.com/dannygarcia/grunt-jekyll
     */

    jekyll: {
      content: {
        options: {
          dest: '<%= build %>',
          src: '<%= source %>/content',
          raw:
          // Site info
          'url: <%= prj.site.url %>\n' +
          'title: <%= prj.site.title %>\n' +
          'description: <%= prj.site.description %>\n' +
          'owner: <%= prj.site.owner %>\n' +
          'email: <%= prj.site.email %>\n' +
          'google_analytics_id: <%= prj.site.google_analytics_id %>\n' +
          // Jekyll config
          'exclude: <%= prj.jekyll.exclude %>\n' +
          'future: <%= prj.jekyll.future %>\n' +
          'include: <%= prj.jekyll.include %>\n' +
          'keep_files: <%= prj.jekyll.keep_files %>\n' +
          'lsi: <%= prj.jekyll.lsi %>\n' +
          'markdown: <%= prj.jekyll.markdown %>\n' +
          'paginate: <%= prj.jekyll.paginate %>\n' +
          'permalink: <%= prj.jekyll.permalink %>\n' +
          'show_drafts: <%= prj.jekyll.show_drafts %>\n' +
          'timezone: <%= prj.jekyll.timezone %>\n'
        }
      }
    },

    /**
     * JShint
     * Validate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-jshint
     */

    jshint: {
      scripts: ['Gruntfile.js', '<%= source %>/assets/scripts/plugins/**/*.js']
    },

    /**
     * Sass
     * Compile Sass to CSS
     * https://github.com/gruntjs/grunt-contrib-sass
     */

    sass: {
      options: {
        banner: '/* <%= prj.dev.banner %> */',
        cacheLocation: '<%= temp %>/.sass-cache',
        style: 'expanded'
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/styles',
          src: '*.scss',
          dest: '<%= temp %>/assets/css',
          ext: '.unprefixed.css'
        }]
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
          src: '<%= source %>/assets/images/**/*.svg',
          dest: '<%= temp %>/assets/img'
        }]
      }
    },

    /**
     * SVGmin
     * Minify SVG
     * https://github.com/sindresorhus/grunt-svgmin
     */

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/images',
          src: '**/*.svg',
          dest: '<%= build %>/assets/img'
        }]
      }
    },

    /**
     * Uglify
     * Minify JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     */

    uglify: {
      options: {
        banner: '/* <%= prj.dev.banner %> */\n'
      },
      devPlugins: {
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          wrap: 'plugins'
        },
        files: [{
          src: '<%= source %>/assets/scripts/plugins/**/*.js',
          dest: '<%= build %>/assets/js/script.min.js'
        }]
      },
      plugins: {
        options: {
          wrap: 'plugins'
        },
        files: [{
          src: '<%= source %>/assets/scripts/plugins/**/*.js',
          dest: '<%= build %>/assets/js/script.min.js'
        }]
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
        files: '<%= source %>/content/**/*',
        tasks: 'jekyll'
      },
      fonts: {
        files: '<%= source %>/assets/fonts/**/*',
        tasks: 'copy:fonts'
      },
      images: {
        files: '<%= source %>/assets/images/**/*',
        tasks: ['svg2png', 'svgmin', 'imagemin']
      },
      scripts: {
        files: '<%= source %>/assets/scripts/**/*',
        tasks: ['jshint', 'uglify:devPlugins']
      },
      styles: {
        files: '<%= source %>/assets/styles/**/*',
        tasks: ['sass', 'autoprefixer:devStyles']
      }
    }

  });

  /* ---------- Tasks ---------- */

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  // Dev task 'default'
  grunt.registerTask('default', ['clean', 'copy', 'jshint', 'uglify:devPlugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:devStyles', 'jekyll', 'connect', 'watch']);

  // Build task
  grunt.registerTask('build', ['clean', 'copy', 'jshint', 'uglify:plugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:styles', 'cssmin', 'jekyll', 'hashify', 'assemble']);

  // Downloads the latest versions of: .htaccess, _normalize.scss, jquery.min.js, and oldie.min.js
  grunt.registerTask('download', ['curl']);

};