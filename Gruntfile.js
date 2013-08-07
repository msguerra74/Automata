module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    // Project Variables File
    // prj: grunt.file.readJSON('Projects/_Default/project.json'),
    prj: grunt.file.readJSON('Projects/_Default/project.json'),

    // Automaton Project / Grund Dependencies
    pkg: grunt.file.readJSON('package.json'),

    /* ----- Variables ----- */

    // Directories
    build: '.BUILD',
    temp: '.temp',
    project: 'Projects/<%= prj.project %>',
    source: 'Projects/_Source',

    // Cache Buster Short Timestamp
    cache_buster: grunt.template.today('yymdHMs'),

    // Current Year
    current_year: grunt.template.today('yyyy'),

    // jQuery Version
    jquery_version: '1.10.2',

    /* ----- Assets & Content ----- */

    // Copy Task
    copy: {
      // Project Assets
      projectFonts: {
        files: [{
          expand: true,
          cwd: '<%= project %>/assets/fonts',
          src: '**/*',
          dest: '<%= temp %>/fonts'
        }]
      },
      projectStyles: {
        files: [{
          expand: true,
          cwd: '<%= project %>/assets/styles',
          src: '**/*',
          dest: '<%= temp %>/_scss'
        }]
      },
      // Project Content
      projectDrafts: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/posts/drafts',
          src: '**/*',
          dest: '<%= temp %>/_drafts'
        }]
      },
      projectIncludes: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/templates/layouts/includes',
          src: '**/*',
          dest: '<%= temp %>/_includes'
        }]
      },
      projectLayouts: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/templates/layouts',
          src: ['**/*', '!includes/**/*', '!includes/*', '!includes'],
          dest: '<%= temp %>/_layouts'
        }]
      },
      projectPages: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/pages',
          src: '**/*',
          dest: '<%= temp %>'
        }]
      },
      projectPlugins: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/templates/plugins',
          src: '**/*',
          dest: '<%= temp %>/_plugins'
        }]
      },
      projectPosts: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/posts',
          src: ['**/*', '!drafts/**/*', '!drafts/*', '!drafts'],
          dest: '<%= temp %>/_posts'
        }]
      },
      projectRoot: {
        files: [{
          expand: true,
          cwd: '<%= project %>/content/templates/root',
          src: '**/{*,.*}',
          dest: '<%= temp %>'
        }]
      },
      // Source Assets
      sourceStyles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/styles',
          src: '**/*',
          dest: '<%= temp %>/_scss'
        }]
      },
      // Source Content
      sourceIncludes: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/templates/layouts/includes',
          src: '**/*',
          dest: '<%= temp %>/_includes'
        }]
      },
      sourceLayouts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/templates/layouts',
          src: ['**/*', '!includes/**/*', '!includes/*', '!includes'],
          dest: '<%= temp %>/_layouts'
        }]
      },
      sourceRoot: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/templates/root',
          src: '**/{*,.*}',
          dest: '<%= temp %>'
        }]
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
          src: ['<%= temp %>/_scss/**/*'],
          dest: '<%= temp %>/_scss'
        }, {
          expand: true,
          flatten: true,
          src: ['<%= temp %>/_includes/**/*'],
          dest: '<%= temp %>/_includes'
        }]
      }
    },

    /* ----- Styles ----- */

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
        'cache_path = "<%= temp %>/_scss/.sass-cache"\n' +
        // Rename styles.css to styles.min.css
        // http://h3r2on.com/2013/05/17/rename-css-on-compile.html
        'on_stylesheet_saved do |file|\n' +
        'if File.exists?(file)\n' +
        'filename = File.basename(file, File.extname(file))\n' +
        'File.rename(file, "<%= temp %>/css" + "/" + filename + ".min" + File.extname(file))\n' +
        'end\n' +
        'end\n'
      },
      build: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          sassDir: '<%= temp %>/_scss'
        }
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          sassDir: '<%= temp %>/_scss'
        }
      }
    },

    /* ----- Images & SVGs ----- */

    // Imagemin Task
    imagemin: {
      images: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= project %>/assets/images',
          src: '**/*',
          dest: '<%= temp %>/img'
        }, {
          expand: true,
          cwd: '<%= temp %>/img/icons',
          src: '**/*',
          dest: '<%= temp %>/img/icons'
        }]
      }
    },

    // Grunticon Task
    grunticon: {
      icons: {
        options: {
          datasvgcss: 'icon.data.svg.scss',
          datapngcss: 'icon.data.png.scss',
          loadersnippet: 'grunticon.loader.txt',
          pngfolder: '../img/icons',
          previewhtml: 'preview.html',
          urlpngcss: 'icon.png.scss',
          src: "<%= project %>/assets/images/icons",
          dest: "<%= temp %>/_scss"
        }
      }
    },

    /* ----- Scripts ----- */

    // JShint Task
    jshint: {
      scripts: ['Gruntfile.js', '<%= project %>/assets/scripts/**/*']
    },

    // Uglify Task
    uglify: {
      scripts: {
        options: {
          banner: '<%= prj.dev_banner_open %><%= prj.dev_banner %><%= prj.dev_banner_close %>'
        },
        files: [{
          expand: true,
          cwd: '<%= project %>/assets/scripts',
          src: ['**/*.js', '!plugins/**/*', '!plugins/*', '!plugins'],
          dest: '<%= temp %>/js',
          ext: '.min.js'
        }, {
          src: ['<%= project %>/assets/scripts/plugins/**/*.js'],
          dest: '<%= temp %>/js/script.min.js'
        }, {
          expand: true,
          cwd: '<%= source %>/assets/scripts',
          src: ['**/*.js', '!oldie/**/*', '!oldie/*', '!oldie', '!jquery.js'],
          dest: '<%= temp %>/js',
          ext: '.min.js'
        }, {
          src: ['<%= source %>/assets/scripts/jquery.js'],
          dest: '<%= temp %>/js/jquery-<%= jquery_version %>.min.js'
        }, {
          src: ['<%= source %>/assets/scripts/oldie/**/*.js'],
          dest: '<%= temp %>/js/oldie.min.js'
        }]
      }
    },

    /* ----- Content ----- */

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
        'url: <%= prj.url %>\n' +
        'name: <%= prj.name %>\n' +
        'description: <%= prj.description %>\n' +
        'owner: <%= prj.owner %>\n' +
        'email: <%= prj.email %>\n' +
        // Custom Website Components
        'ie_edge: <%= prj.ie_edge %>\n' +
        'responsive_design: <%= prj.responsive_design %>\n' +
        'blog_feed: <%= prj.blog_feed %>\n' +
        'svg_images: <%= prj.svg_images %>\n' +
        'head_insert: <%= prj.head_insert %>\n' +
        'oldie_support: <%= prj.oldie_support %>\n' +
        'jquery: <%= prj.jquery %>\n' +
        'jquery_version: <%= jquery_version %>\n' +
        'scripts: <%= prj.scripts %>\n' +
        'foot_insert: <%= prj.foot_insert %>\n' +
        'google_analytics: <%= prj.google_analytics %>\n' +
        'google_analytics_id: <%= prj.google_analytics_id %>\n' +
        'cache_buster: <%= cache_buster %>\n' +
        // Global Jekyll Configuration
        'exclude: [<%= prj.exclude %>]\n' +
        'include: [<%= prj.include %>]\n' +
        'keep_files: [<%= prj.keep_files %>]\n' +
        'timezone: <%= prj.timezone %>\n' +
        'paginate: <%= prj.paginate %>\n' +
        'permalink: <%= prj.permalink %>\n' +
        'markdown: <%= prj.markdown %>\n'
      }
    },

    /* ----- Dev Tasks ----- */

    // Clean Task
    clean: {
      all: ['<%= temp %>', '<%= build %>']
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

    // Open Task
    open: {
      browser: {
        path: '<%= prj.dev_url %>'
      }
    },

    // Watch Task
    watch: {
      // Watch Assets
      fonts: {
        files: ['<%= project %>/assets/fonts/**/*'],
        tasks: ['copy:projectFonts']
      },
      images: {
        files: ['<%= project %>/assets/images/**/*'],
        tasks: ['imagemin']
      },
      scripts: {
        files: ['<%= project %>/assets/scripts/**/*'],
        tasks: ['jshint', 'uglify']
      },
      styles: {
        files: ['<%= project %>/assets/styles/**/*'],
        tasks: ['copy:projectStyles', 'compass:dev']
      },
      // Watch Content
      drafts: {
        files: ['<%= project %>/content/posts/drafts/**/*'],
        tasks: ['copy:projectDrafts']
      },
      includes: {
        files: ['<%= project %>/content/templates/layouts/includes/**/*'],
        tasks: ['copy:projectIncludes']
      },
      layouts: {
        files: ['<%= project %>/content/templates/layouts/**/*'],
        tasks: ['copy:projectLayouts']
      },
      pages: {
        files: ['<%= project %>/content/pages/**/*'],
        tasks: ['copy:projectPages']
      },
      posts: {
        files: ['<%= project %>/content/posts/**/*'],
        tasks: ['copy:projectPosts']
      },
      root: {
        files: ['<%= project %>/content/root/**/*'],
        tasks: ['copy:projectRoot']
      },
      // Watch Source
      sourceIncludes: {
        files: ['<%= source %>/content/templates/layouts/includes/**/*'],
        tasks: ['copy:sourceIncludes', 'replace']
      },
      sourceLayouts: {
        files: ['<%= source %>/content/templates/layouts/**/*'],
        tasks: ['copy:sourceLayouts']
      },
      sourceRoot: {
        files: ['<%= source %>/content/templates/root/**/*'],
        tasks: ['copy:sourceRoot']
      },
      sourceScripts: {
        files: ['<%= source %>/assets/scripts/**/*'],
        tasks: ['jshint', 'uglify']
      },
      sourceStyles: {
        files: ['<%= source %>/assets/styles/**/*'],
        tasks: ['copy:sourceStyles', 'replace']
      },
      // Watch Temp
      temp: {
        files: ['<%= temp %>/**/*'],
        tasks: ['jekyll']
      }
    },

    /* ----- Deployment Tasks ----- */

    // Amazon S3 Deploy Task
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
          /**
           * Store 'authKey' credentials in root .ftppass file in this format:
           *
             {
               "key": {
                 "username": "myusername",
                 "password": "mypassword"
               }
             }
           *
           */
          authKey: '<%= prj.sftp_key %>'
        },
        src: '<%= build %>',
        dest: '<%= prj.sftp_path %>',
        server_sep: '/'
      }
    }

  });

  // Load NPM Tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Default Tasks - Clean generated folders
  grunt.registerTask('default', ['clean']);

  // Precompile Tasks
  grunt.registerTask('precompile', ['default', 'copy', 'replace', 'jshint', 'uglify', 'grunticon', 'imagemin']);

  // Compile Tasks
  grunt.registerTask('compile', ['precompile', 'compass:dev', 'jekyll']);

  // Dev Tasks
  grunt.registerTask('dev', ['compile', 'connect', 'open', 'watch']);

  // Build Tasks
  grunt.registerTask('build', ['precompile', 'compass:build', 'jekyll']);

  // Amazon S3 Deploy Tasks
  grunt.registerTask('s3deploy', ['build', 's3']);

  // SFTP Deploy Tasks
  grunt.registerTask('sftpdeploy', ['build', 'sftp-deploy']);

};