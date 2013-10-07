/**
 * Automata
 * Automated Static Website Generator
 *
 * Michael Guerra | @msguerra74 | http://msguerra74.com
 *
 * MIT License [See README]
 */

// Grunt module
module.exports = function(grunt) {

  // Grunt configurations
  grunt.initConfig({

    /* ---------- Variables ---------- */

    // Project variables file (Change '_example.com' to current project)
    prj: grunt.file.readJSON('Projects/_example.com/project.json'),

    // Automata project package
    pkg: grunt.file.readJSON('package.json'),

    // Developer Banner
    banner: 'Created by <%= prj.developer.name %> in <%= current_year %> | <%= prj.developer.contact %>',

    // Directories
    build: '<%= source %>/.BUILD',
    source: 'Projects/<%= prj.name %>',

    // Current year
    current_year: grunt.template.today('yyyy'),

    /* ---------- Packages ---------- */

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
          cwd: '<%= build %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= build %>/assets/css',
          ext: '.min.css'
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= build %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= build %>/assets/css',
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
      css: '<%= build %>/assets/css/*.{prefixed,unprefixed}.css'
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
      fonts: {
        expand: true,
        cwd: '<%= source %>/assets/fonts',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= build %>/assets/fonts'
      }
    },

    /**
     * CSSmin
     * Compress CSS files
     * https://github.com/gruntjs/grunt-contrib-cssmin
     */

    cssmin: {
      options: {
        banner: '/* <%= banner %> */',
        keepSpecialComments: 0
      },
      styles: {
        expand: true,
        cwd: '<%= build %>/assets/css',
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
        src: 'http://code.jquery.com/jquery.js',
        dest: '<%= source %>/assets/scripts/vendor/jquery.js'
      },
      oldie: {
        src: ['http://raw.github.com/aFarkas/html5shiv/master/src/html5shiv-printshiv.js', 'http://raw.github.com/scottjehl/Respond/master/respond.src.js'],
        dest: '<%= source %>/assets/scripts/vendor/oldie.js'
      },
      normalize: {
        src: 'http://raw.github.com/necolas/normalize.css/master/normalize.css',
        dest: '<%= source %>/assets/styles/vendor/_normalize.scss'
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
          cwd: '<%= build %>/assets/img',
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
          // Site
          'url: <%= prj.website.url %>\n' +
          'title: <%= prj.website.title %>\n' +
          'description: <%= prj.website.description %>\n' +
          'owner: <%= prj.website.owner %>\n' +
          'email: <%= prj.website.email %>\n' +
          'use_ie_edge: <%= prj.options.use_ie_edge %>\n' +
          'use_jquery: <%= prj.options.use_jquery %>\n' +
          'google_analytics_id: <%= prj.options.google_analytics_id %>\n' +
          // Jekyll
          'exclude: <%= prj.jekyll.exclude %>\n' +
          'future: <%= prj.jekyll.future %>\n' +
          'include: <%= prj.jekyll.include %>\n' +
          'keep_files: <%= prj.jekyll.keep_files %>\n' +
          'lsi: <%= prj.jekyll.lsi %>\n' +
          'markdown: <%= prj.jekyll.markdown %>\n' +
          'paginate: <%= prj.jekyll.paginate %>\n' +
          'permalink: <%= prj.jekyll.permalink %>\n' +
          'show_drafts: <%= prj.jekyll.show_drafts %>\n' +
          'timezone: <%= prj.jekyll.timezone %>\n' +
          // Dev
          'dev_banner: <%= banner %>\n'
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
        banner: '/* <%= banner %> */',
        noCache: true,
        style: 'expanded'
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/styles',
          src: '*.scss',
          dest: '<%= build %>/assets/css',
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
          dest: '<%= build %>/assets/img'
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
        banner: '/* <%= banner %> */\n'
      },
      devPlugins: {
        options: {
          beautify: true,
          compress: false,
          mangle: false
        },
        files: [{
          src: '<%= source %>/assets/scripts/plugins/**/*.js',
          dest: '<%= build %>/assets/js/script.min.js'
        }]
      },
      plugins: {
        files: [{
          src: '<%= source %>/assets/scripts/plugins/**/*.js',
          dest: '<%= build %>/assets/js/script.min.js'
        }]
      },
      vendor: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/scripts/vendor',
          src: '**/*.js',
          dest: '<%= build %>/assets/js',
          ext: '.min.js'
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

  // Dev task 'default'
  grunt.registerTask('default', ['clean:build', 'copy', 'jshint', 'uglify:devPlugins', 'uglify:vendor', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:devStyles', 'clean:css', 'jekyll', 'connect', 'watch']);

  // Build task
  grunt.registerTask('build', ['clean:build', 'copy', 'jshint', 'uglify:plugins', 'uglify:vendor', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:styles', 'cssmin', 'clean:css', 'jekyll']);

  // Downloads the latest versions of: .htaccess, _normalize.scss, jquery.min.js, and oldie.min.js
  grunt.registerTask('download', ['curl']);

};