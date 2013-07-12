module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Project Variables
    prj: grunt.file.readJSON('automaton.json'),

    // jQuery Version
    jquery_version: '1.10.2',

    // Clean Task
    clean: {
      all: ['.sass-cache', '<%= prj.build %>', '<%= prj.temp %>'],
      build: ['.sass-cache', '<%= prj.temp %>']
    },

    // Compass Task
    compass: {
      sass: {
        options: {
          boring: true,
          cssDir: '<%= prj.temp %>/css',
          environment: 'production',
          fontsDir: '<%= prj.temp %>/fonts',
          force: true,
          imagesDir: '<%= prj.temp %>/img',
          javascriptsDir: '<%= prj.temp %>/js',
          outputStyle: 'compressed',
          relativeAssets: true,
          sassDir: '<%= prj.source %>/assets/styles',
          raw:
          // Cache Buster
          'asset_cache_buster :none\n' +
          // Preferred Syntax
          'preferred_syntax = :scss\n' +
          // Rename styles.css to styles.min.css
          // http://h3r2on.com/2013/05/17/rename-css-on-compile.html
          'on_stylesheet_saved do |file|\n' + 'if File.exists?(file)\n' + 'filename = File.basename(file, File.extname(file))\n' + 'File.rename(file, "<%= prj.temp %>/css" + "/" + filename + ".min" + File.extname(file))\n' + 'end\n' + 'end'
        }
      }
    },

    // Connect Task
    connect: {
      server: {
        options: {
          port: '<%= prj.dev_url_port %>',
          base: '<%= prj.build %>',
          hostname: ''
        }
      }
    },

    // Copy Task
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/assets/fonts',
          src: '**/*',
          dest: '<%= prj.temp %>/fonts'
        }]
      },
      drafts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/posts/_drafts',
          src: ['**/*'],
          dest: '<%= prj.temp %>/_drafts'
        }]
      },
      includes: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_layouts/_includes',
          src: ['**/*'],
          dest: '<%= prj.temp %>/_includes'
        }]
      },
      layouts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_layouts',
          src: ['**/*', '!_**/_**/*', '!_**/*', '!_**'],
          dest: '<%= prj.temp %>/_layouts'
        }]
      },
      pages: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/pages',
          src: ['**/*'],
          dest: '<%= prj.temp %>'
        }]
      },
      plugins: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_plugins',
          src: ['**/*'],
          dest: '<%= prj.temp %>/_plugins'
        }]
      },
      posts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/posts',
          src: ['**/*', '!_**/*', '!_**'],
          dest: '<%= prj.temp %>/_posts'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/root',
          src: ['**/{*,.*}'],
          dest: '<%= prj.temp %>'
        }]
      }
    },

    // Imagemin Task
    imagemin: {
      images: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/assets/images',
          src: '**/*',
          dest: '<%= prj.temp %>/img'
        }]
      }
    },

    // Jekyll Task
    jekyll: {
      build: {
        dest: '<%= prj.build %>',
        drafts: false,
        future: false,
        lsi: false,
        src: '<%= prj.temp %>',
        raw:
        // Website Info
        'url: <%= prj.url %>\n' + 'name: <%= prj.name %>\n' + 'description: <%= prj.description %>\n' + 'owner: <%= prj.owner %>\n' + 'email: <%= prj.email %>\n' +
        // Custom Website Components
        'responsive_design: <%= prj.responsive_design %>\n' + 'oldie_support: <%= prj.oldie_support %>\n' + 'jquery_scripts: <%= prj.jquery_scripts %>\n' + 'jquery_version: <%= jquery_version %>\n' + 'code_highlighting: <%= prj.code_highlighting %>\n' + 'google_analytics: <%= prj.google_analytics %>\n' + 'google_analytics_id: <%= prj.google_analytics_id %>\n' +
        // Global Jekyll Configuration
        'exclude: [<%= prj.exclude %>]\n' + 'include: [<%= prj.include %>]\n' + 'keep_files: [<%= prj.keep_files %>]\n' + 'timezone: <%= prj.timezone %>\n' +
        // Jekyll Build Command Options
        'paginate: <%= prj.paginate %>\n' + 'permalink: <%= prj.permalink %>\n' + 'markdown: <%= prj.markdown %>'
      }
    },

    // JShint Task
    jshint: {
      source: ['Gruntfile.js', '<%= prj.source %>/assets/scripts/plugins/**/*']
    },

    // Open Task
    open: {
      browser: {
        path: '<%= prj.dev_url %>'
      }
    },

    // Replace Task
    replace: {
      banner: {
        options: {
          variables: {
            ' banner %>': '<%= prj.dev_banner %>'
          },
          prefix: '<%='
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= prj.temp %>/css/**/*'],
          dest: '<%= prj.temp %>/css'
        }, {
          expand: true,
          flatten: true,
          src: ['<%= prj.temp %>/_includes/**/*'],
          dest: '<%= prj.temp %>/_includes'
        }]
      }
    },

    // Uglify Task
    uglify: {
      plugins: {
        options: {
          banner: '<%= prj.dev_banner_open %><%= prj.dev_banner %><%= prj.dev_banner_close %>'
        },
        files: [{
          src: ['<%= prj.source %>/assets/scripts/plugins/**/*'],
          dest: '<%= prj.temp %>/js/script.min.js'
        }]
      },
      vendor: {
        options: {
          compress: false,
          mangle: false,
          preserveComments: 'all'
        },
        files: [{
          src: ['<%= prj.source %>/assets/scripts/vendor/html5shiv.*'],
          dest: '<%= prj.temp %>/js/oldie.min.js'
        }, {
          src: ['<%= prj.source %>/assets/scripts/vendor/jquery.*'],
          dest: '<%= prj.temp %>/js/jquery.min.js'
        }, {
          src: ['<%= prj.source %>/assets/scripts/vendor/prism.*'],
          dest: '<%= prj.temp %>/js/prism.min.js'
        }]
      }
    },

    // Watch Task
    watch: {
      build: {
        files: ['<%= prj.temp %>/**/*'],
        tasks: ['replace', 'jekyll']
      },
      css: {
        files: ['<%= prj.source %>/assets/styles/**/*'],
        tasks: ['compass']
      },
      fonts: {
        files: ['<%= prj.source %>/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      content: {
        files: ['<%= prj.source %>/content/**/*'],
        tasks: ['content']
      },
      img: {
        files: ['<%= prj.source %>/assets/images/**/*'],
        tasks: ['imagemin']
      },
      js: {
        files: ['<%= prj.source %>/assets/scripts/**/*'],
        tasks: ['jshint', 'uglify']
      }
    }

  });

  // Load NPM Tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Default Tasks
  grunt.registerTask('default', ['clean:all']);

  // Assets Tasks
  grunt.registerTask('assets', ['jshint', 'uglify', 'imagemin', 'copy:fonts', 'compass']);

  // Content Tasks
  grunt.registerTask('content', ['copy:drafts', 'copy:includes', 'copy:layouts', 'copy:pages', 'copy:plugins', 'copy:posts', 'copy:root']);

  // Compile Tasks
  grunt.registerTask('compile', ['clean:all', 'assets', 'content', 'replace', 'jekyll']);

  // Dev Tasks
  grunt.registerTask('dev', ['compile', 'connect', 'open', 'watch']);

  // Build Tasks
  grunt.registerTask('build', ['compile', 'clean:build']);

};