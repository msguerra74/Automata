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

    // Project variables file (Change '_example.com' to current project)
    prj: grunt.file.readYAML('Projects/_example.com/project.yml'),

    // Automata project package
    pkg: grunt.file.readJSON('package.json'),

    // Developer Banner
    banner: '<%= prj.banner %>',

    // Directories
    build: '<%= source %>/_BUILD',
    source: 'Projects/<%= prj.directory %>',

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
      build: ['<%= build %>/**/{*,.*}', '!<%= build %>/{.git,sftp-config.json}'],
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
      },
      htc: {
        expand: true,
        cwd: '<%= source %>/assets/scripts/vendor',
        src: '**/*.htc',
        dest: '<%= build %>/assets/js'
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
      boxsizing: {
        src: 'https://raw.github.com/Schepp/box-sizing-polyfill/master/boxsizing.htc',
        dest: '<%= source %>/assets/scripts/vendor/boxsizing.htc'
      },
      htaccess: {
        src: 'http://raw.github.com/h5bp/html5-boilerplate/master/.htaccess',
        dest: '<%= source %>/content/.htaccess'
      },
      jquery: {
        src: 'http://code.jquery.com/jquery.min.js',
        dest: '<%= source %>/assets/scripts/vendor/jquery.min.js'
      },
      oldie: {
        src: ['http://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv-printshiv.js'],
        dest: '<%= source %>/assets/scripts/vendor/oldie.min.js'
      },
      normalize: {
        src: 'http://raw.github.com/necolas/normalize.css/master/normalize.css',
        dest: '<%= source %>/assets/styles/vendor/_normalize.scss'
      },
      normalize_oldie: {
        src: 'http://raw.github.com/necolas/normalize.css/v1/normalize.css',
        dest: '<%= source %>/assets/styles/vendor/_normalize_oldie.scss'
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
          config: '<%= source %>/project.yml',
          dest: '<%= build %>',
          src: '<%= source %>/content'
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
     * Prettify
     * Prettify HTML
     * https://github.com/jonschlinkert/grunt-prettify
     */

    prettify: {
      options: {
        brace_style: 'collapse',
        indent_inner_html: false,
        indent_scripts: 'normal',
        unformatted: ['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'cite', 'code', 'dd', 'del', 'dfn', 'dt', 'em', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'i', 'ins', 'kbd', 'li', 'p', 'pre', 'q', 's', 'samp', 'small', 'span', 'strike', 'strong', 'sub', 'sup', 'tt', 'u', 'var']
      },
      content: {
        expand: true,
        cwd: '<%= build %>',
        src: '**/*.{html,php}',
        dest: '<%= build %>'
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
  grunt.registerTask('default', ['clean:build', 'copy', 'jshint', 'uglify:devPlugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:devStyles', 'clean:css', 'jekyll', 'connect', 'watch']);

  // Build task
  grunt.registerTask('build', ['clean:build', 'copy', 'jshint', 'uglify:plugins', 'svg2png', 'svgmin', 'imagemin', 'sass', 'autoprefixer:styles', 'cssmin', 'clean:css', 'jekyll', 'prettify']);

  // Downloads the latest versions of: .htaccess, _normalize.scss, _normalize_oldie.scss, boxsizing.htc, jquery.min.js, and oldie.min.js
  grunt.registerTask('download', ['curl']);

};