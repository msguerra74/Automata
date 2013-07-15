module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    // Project Variables
    prj: grunt.file.readJSON('SOURCE/project.json'),

    pkg: grunt.file.readJSON('package.json'),

    // Build Directories
    build: '_BUILD',
    temp: '.temp',

    // jQuery Version
    jquery_version: '1.10.2',

    // Clean Task
    clean: {
      all: ['.sass-cache', '<%= build %>', '<%= temp %>'],
      build: ['.sass-cache', '<%= temp %>']
    },

    // Compass Task
    compass: {
      options: {
        boring: true,
        cssDir: '<%= temp %>/css',
        environment: 'production',
        fontsDir: '<%= temp %>/fonts',
        force: true,
        imagesDir: '<%= temp %>/img',
        javascriptsDir: '<%= temp %>/js',
        outputStyle: 'compressed',
        relativeAssets: true,
        raw:
        // Cache Buster
        'asset_cache_buster :none\n' +
        // Preferred Syntax
        'preferred_syntax = :scss\n' +
        // Rename styles.css to styles.min.css
        // http://h3r2on.com/2013/05/17/rename-css-on-compile.html
        'on_stylesheet_saved do |file|\n' + 'if File.exists?(file)\n' + 'filename = File.basename(file, File.extname(file))\n' + 'File.rename(file, "<%= temp %>/css" + "/" + filename + ".min" + File.extname(file))\n' + 'end\n' + 'end\n'
      },
      styles: {
        options: {
          sassDir: '<%= prj.source %>/assets/styles'
        }
      },
      icons: {
        options: {
          sassDir: '<%= temp %>/_grunticon'
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
          cwd: '<%= prj.source %>/assets/scripts/vendor/misc',
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

    // Grunticon Task
    grunticon: {
      icons: {
        options: {
          datasvgcss: 'icons-data-svg.scss',
          datapngcss: 'icons-data-png.scss',
          loadersnippet: '_trash/grunticon.loader.txt',
          pngfolder: '../img/icons',
          previewhtml: '_trash/preview.html',
          urlpngcss: 'icons-png.scss',
          src: '<%= temp %>/img/icons',
          dest: '<%= temp %>/_grunticon'
        }
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
        }, {
          expand: true,
          cwd: '<%= temp %>/img',
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
        'responsive_design: <%= prj.responsive_design %>\n' + 'oldie_support: <%= prj.oldie_support %>\n' + 'svg_icons: <%= prj.svg_icons %>\n' + 'jquery_scripts: <%= prj.jquery %>\n' + 'jquery_version: <%= jquery_version %>\n' + 'scripts: <%= prj.scripts %>\n' + 'google_analytics: <%= prj.google_analytics %>\n' + 'google_analytics_id: <%= prj.google_analytics_id %>\n' +
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
          // Credentials are stored in .ftppass file
          authKey: '<%= prj.sftp_key %>'
        },
        src: '<%= build %>',
        dest: '<%= prj.sftp_path %>',
        server_sep: '/'
      }
    },

    // SVGmin Task
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= prj.source %>/assets/icons',
          src: '**/*',
          dest: '<%= temp %>/img/icons'
        }]
      }
    },

    // Uglify Task
    uglify: {
      scripts: {
        options: {
          banner: '<%= prj.dev_banner_open %><%= prj.dev_banner %><%= prj.dev_banner_close %>'
        },
        files: [{
          src: ['<%= prj.source %>/assets/scripts/plugins/**/*', '<%= prj.source %>/assets/scripts/vendor/plugins/**/*'],
          dest: '<%= temp %>/js/script.min.js'
        }]
      },
      vendor: {
        files: [{
          src: ['<%= prj.source %>/assets/scripts/vendor/oldie/**/*'],
          dest: '<%= temp %>/js/oldie.min.js'
        }, {
          src: ['<%= prj.source %>/assets/scripts/vendor/jquery/**/*'],
          dest: '<%= temp %>/js/jquery.min.js'
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
      icons: {
        files: ['<%= prj.source %>/assets/icons/**/*'],
        tasks: ['svgmin', 'grunticon', 'compass:icons']
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
  grunt.registerTask('assets', ['jshint', 'uglify', 'copy:htc', 'svgmin', 'grunticon', 'imagemin', 'copy:fonts', 'compass']);

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