/**
 * Automata
 * Automated Website Generator
 * Michael Guerra | http://msguerra74.com
 * MIT License [See README]
 */

// Enter the name of the project directory (_example.com)
var project = '_example.com';

// ---------- NO NEED TO EDIT BELOW THIS LINE ---------- //

module.exports = function(grunt) {

  grunt.initConfig({

    // ---------- Variables ---------- //

    // Configurations
    config: grunt.file.readYAML('projects/' + project + '/website/_config.yml'),

    // Directories
    input: 'projects/' + project + '/website',
    output: '<%= input %>/<%= config.destination %>',
    temp: '<%= input %>/_temp',

    // ---------- Packages ---------- //

    /**
     * Banner
     * Adds a simple banner to files
     * https://github.com/mattstyles/grunt-banner
     */

    usebanner: {
      assets: {
        options: {
          banner: '/* <%= config.banner %> */'
        },
        files: {
          src: '<%= output %>/assets/**/*.{css,js}'
        }
      }
    },

    /**
     * Clean
     * Clear files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     */

    clean: {
      pre: [
        '<%= output %>/**/{*,.*}',
        '!<%= output %>/.git',
        '<%= temp %>'
      ],
      post: '<%= temp %>'
    },

    /**
     * Connect
     * Start a static web server
     * https://github.com/gruntjs/grunt-contrib-connect
     */

    connect: {
      server: {
        options: {
          base: '<%= output %>',
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
      favicons: {
        expand: true,
        cwd: '<%= input %>/_assets/favicons/',
        src: '**/*.{ico,xml}',
        dest: '<%= output %>'
      },
      fonts: {
        expand: true,
        cwd: '<%= input %>/_assets/fonts/',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: '<%= output %>/assets/fonts'
      },
      template: {
        expand: true,
        cwd: '<%= input %>/_templates/<%= config.template %>/',
        src: '**/{*,.*}',
        dest: '<%= input %>'
      },
    },

    /**
     * Curl
     * Download files from the internet via grunt
     * https://github.com/twolfson/grunt-curl
     */

    curl: {
      htaccess: {
        src: 'https://raw.githubusercontent.com/h5bp/html5-boilerplate/master/dist/.htaccess',
        dest: '<%= input %>/_includes/.htaccess'
      },
      normalize: {
        src: 'https://github.com/necolas/normalize.css/blob/master/normalize.css',
        dest: '<%= input %>/_assets/styles/vendor/_normalize.scss'
      }
    },

    /**
     * Hashres
     * Hashes your js and css files and rename the <script> and <link> declarations that refer to them in your html/php/etc files
     * https://github.com/luismahou/grunt-hashres
     */

    hashres: {
      assets: {
        options: {
          fileNameFormat: '${hash}.${name}.${ext}'
        },
        src: [
          '<%= output %>/assets/**/*.*'
        ],
        dest: [
          '<%= output %>/**/*.{css,html,js,php}'
        ]
      }
    },

    /**
     * Imagemin
     * Minify PNG and JPEG images
     * https://github.com/gruntjs/grunt-contrib-imagemin
     */

    imagemin: {
      options: {
        optimizationLevel: 7
      },
      temp: {
        expand: true,
        cwd: '<%= temp %>/assets/img/',
        src: '**/*.png',
        dest: '<%= output %>/assets/img'
      },
      favicons: {
        expand: true,
        cwd: '<%= input %>/_assets/favicons/',
        src: '*.png',
        dest: '<%= output %>'
      },
      images: {
        expand: true,
        cwd: '<%= input %>/_assets/images/',
        src: '**/*.{gif,jpg,png,svg}',
        dest: '<%= output %>/assets/img'
      }
    },

    /**
     * JS Beautifier
     * https://github.com/vkadam/grunt-jsbeautifier
     * Beautify js, css, html and json files using Grunt and jsbeautify
     */

    jsbeautifier: {
      options: {
        html: {
          braceStyle: 'end-expand',
          extraLiners: '',
          indentInnerHtml: true,
          indentScripts: 'normal',
          indentSize: 2,
          maxPreserveNewlines: '0',
          unformatted: [
            'script',
            'style'
          ],
          wrapLineLength: '0'
        },
      },
      content: {
        expand: true,
        cwd: '<%= output %>',
        src: '**/*.html',
        dest: '<%= output %>'
      }
    },

    /**
     * PostCSS
     * Apply several post-processors to your CSS using PostCSS
     * https://github.com/nDmitry/grunt-postcss
     */

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 2 versions'
            ]
          })
        ]
      },
      css: {
        expand: true,
        cwd: '<%= temp %>/assets/css/',
        src: '**/*.min.css',
        dest: '<%= output %>/assets/css'
      }
    },

    /**
     * Sass
     * Compile Sass to CSS
     * https://github.com/gruntjs/grunt-contrib-sass
     */

    sass: {
      styles: {
        options: {
          noCache: true,
          sourcemap: 'none',
          style: 'compressed'
        },
        expand: true,
        cwd: '<%= input %>/_assets/styles/',
        src: '**/*.scss',
        dest: '<%= temp %>/assets/css',
        ext: '.min.css'
      }
    },

    /**
     * Shell
     * Run shell commands
     * https://github.com/sindresorhus/grunt-shell
     */

    shell: {
      jekyll: {
        command: [
          'cd <%= input %>',
          'jekyll build'
        ].join('&&')
      }
    },

    /**
     * SVG2PNG
     * Grunt plugin to rasterize SVG to PNG images using PhantomJS
     * https://github.com/dbushell/grunt-svg2png
     */

    svg2png: {
      svg: {
        files: [{
          cwd: '<%= input %>/_assets/images/',
          src: '**/*.svg',
          dest: '<%= temp %>/assets/img'
        }]
      }
    },

    /**
     * Uglify
     * Minify files with UglifyJS
     * https://github.com/gruntjs/grunt-contrib-uglify
     */

    uglify: {
      concatenate: {
        src: '<%= input %>/_assets/scripts/concatenate/**/*.js',
        dest: '<%= output %>/assets/js/script.min.js'
      },
      oldie: {
        src: '<%= input %>/_assets/scripts/oldie/**/*.js',
        dest: '<%= output %>/assets/js/oldie.min.js'
      },
      scripts: {
        expand: true,
        cwd: '<%= input %>/_assets/scripts/',
        src: [
          '**/*.js',
          '!{concatenate,oldie}/**/*.js'
        ],
        dest: '<%= output %>/assets/js',
        ext: '.min.js'
      }
    },

    /**
     * Watch
     * Run tasks whenever watched files change
     * https://github.com/gruntjs/grunt-contrib-watch
     */

    watch: {
      options: {
        livereload: true, // Port 35729
        spawn: false
      },
      content: {
        files: [
          '<%= input %>/**/*',
          '!<%= input %>/_assets/**/*',
          '!<%= output %>/**/*'
        ],
        tasks: [
          'shell',
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      favicons: {
        files: '<%= input %>/_assets/favicons/*.{ico,png,xml}',
        tasks: [
          'copy:favicons',
          'imagemin:favicons'
        ]
      },
      fonts: {
        files: '<%= input %>/_assets/fonts/**/*.{eot,svg,ttf,woff}',
        tasks: 'copy:fonts'
      },
      images: {
        files: '<%= input %>/_assets/images/**/*.{gif,jpg,png,svg}',
        tasks: [
          'svg2png',
          'imagemin:temp',
          'imagemin:images'
        ]
      },
      scripts: {
        files: '<%= input %>/_assets/scripts/**/*.js',
        tasks: 'uglify'
      },
      styles: {
        files: '<%= input %>/_assets/styles/**/*.scss',
        tasks: [
          'sass',
          'postcss'
        ]
      }
    }

  });

  // ---------- Tasks ---------- //

  // Load multiple grunt tasks using globbing patterns
  require('load-grunt-tasks')(grunt);

  // Base Task
  grunt.registerTask('base', [
    'clean:pre',
    'shell',
    'copy:favicons',
    'copy:fonts',
    'sass',
    'postcss',
    'svg2png',
    'imagemin',
    'uglify',
    'usebanner'
  ]);

  // Build Task
  grunt.registerTask('build', [
    'base',
    'hashres',
    'jsbeautifier',
    'clean:post'
  ]);

  // Default Task
  grunt.registerTask('default', [
    'base',
    'connect',
    'watch'
  ]);

  // Setup Task
  grunt.registerTask('setup', [
    'copy:template',
    'curl'
  ]);

};