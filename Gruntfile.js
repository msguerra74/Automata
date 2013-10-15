/**
 * Automata
 * Automated Static Website Generator
 * Michael Guerra | @msguerra74 | http://msguerra74.com
 * MIT License [See README]
 */

// Grunt module
module.exports = function(grunt) {

  // Grunt configurations
  grunt.initConfig({

    /* ---------- Variables ---------- */

    // Project settings ----- (Change '_example.com' to working project folder)
    prj: grunt.file.readYAML('Projects/_example.com/_config.yml'),

    // Automata packages
    pkg: grunt.file.readJSON('package.json'),

    // Developer Banner
    banner: '<%= prj.banner %>',

    // Directories
    site: '<%= source %>/_site',
    source: 'Projects/<%= prj.folder %>',

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
          cwd: '<%= source %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= source %>/assets/css',
          ext: '.min.css'
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/css',
          src: '*.unprefixed.css',
          dest: '<%= source %>/assets/css',
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
      generated: ['<%= site %>/**/{*,.*}', '!<%= site %>/{.git,sftp-config.json}', '<%= source %>/assets'],
      css: '<%= source %>/assets/css/*.{prefixed,unprefixed}.css'
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
        src: '**/*.css',
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
      },
      vendorScripts: {
        expand: true,
        cwd: '<%= source %>/_assets/scripts/vendor',
        src: '**/*.{htc,js}',
        dest: '<%= source %>/assets/js'
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
        cwd: '<%= source %>/assets/css',
        src: '*.prefixed.css',
        dest: '<%= source %>/assets/css',
        ext: '.min.css'
      }
    },

    /**
     * Curl
     * Download files from the internet
     * https://github.com/twolfson/grunt-curl
     */

    curl: {
      boxsizing: {
        src: 'https://raw.github.com/Schepp/box-sizing-polyfill/master/boxsizing.htc',
        dest: '<%= source %>/_assets/scripts/vendor/boxsizing.htc'
      },
      htaccess: {
        src: 'http://raw.github.com/h5bp/html5-boilerplate/master/.htaccess',
        dest: '<%= source %>/.htaccess'
      },
      jquery: {
        src: 'http://code.jquery.com/jquery.min.js',
        dest: '<%= source %>/_assets/scripts/vendor/jquery.min.js'
      },
      oldie: {
        src: ['http://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv-printshiv.js'],
        dest: '<%= source %>/_assets/scripts/vendor/oldie.min.js'
      },
      normalize: {
        src: 'http://raw.github.com/necolas/normalize.css/master/normalize.css',
        dest: '<%= source %>/_assets/styles/vendor/_normalize.scss'
      },
      'normalize_oldie': {
        src: 'http://raw.github.com/necolas/normalize.css/v1/normalize.css',
        dest: '<%= source %>/_assets/styles/vendor/_normalize_oldie.scss'
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
          cwd: '<%= source %>/_assets/images',
          src: '**/*.{gif,jpg,png}',
          dest: '<%= source %>/assets/img'
        }, {
          expand: true,
          cwd: '<%= source %>/assets/img',
          src: '**/*.{gif,jpg,png}',
          dest: '<%= source %>/assets/img'
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
          dest: '<%= site %>',
          src: '<%= source %>'
        }
      }
    },

    /**
     * JShint
     * Validate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-jshint
     */

    jshint: {
      scripts: ['Gruntfile.js', '<%= source %>/_assets/scripts/plugins/**/*.js']
    },

    /**
     * Prettify
     * Prettify HTML
     * https://github.com/jonschlinkert/grunt-prettify
     */

    prettify: {
      options: {
        'brace_style': 'collapse',
        'indent_inner_html': false,
        'indent_scripts': 'normal',
        unformatted: ['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'cite', 'code', 'dd', 'del', 'dfn', 'dt', 'em', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'ins', 'kbd', 'li', 'p', 'pre', 'q', 's', 'samp', 'small', 'span', 'strike', 'strong', 'sub', 'sup', 'tt', 'u', 'var']
      },
      content: {
        expand: true,
        cwd: '<%= site %>',
        src: '**/*.{html,php}',
        dest: '<%= site %>'
      }
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
        precision: 16,
        style: 'expanded'
      },
      styles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/_assets/styles',
          src: '*.scss',
          dest: '<%= source %>/assets/css',
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
          src: '<%= source %>/_assets/images/**/*.svg',
          dest: '<%= source %>/assets/img'
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
          cwd: '<%= source %>/_assets/images',
          src: '**/*.svg',
          dest: '<%= source %>/assets/img'
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
          src: '<%= source %>/_assets/scripts/plugins/**/*.js',
          dest: '<%= source %>/assets/js/script.min.js'
        }]
      },
      plugins: {
        files: [{
          src: '<%= source %>/_assets/scripts/plugins/**/*.js',
          dest: '<%= source %>/assets/js/script.min.js'
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
        files: ['<%= source %>/**/*', '!<%= source %>/_assets/**/*', '!<%= site %>/**/*', '!<%= source %>/assets/**/*'],
        tasks: 'jekyll'
      },
      fonts: {
        files: '<%= source %>/_assets/fonts/**/*',
        tasks: ['copy:fonts', 'copy:buildFonts']
      },
      images: {
        files: '<%= source %>/_assets/images/**/*',
        tasks: ['svg2png', 'svgmin', 'imagemin', 'copy:buildImages']
      },
      scripts: {
        files: '<%= source %>/_assets/scripts/**/*',
        tasks: ['jshint', 'uglify:devPlugins', 'copy:buildScripts']
      },
      styles: {
        files: '<%= source %>/_assets/styles/**/*',
        tasks: ['sass', 'autoprefixer:devStyles', 'copy:buildStyles']
      }
    }

  });

  /* ---------- Tasks ---------- */

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Dev task 'default'
  grunt.registerTask('default', ['clean:generated', 'copy:fonts', 'copy:vendorScripts', 'jshint', 'uglify:devPlugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:devStyles', 'clean:css', 'jekyll', 'connect', 'watch']);

  // Build task (builds to the '_site' folder)
  grunt.registerTask('build', ['clean:generated', 'copy:fonts', 'copy:vendorScripts', 'jshint', 'uglify:plugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:styles', 'cssmin', 'clean:css', 'jekyll', 'prettify']);

  // Downloads the latest versions of: .htaccess, _normalize.scss, _normalize_oldie.scss, boxsizing.htc, jquery.min.js, and oldie.min.js
  grunt.registerTask('download', ['curl']);

};