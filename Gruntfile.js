module.exports = function(grunt) {

  // Task Configurations
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Source Directory
    source: 'SOURCE',

    // Development Banner
    banner: '/*** [made by]\nMICHAEL GUERRA\nmsguerra74.com\n@msguerra74\n[in 2013] **/',

    // Clean Task
    clean: {
      all: ['.sass-cache', 'BUILD', 'TEMP'],
      build: ['.sass-cache', 'TEMP']
    },

    // Compass Task
    compass: {
      build: {
        options: {
          config: '<%= source %>/_configs/compass.rb',
          sassDir: '<%= source %>/assets/styles'
        }
      }
    },

    // Connect Task
    connect: {
      build: {
        options: {
          port: 4000,
          base: 'BUILD',
          hostname: ''
        }
      }
    },

    // Copy Task
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/fonts',
          src: '**/*',
          dest: 'TEMP/fonts'
        }]
      },
      drafts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/posts/_drafts',
          src: ['**/*'],
          dest: 'TEMP/_drafts'
        }]
      },
      includes: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/_layouts/_includes',
          src: ['**/*'],
          dest: 'TEMP/_includes'
        }]
      },
      layouts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/_layouts',
          src: ['**/*', '!_**/_**/*', '!_**/*', '!_**'],
          dest: 'TEMP/_layouts'
        }]
      },
      pages: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/pages',
          src: ['**/*'],
          dest: 'TEMP'
        }]
      },
      plugins: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/_plugins',
          src: ['**/*'],
          dest: 'TEMP/_plugins'
        }]
      },
      posts: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/posts',
          src: ['**/*', '!_**/*', '!_**'],
          dest: 'TEMP/_posts'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: '<%= source %>/content/root',
          src: ['**/{*,.*}'],
          dest: 'TEMP'
        }]
      }
    },

    // Imagemin Task
    imagemin: {
      build: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= source %>/assets/images',
          src: '**/*',
          dest: 'TEMP/img'
        }]
      }
    },

    // Jekyll Task
    jekyll: {
      build: {
        config: '<%= source %>/_configs/jekyll.yml'
      }
    },

    // JShint Task
    jshint: {
      source: ['Gruntfile.js', '<%= source %>/assets/scripts/plugins/**/*']
    },

    // Open Task
    open: {
      build: {
        path: 'http://localhost:4000'
      }
    },

    // Uglify Task
    uglify: {
      plugins: {
        options: {
          banner: '<%= banner %>'
        },
        files: [{
          src: ['<%= source %>/assets/scripts/plugins/**/*'],
          dest: 'TEMP/js/script.min.js'
        }]
      },
      vendor: {
        options: {
          compress: false,
          mangle: false,
          preserveComments: 'all'
        },
        files: [{
          src: ['<%= source %>/assets/scripts/vendor/html5shiv.*'],
          dest: 'TEMP/js/oldie.min.js'
        }, {
          src: ['<%= source %>/assets/scripts/vendor/jquery.*'],
          dest: 'TEMP/js/jquery.min.js'
        }, {
          src: ['<%= source %>/assets/scripts/vendor/prism.*'],
          dest: 'TEMP/js/prism.min.js'
        }]
      }
    },

    // Watch Task
    watch: {
      build: {
        files: ['TEMP/**/*'],
        tasks: ['jekyll:build']
      },
      css: {
        files: ['<%= source %>/assets/styles/**/*'],
        tasks: ['compass']
      },
      fonts: {
        files: ['<%= source %>/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      content: {
        files: ['<%= source %>/content/**/*'],
        tasks: ['content']
      },
      img: {
        files: ['<%= source %>/assets/images/**/*'],
        tasks: ['imagemin']
      },
      js: {
        files: ['<%= source %>/assets/scripts/**/*'],
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
  grunt.registerTask('compile', ['clean:all', 'assets', 'content', 'jekyll:build']);

  // Dev Tasks
  grunt.registerTask('dev', ['compile', 'connect', 'open', 'watch']);

  // Build Tasks
  grunt.registerTask('build', ['compile', 'clean:build']);

};