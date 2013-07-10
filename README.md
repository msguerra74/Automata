Automaton
=========

Static Website Generator
------------------------

by **Michael Guerra** | [msguerra74.com][] | [@msguerra74][]

- [Project Website][]
- [GitHub Page][]
- [Automaton.zip][]

  [msguerra74.com]: http://msguerra74.com
  [@msguerra74]: http://twitter.com/msguerra74
  [Project Website]: http://msguerra74.github.io/Automaton/
  [GitHub Page]: http://github.com/msguerra74/Automaton/
  [Automaton.zip]: http://github.com/msguerra74/Automaton/zipball/master/

### Standards:

- [HTML5][]
- [CSS3][]
- [JavaScript][] / [jQuery][]
- [PHP][]

  [HTML5]: http://www.w3.org/html/wg/drafts/html/master/
  [CSS3]: http://www.w3.org/Style/CSS/current-work.en.html
  [JavaScript]: http://developer.mozilla.org/en-US/docs/Web/JavaScript/
  [jQuery]: http://jquery.com
  [PHP]: http://php.net

### Add-Ons

- [Google Analytics][]: Web Analytics and Reporting
- [html5 Shiv][]: HTML5 IE6/7/8 Enabling Script
- [jQuery][]: JavaScript Library
- [normalize.css][]: CSS Reset Alternative
- [PHPMailer][]: Email Creation and Transfer Class for PHP
- [Prism][]: Syntax Highlighter

  [Google Analytics]: http://google.com/analytics/
  [html5 Shiv]: http://github.com/aFarkas/html5shiv/
  [jQuery]: http://jquery.com
  [normalize.css]: http://github.com/necolas/normalize.css/tree/v1/
  [PHPMailer]: http://github.com/Synchro/PHPMailer/
  [Prism]: http://prismjs.com

### Components

- [GitHub][]: Code Sharing Repository with Source Versioning
- [HTML5 Boilerplate][]: Front-end Template
- [Markdown][]: Text to HTML Converter
- [Node.js][]: JavaScript Runtime Platform
    - [Grunt][]: JavaScript Task Runner
      - [grunt-contrib-clean][]
      - [grunt-contrib-compass][]
      - [grunt-contrib-connect][]
      - [grunt-contrib-copy][]
      - [grunt-contrib-imagemin][]
      - [grunt-contrib-jshint][]
      - [grunt-contrib-uglify][]
      - [grunt-contrib-watch][]
      - [grunt-jekyll][]
      - [grunt-open][]
      - [matchdep][]
- [Ruby][]: Programming Language / Runtime Environment
 - [Compass][]: CSS Authoring Framework
 - [Jekyll][]: Static Site Generator
 - [Rdiscount][]: Markdown Processor used by Jekyll
 - [Sass][]: Extension to CSS3

  [GitHub]: http://github.com/msguerra74/
  [HTML5 Boilerplate]: http://github.com/h5bp/html5-boilerplate/
  [Markdown]: http://daringfireball.net/projects/markdown/
  [Node.js]: http://nodejs.org
  [Grunt]: http://gruntjs.com
  [grunt-contrib-clean]: http://npmjs.org/package/grunt-contrib-clean/
  [grunt-contrib-compass]: http://npmjs.org/package/grunt-contrib-compass/
  [grunt-contrib-connect]: http://npmjs.org/package/grunt-contrib-connect/
  [grunt-contrib-copy]: http://npmjs.org/package/grunt-contrib-copy/
  [grunt-contrib-imagemin]: http://npmjs.org/package/grunt-contrib-imagemin/
  [grunt-contrib-jshint]: http://npmjs.org/package/grunt-contrib-jshint/
  [grunt-contrib-uglify]: http://npmjs.org/package/grunt-contrib-uglify/
  [grunt-contrib-watch]: http://npmjs.org/package/grunt-contrib-watch/
  [grunt-jekyll]: http://npmjs.org/package/grunt-jekyll/
  [grunt-open]: http://npmjs.org/package/grunt-open/
  [matchdep]: http://npmjs.org/package/matchdep/
  [Ruby]: http://ruby-lang.org/en/
  [Compass]: http://compass-style.org
  [Jekyll]: http://jekyllrb.com
  [Rdiscount]: http://github.com/davidfstr/rdiscount/
  [Sass]: http://sass-lang.com

### Installation

1. Download and unzip [Automaton.zip][] where you want it.
2. Download and install [Node.js][] if needed.
3. Download and install [Ruby][] if needed.
4. From the command prompt, navigate to the "Automaton" folder and type the following:
 - gem install compass jekyll rdiscount
 - npm install -g grunt-cli
 - npm install
5. That's it, now you can run any Grunt task!

  [Automaton.zip]: http://github.com/msguerra74/Automaton/zipball/master/
  [Node.js]: http://nodejs.org
  [Ruby]: http://ruby-lang.org/en/

### Usage

1. Modify SOURCE/_configs/jekyll.yml 'Site Info' and select 'Custom Site Components' to match your project needs.
2. Run Grunt tasks:
 - 'grunt dev' to run in development mode.
 - 'grunt build' to build developed site.
3. More on usage later...

### To-Do

- Additional Automation
  - Categories / Tags
  - Deployment (Amazon S3 / SFTP / Github)
  - Fonts
  - Sprites (Compass)
  - SVG
- Misc
  - Gruntfile.js variables via .json file
  - Icon Placeholders (Apple / Windows 8)
  - Update this README
- Widgets
  - Contact Form
  - Post Comments
  - Search
  - Social Media