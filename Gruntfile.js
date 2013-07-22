module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    // Project Variables
    // EDIT THIS PATH TO MATCH PROJECT PATH
    // Default // prj: grunt.file.readJSON('SOURCE/project.json'),
    prj: grunt.file.readJSON('SOURCE/project.json'),

    // Automaton Project / Grunt Dependencies
    pkg: grunt.file.readJSON('package.json'),

    // Build Directories
    build: '.BUILD',
    temp: '.temp',

    // jQuery Version
    jquery_version: '1.10.2',

    // Clean Task
    clean: {
      all: ['<%= build %>', '<%= temp %>'],
      build: ['<%= temp %>']
    },

    // Compass Task
    compass: {
      options: {
        boring: true,
        cssDir: '<%= temp %>/css',
        fontsDir: '<%= temp %>/fonts',
        force: true,
        imagesDir: '<%= temp %>/img',
        javascriptsDir: '<%= temp %>/js',
        relativeAssets: true,
        raw:
        // Cache Buster
        'asset_cache_buster :none\n' +
        // Preferred Syntax
        'preferred_syntax = :scss\n' +
        // Sass Cache
        'cache_path = "<%= temp %>/css/.sass-cache"\n' +
        // Rename styles.css to styles.min.css
        // http://h3r2on.com/2013/05/17/rename-css-on-compile.html
        'on_stylesheet_saved do |file|\n' + 'if File.exists?(file)\n' + 'filename = File.basename(file, File.extname(file))\n' + 'File.rename(file, "<%= temp %>/css" + "/" + filename + ".min" + File.extname(file))\n' + 'end\n' + 'end\n'
      },
      styles: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          sassDir: '<%= prj.source %>/assets/styles'
        }
      }
    },

    // Connect Task
    connect: {
      server: {
        options: {
          port: '<%= prj.dev_url_port %>',
          base: '<%= build %>',
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
          dest: '<%= temp %>/fonts'
        }]
      },
      drafts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/posts/_drafts',
          src: ['**/*'],
          dest: '<%= temp %>/_drafts'
        }]
      },
      htc: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/assets/scripts',
          src: ['**/*.htc'],
          dest: '<%= temp %>/js'
        }]
      },
      includes: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_templates/_layouts/_includes',
          src: ['**/*'],
          dest: '<%= temp %>/_includes'
        }]
      },
      layouts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_templates/_layouts',
          src: ['**/*', '!_**/_**/*', '!_**/*', '!_**'],
          dest: '<%= temp %>/_layouts'
        }]
      },
      pages: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/pages',
          src: ['**/*'],
          dest: '<%= temp %>'
        }]
      },
      plugins: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_templates/_plugins',
          src: ['**/*'],
          dest: '<%= temp %>/_plugins'
        }]
      },
      posts: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/posts',
          src: ['**/*', '!_**/*', '!_**'],
          dest: '<%= temp %>/_posts'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/content/_templates/root',
          src: ['**/{*,.*}'],
          dest: '<%= temp %>'
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
          dest: '<%= temp %>/img'
        }]
      }
    },

    // Jekyll Task
    jekyll: {
      build: {
        dest: '<%= build %>',
        drafts: false,
        future: false,
        lsi: false,
        src: '<%= temp %>',
        raw:
        // Website Info
        'url: <%= prj.url %>\n' + 'name: <%= prj.name %>\n' + 'description: <%= prj.description %>\n' + 'owner: <%= prj.owner %>\n' + 'email: <%= prj.email %>\n' +
        // Custom Website Components
        'ie_edge: <%= prj.ie_edge %>\n' + 'responsive_design: <%= prj.responsive_design %>\n' + 'web_fonts: <%= prj.web_fonts %>\n' + 'web_fonts_stack: <%= prj.web_fonts_stack %>\n' + 'oldie_support: <%= prj.oldie_support %>\n' + 'jquery_scripts: <%= prj.jquery %>\n' + 'jquery_version: <%= jquery_version %>\n' + 'scripts: <%= prj.scripts %>\n' + 'google_analytics: <%= prj.google_analytics %>\n' + 'google_analytics_id: <%= prj.google_analytics_id %>\n' +
        // Global Jekyll Configuration
        'exclude: [<%= prj.exclude %>]\n' + 'include: [<%= prj.include %>]\n' + 'keep_files: [<%= prj.keep_files %>]\n' + 'timezone: <%= prj.timezone %>\n' +
        // Jekyll Build Command Options
        'paginate: <%= prj.paginate %>\n' + 'permalink: <%= prj.permalink %>\n'
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
          src: ['<%= temp %>/css/**/*'],
          dest: '<%= temp %>/css'
        }, {
          expand: true,
          flatten: true,
          src: ['<%= temp %>/_includes/**/*'],
          dest: '<%= temp %>/_includes'
        }]
      }
    },

    // S3 Deploy Task
    s3: {
      options: {
        key: '<%= prj.s3_key %>',
        secret: '<%= prj.s3_secret %>',
        bucket: '<%= prj.s3_bucket %>',
        access: '<%= prj.s3_access %>'
      },
      deploy: {
        upload: [{
          src: '<%= build %>/**/*',
          dest: '',
          gzip: true,
          rel: '<%= build %>'
        }]
      }

    },

    // SFTP Deploy Task
    'sftp-deploy': {
      deploy: {
        auth: {
          host: '<%= prj.sftp_host %>',
          port: 22,
          // Store credentials in .ftppass file with this format:
          // {
          //   "key": {
          //     "username": "username",
          //     "password": "password"
          //   }
          // }
          authKey: '<%= prj.sftp_key %>'
        },
        src: '<%= build %>',
        dest: '<%= prj.sftp_path %>',
        server_sep: '/'
      }
    },

    // Uglify Task
    uglify: {
      scripts: {
        options: {
          banner: '<%= prj.dev_banner_open %><%= prj.dev_banner %><%= prj.dev_banner_close %>'
        },
        files: [{
          src: ['<%= prj.source %>/assets/scripts/oldie/**/*'],
          dest: '<%= temp %>/js/oldie.min.js'
        }, {
          src: ['<%= prj.source %>/assets/scripts/plugins/**/*'],
          dest: '<%= temp %>/js/script.min.js'
        }, {
          expand: true,
          cwd: '<%= prj.source %>/assets/scripts',
          src: ['*.js'],
          dest: '<%= temp %>/js',
          ext: '.min.js'
        }]
      }
    },

    // Watch Task
    watch: {
      build: {
        files: ['<%= temp %>/**/*'],
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
  grunt.registerTask('assets', ['jshint', 'uglify', 'copy:htc', 'imagemin', 'copy:fonts', 'compass']);

  // Content Tasks
  grunt.registerTask('content', ['copy:drafts', 'copy:includes', 'copy:layouts', 'copy:pages', 'copy:plugins', 'copy:posts', 'copy:root']);

  // Compile Tasks
  grunt.registerTask('compile', ['clean:all', 'assets', 'content', 'replace', 'jekyll']);

  // Dev Tasks
  grunt.registerTask('dev', ['compile', 'connect', 'open', 'watch']);

  // Build Tasks
  grunt.registerTask('build', ['compile', 'clean:build']);

  // S3 Deploy Tasks
  grunt.registerTask('s3deploy', ['build', 's3']);

  // SFTP Deploy Tasks
  grunt.registerTask('sftpdeploy', ['build', 'sftp-deploy']);

};