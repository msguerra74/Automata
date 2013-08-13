Automaton
=========

Automated Static Website Generator
----------------------------------

by **Michael Guerra** | [msguerra74.com][] | [@msguerra74][]

- [Project Website][]
- [GitHub Page][]
- [Automaton.zip][]

  [msguerra74.com]: http://msguerra74.com
  [@msguerra74]: http://twitter.com/msguerra74
  [Project Website]: http://msguerra74.github.io/Automaton/
  [GitHub Page]: http://github.com/msguerra74/Automaton/
  [Automaton.zip]: http://github.com/msguerra74/Automaton/archive/master.zip

### Standards:

- [HTML5][]
- [CSS3][]
- [JavaScript][] / [jQuery][]
- <del>[PHP][]</del>

  [HTML5]: http://www.w3.org/html/wg/drafts/html/master/
  [CSS3]: http://www.w3.org/Style/CSS/current-work.en.html
  [JavaScript]: http://developer.mozilla.org/en-US/docs/Web/JavaScript/
  [jQuery]: http://jquery.com
  [PHP]: http://php.net

### Add-Ons

- [FluidVids.js][]: Responsive and fluid YouTube and Vimeo video embeds
- [Google Analytics][]: Web Analytics and Reporting
- [html5 Shiv][]: HTML5 IE6/7/8 Enabling Script
- [jQuery][]: JavaScript Library
- [normalize.css][] and [reset.css][]: CSS Reset and Normalization
- <del>[PHPMailer][]: Email Creation and Transfer Class for PHP</del>

  [FluidVids.js]: http://github.com/toddmotto/fluidvids/
  [Google Analytics]: http://google.com/analytics/
  [html5 Shiv]: http://github.com/aFarkas/html5shiv/
  [jQuery]: http://jquery.com
  [normalize.css]: http://github.com/necolas/normalize.css/tree/v1/
  [reset.css]: http://meyerweb.com/eric/tools/css/reset/reset.css
  [PHPMailer]: http://github.com/Synchro/PHPMailer/

### Components

- [GitHub][]: Code Sharing Repository with Source Versioning
- [HTML5 Boilerplate][]: Front-end Template
- [Markdown][]: Text to HTML Converter
- [Node.js][]: JavaScript Runtime Platform
    - [Grunt][]: JavaScript Task Runner
      - Project Specific Packages:
      - [assemble][]: Task to assemble pages and templating
      - [grunt-contrib-clean][]: Task to delete files/folders
      - [grunt-contrib-compass][]: Compass task
      - [grunt-contrib-connect][]: Task to create/connect to server
      - [grunt-contrib-copy][]: Task to copy files/folders
      - [grunt-contrib-imagemin][]: Task to optimize jpg/png images
      - [grunt-contrib-jshint][]: Task to lint js files
      - [grunt-contrib-uglify][]: Task to concat/compress js files
      - [grunt-contrib-watch][]: Task to watch files/folders for changes
      - [grunt-grunticon][]: SVG to PNG / CSS Task
      - [grunt-hashify][]: Task for creating MD5 hashes and hashmaps
      - [grunt-jekyll][]: Static site generator and templating task
      - [grunt-open][]: Task to open files/urls
      - [grunt-s3][]: Task to deploy finished site to Amazon S3
      - [grunt-sftp-deploy][]: Task to deploy finished site to SFTP
      - [matchdep][]: Task to filter npm modules
- [Ruby][]: Programming Language / Runtime Environment
 - [Compass][]: CSS Authoring Framework
 - [Jekyll][]: Static Site Generator
 - [RDiscount][]: Markdown Processor used by Jekyll
 - [Sass][]: Extension to CSS3

  [GitHub]: http://github.com/msguerra74/
  [HTML5 Boilerplate]: http://github.com/h5bp/html5-boilerplate/
  [Markdown]: http://daringfireball.net/projects/markdown/
  [Node.js]: http://nodejs.org
  [Grunt]: http://gruntjs.com
  [assemble]: http://npmjs.org/package/assemble/
  [grunt-contrib-clean]: http://npmjs.org/package/grunt-contrib-clean/
  [grunt-contrib-compass]: http://npmjs.org/package/grunt-contrib-compass/
  [grunt-contrib-connect]: http://npmjs.org/package/grunt-contrib-connect/
  [grunt-contrib-copy]: http://npmjs.org/package/grunt-contrib-copy/
  [grunt-contrib-imagemin]: http://npmjs.org/package/grunt-contrib-imagemin/
  [grunt-contrib-jshint]: http://npmjs.org/package/grunt-contrib-jshint/
  [grunt-contrib-uglify]: http://npmjs.org/package/grunt-contrib-uglify/
  [grunt-contrib-watch]: http://npmjs.org/package/grunt-contrib-watch/
  [grunt-grunticon]: http://npmjs.org/package/grunt-grunticon/
  [grunt-hashify]: http://npmjs.org/package/grunt-hashify/
  [grunt-jekyll]: http://npmjs.org/package/grunt-jekyll/
  [grunt-open]: http://npmjs.org/package/grunt-open/
  [grunt-s3]: http://npmjs.org/package/grunt-s3/
  [grunt-sftp-deploy]: http://npmjs.org/package/grunt-sftp-deploy/
  [matchdep]: http://npmjs.org/package/matchdep/
  [Ruby]: http://ruby-lang.org/en/
  [Compass]: http://compass-style.org
  [Jekyll]: http://jekyllrb.com
  [RDiscount]: http://github.com/davidfstr/rdiscount/
  [Sass]: http://sass-lang.com

### Installation

1. Download and unzip [Automaton.zip][] where you want it.
2. Download and install [Node.js][] if needed.
3. Download and install [Ruby][] if needed.
4. From the command prompt, navigate to the "Automaton" folder and type the following commands:
 - gem install compass jekyll rdiscount
 - npm install -g grunt-cli
 - npm install
5. That's it, now you can run any Grunt task!

  [Automaton.zip]: http://github.com/msguerra74/Automaton/archive/master.zip
  [Node.js]: http://nodejs.org
  [Ruby]: http://ruby-lang.org/en/

### Usage

1. Modify the Websites/_example.com/website.json file variables to match your project needs. (NOTE: You can also duplicate this directory for multiple projects, so long as you point to the appropriate 'website.json' file at the top of the Gruntfile.js file)
2. Run Grunt tasks:
 - 'grunt dev' to run in development mode.
 - 'grunt build' to build developed site.
3. More on usage later...