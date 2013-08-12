module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    // Project Variables File
    // website: grunt.file.readJSON('Websites/_example.com/website.json'),
    website: grunt.file.readJSON('Websites/test.com/website.json'),

    // Automaton Project and Grunt Dependencies
    pkg: grunt.file.readJSON('package.json'),

    /* ----- Variables ----- */

    // Directories
    build: '_BUILD',
    temp: '_temp',
    site: 'Websites/<%= website.site %>',
    source: 'Websites/_Source',

    // Cache Buster Short Timestamp
    cache_buster: grunt.template.today('yymdHMs'),

    // Current Year
    current_year: grunt.template.today('yyyy'),

    // jQuery Version
    jquery_version: '1.10.2',

    /* ----- Assets & Content ----- */

    // Copy Task
    copy: {
      // Source Assets
      sourceStyles: {
        files: [{
          expand: true,
          cwd: '<%= source %>/styles',
          src: '**/*',
          dest: '<%= temp %>/scss'
        }]
      },
      // Source Content
      sourceIncludes: {
        files: [{
          expand: true,
          cwd: '<%= source %>/_layouts/_includes',
          src: '**/*',
          dest: '<%= temp %>/html/_includes'
        }]
      },
      sourceLayouts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/_layouts',
          src: ['**/*', '!_includes/**/*', '!_includes/*', '!_includes'],
          dest: '<%= temp %>/html/_layouts'
        }]
      },
      sourceRoot: {
        files: [{
          expand: true,
          cwd: '<%= source %>/root',
          src: '**/{*,.*}',
          dest: '<%= temp %>/html'
        }]
      },
      // Project Assets
      siteFonts: {
        files: [{
          expand: true,
          cwd: '<%= site %>/fonts',
          src: '**/*',
          dest: '<%= build %>/fonts'
        }]
      },
      siteStyles: {
        files: [{
          expand: true,
          cwd: '<%= site %>/styles',
          src: '**/*',
          dest: '<%= temp %>/scss'
        }]
      },
      // Project Content
      siteDrafts: {
        files: [{
          expand: true,
          cwd: '<%= site %>/posts/_drafts',
          src: '**/*',
          dest: '<%= temp %>/html/_drafts'
        }]
      },
      siteIncludes: {
        files: [{
          expand: true,
          cwd: '<%= site %>/_layouts/_includes',
          src: '**/*',
          dest: '<%= temp %>/html/_includes'
        }]
      },
      siteLayouts: {
        files: [{
          expand: true,
          cwd: '<%= site %>/_layouts',
          src: ['**/*', '!_includes/**/*', '!_includes/*', '!_includes'],
          dest: '<%= temp %>/html/_layouts'
        }]
      },
      sitePages: {
        files: [{
          expand: true,
          cwd: '<%= site %>/pages',
          src: '**/*',
          dest: '<%= temp %>/html'
        }]
      },
      sitePlugins: {
        files: [{
          expand: true,
          cwd: '<%= site %>/_plugins',
          src: '**/*',
          dest: '<%= temp %>/html/_plugins'
        }]
      },
      sitePosts: {
        files: [{
          expand: true,
          cwd: '<%= site %>/posts',
          src: ['**/*', '!_drafts/**/*', '!_drafts/*', '!_drafts'],
          dest: '<%= temp %>/html/_posts'
        }]
      },
      siteRoot: {
        files: [{
          expand: true,
          cwd: '<%= site %>/root',
          src: '**/{*,.*}',
          dest: '<%= temp %>/html'
        }]
      },
      // Content Build
      contentBuild: {
        files: [{
          expand: true,
          cwd: '<%= temp %>/_build',
          src: '**/{*,.*}',
          dest: '<%= build %>'
        }]
      }
    },

    // Replace Task
    replace: {
      options: {
        variables: {
          ' banner %>': '<%= website.dev_banner %>'
        },
        prefix: '<%='
      },
      styles: {
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= temp %>/scss/**/*'],
          dest: '<%= temp %>/scss'
        }]
      },
      includes: {
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= temp %>/html/_layouts/**/*'],
          dest: '<%= temp %>/html/_layouts'
        }]
      }
    },

    /* ----- Styles ----- */

    // Compass Task
    compass: {
      options: {
        boring: true,
        cssDir: '<%= build %>/css',
        fontsDir: '<%= build %>/fonts',
        force: true,
        imagesDir: '<%= build %>/img',
        javascriptsDir: '<%= build %>/js',
        relativeAssets: true,
        raw:
        // Cache Buster
        'asset_cache_buster :none\n' +
        // Preferred Syntax
        'preferred_syntax = :scss\n' +
        // Sass Cache
        'cache_path = "<%= temp %>/scss/.sass-cache"\n' +
        // Rename styles.css to styles.min.css
        // http://h3r2on.com/2013/05/17/rename-css-on-compile.html
        'on_stylesheet_saved do |file|\n' +
        'if File.exists?(file)\n' +
        'filename = File.basename(file, File.extname(file))\n' +
        'File.rename(file, "<%= build %>/css" + "/" + filename + ".min" + File.extname(file))\n' +
        'end\n' +
        'end\n'
      },
      build: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          sassDir: ['<%= temp %>/scss']
        }
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          sassDir: '<%= temp %>/scss'
        }
      }
    },

    /* ----- Images & SVGs ----- */

    // Imagemin Task
    imagemin: {
      options: {
        optimizationLevel: 7,
        progressive: true
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= site %>/images',
          src: '**/*',
          dest: '<%= build %>/img'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= temp %>/img/icons',
          src: '**/*',
          dest: '<%= build %>/img/icons'
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
          src: "<%= site %>/icons",
          dest: "<%= temp %>/scss"
        }
      }
    },

    /* ----- Scripts ----- */

    // JShint Task
    jshint: {
      siteScripts: ['<%= site %>/scripts/**/*']
    },

    // Uglify Task
    uglify: {
      options: {
        banner: '<%= website.dev_banner_open %><%= website.dev_banner %><%= website.dev_banner_close %>'
      },
      sourceScripts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/scripts',
          src: ['**/*.js', '!oldie/**/*', '!oldie/*', '!oldie', '!jquery.js'],
          dest: '<%= build %>/js',
          ext: '.min.js'
        }, {
          src: ['<%= source %>/scripts/jquery.js'],
          dest: '<%= build %>/js/jquery-<%= jquery_version %>.min.js'
        }, {
          src: ['<%= source %>/scripts/oldie/**/*.js'],
          dest: '<%= build %>/js/oldie.min.js'
        }]
      },
      siteScripts: {
        files: [{
          expand: true,
          cwd: '<%= site %>/scripts',
          src: ['**/*.js', '!plugins/**/*', '!plugins/*', '!plugins'],
          dest: '<%= build %>/js',
          ext: '.min.js'
        }, {
          src: ['<%= site %>/scripts/plugins/**/*.js'],
          dest: '<%= build %>/js/script.min.js'
        }]
      }
    },

    /* ----- Content ----- */

    // Jekyll Task
    jekyll: {
      build: {
        dest: '<%= temp %>/_build',
        drafts: false,
        future: false,
        lsi: false,
        src: '<%= temp %>/html',
        raw:
        // Website Info
        'url: <%= website.url %>\n' +
        'title: <%= website.title %>\n' +
        'description: <%= website.description %>\n' +
        'owner: <%= website.owner %>\n' +
        'email: <%= website.email %>\n' +
        // Custom Website Components
        'ie_edge: <%= website.ie_edge %>\n' +
        'responsive_design: <%= website.responsive_design %>\n' +
        'blog_feed: <%= website.blog_feed %>\n' +
        'svg_images: <%= website.svg_images %>\n' +
        'head_include: <%= website.head_include %>\n' +
        'oldie_support: <%= website.oldie_support %>\n' +
        'jquery: <%= website.jquery %>\n' +
        'jquery_version: <%= jquery_version %>\n' +
        'scripts: <%= website.scripts %>\n' +
        'foot_include: <%= website.foot_include %>\n' +
        'google_analytics: <%= website.google_analytics %>\n' +
        'google_analytics_id: <%= website.google_analytics_id %>\n' +
        'cache_buster: <%= cache_buster %>\n' +
        // Global Jekyll Configuration
        'exclude: [<%= website.exclude %>]\n' +
        'include: [<%= website.include %>]\n' +
        'keep_files: [<%= website.keep_files %>]\n' +
        'timezone: <%= website.timezone %>\n' +
        'paginate: <%= website.paginate %>\n' +
        'permalink: <%= website.permalink %>\n' +
        'markdown: <%= website.markdown %>\n'
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
          port: '<%= website.dev_url_port %>',
          base: '<%= build %>',
          hostname: ''
        }
      }
    },

    // Open Task
    open: {
      browser: {
        path: '<%= website.dev_url %>'
      }
    },

    // Watch Task
    watch: {
      // Watch Assets
      fonts: {
        files: ['<%= site %>/fonts/**/*'],
        tasks: ['fonts']
      },
      icons: {
        files: ['<%= site %>/icons/**/*'],
        tasks: ['icons', 'compass:dev']
      },
      images: {
        files: ['<%= site %>/images/**/*'],
        tasks: ['imagemin:images']
      },
      scripts: {
        files: ['<%= site %>/scripts/**/*'],
        tasks: ['siteScripts']
      },
      styles: {
        files: ['<%= site %>/styles/**/*'],
        tasks: ['siteStyles', 'compass:dev']
      },
      // Watch Content
      content: {
        files: ['<%= site %>/{_layouts,pages,posts,root}/**/*'],
        tasks: ['siteContent', 'jekyll', 'copy:contentBuild']
      }
    },

    /* ----- Deployment Tasks ----- */

    // Amazon S3 Deploy Task
    s3: {
      options: {
        key: '<%= website.s3_key %>',
        secret: '<%= website.s3_secret %>',
        bucket: '<%= website.s3_bucket %>',
        access: '<%= website.s3_access %>'
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
          host: '<%= website.sftp_host %>',
          port: 22,
          // Store 'authKey' credentials in root .ftppass file in this format:
          // {
          //   "key": {
          //     "username": "myusername",
          //     "password": "mypassword"
          //   }
          // }
          authKey: '<%= website.sftp_key %>'
        },
        src: '<%= build %>',
        dest: '<%= website.sftp_path %>',
        server_sep: '/'
      }
    }

  });

  /* ----- Tasks ----- */

  // Load NPM Tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  /* ----- Default Tasks ----- */

  // Default Tasks - Clean generated folders
  grunt.registerTask('default', ['clean:all']);

  /* ----- Content Tasks ----- */

  // Content - Source
  grunt.registerTask('sourceContent', ['copy:sourceIncludes', 'copy:sourceLayouts', 'copy:sourceRoot', 'replace:includes']);
  // Content - Project
  grunt.registerTask('siteContent', ['copy:siteDrafts', 'copy:siteIncludes', 'copy:siteLayouts', 'copy:sitePages', 'copy:sitePlugins', 'copy:sitePosts', 'copy:siteRoot']);
  // Content - All
  grunt.registerTask('content', ['sourceContent', 'siteContent', 'jekyll', 'copy:contentBuild']);

  /* ----- Assets Tasks ----- */

  // Fonts - All
  grunt.registerTask('fonts', ['copy:siteFonts']);

  // Scripts - Source
  grunt.registerTask('sourceScripts', ['uglify:sourceScripts']);
  // Scripts - Project
  grunt.registerTask('siteScripts', ['jshint:siteScripts', 'uglify:siteScripts']);
  // Scripts - All
  grunt.registerTask('scripts', ['sourceScripts', 'siteScripts']);

  // Images - Icons
  grunt.registerTask('icons', ['grunticon:icons', 'imagemin:icons']);
  // Images - All
  grunt.registerTask('images', ['icons', 'imagemin:images']);

  // Styles - Source
  grunt.registerTask('sourceStyles', ['copy:sourceStyles', 'replace:styles']);
  // Styles - Project
  grunt.registerTask('siteStyles', ['copy:siteStyles']);
  // Styles - Dev
  grunt.registerTask('devStyles', ['sourceStyles', 'siteStyles', 'compass:dev']);
  // Styles - All
  grunt.registerTask('styles', ['sourceStyles', 'siteStyles', 'compass:build']);

  /* ----- Compile / Dev / Build ----- */

  // Compile
  grunt.registerTask('compile', ['default', 'content', 'fonts', 'scripts', 'images', 'devStyles']);

  // Dev
  grunt.registerTask('dev', ['compile', 'connect', 'open', 'watch']);

  // Build
  grunt.registerTask('build', ['default', 'content', 'fonts', 'scripts', 'images', 'styles']);

};