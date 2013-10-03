Automata
=========

Automated Static Website Generator
----------------------------------

by **Michael Guerra** | [@msguerra74][] | [msguerra74.com][]

Designed for a modern web development workflow, **Automata** is a full-fledged HTML5 / CSS3 *Automated Static Website Generator* that harnesses the power of Jekyll as it's HTML / templating / blogging engine, as well as Sass for responsive CSS preprocessing with automatic vendor prefixing and minification, JavaScript concatenation and minification, GIF / JPG / PNG / SVG image optimization, MD5-hash asset cache busting, and an automated development server with LiveReload for rapid feedback.

- [Automata project website][]
- [Automata GitHub page][]
- [Automata.zip][]

### Standards:

- [HTML5][]
- [CSS3][]
- [JavaScript][] / [jQuery][]

### Includes

- CSS
    - [normalize.css][]: HTML5-ready alternative to CSS resets
- JavaScript / jQuery
    - [Google Analytics][]: Web Analytics and Reporting
    - [HTML5 Shiv][]: Enables use of HTML5 sectioning elements in legacy Internet Explorer
    - [jQuery][]: Feature-rich JavaScript library
    - [respond.js][]: Polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)

### Components

- [GitHub][]: Code sharing with version control
- [HTML5 Boilerplate][]: Front-end template
- [Markdown][]: Text-to-HTML conversion tool
- [Node.js][]: JavaScript runtime platform
    - [Grunt][]: JavaScript task runner
        - Project Dependencies:
        - [grunt-autoprefixer][]: Adds vendor-prefixed CSS properties
        - [grunt-contrib-clean][]: Clear files and folders
        - [grunt-contrib-connect][]: Start a static web server
        - [grunt-contrib-copy][]: Copy files and folders
        - [grunt-contrib-cssmin][]: Compress CSS files
        - [grunt-contrib-imagemin][]: Optimize GIF, JPG, and PNG images
        - [grunt-contrib-jshint][]: Validate JavaScript files
        - [grunt-contrib-sass][]: Compile Sass to CSS
        - [grunt-contrib-uglify][]: Minify JavaScript files
        - [grunt-contrib-watch][]: Run tasks whenever watched files change
        - [grunt-curl][]: Download files from the internet
        - [grunt-jekyll][]: Static site generator
        - [grunt-svg2png][]: Rasterize SVG to PNG using PhantomJS
        - [grunt-svgmin][]: Minify SVG
        - [matchdep][]: Minimatch to filter npm module dependencies by name
- [Ruby][]: Programming Language / Runtime Environment
    - [Jekyll][]: Static site generator
    - [RDiscount][]: Discount implementation of John Gruber's markdown
    - [Sass][]: Extension to CSS3

### Installation

1. Download and install [Node.js][] if needed.
2. Download and install [Ruby][] if needed.
3. Download and unzip [Automata.zip][] where you want it.
4. From the command prompt, navigate to the 'Automata' folder and type the following commands:
    - gem install jekyll rdiscount sass
    - npm install -g grunt-cli
    - npm install
5. That's it, now you can run any Grunt task!

### Usage

1. Modify the 'Projects/_example.com/project.json' file variables to match your project needs. (NOTE: You can also duplicate the '_example.com' directory for multiple projects, so long as you point to the appropriate 'project.json' file at the top of the 'Gruntfile.js' file).
2. From the command prompt, navigate to the 'Automata' folder and run any of the following Grunt tasks:
    - 'grunt' to develop the site with instant feedback
    - 'grunt build' to build the current site
    - 'grunt download' to download the latest vendor files (.htaccess, _normalize.scss, jquery.min.js, and oldie.min.js)
3. More on usage later...

### Browser support

Browser support will depend on the type of project created, so any browser can be supported if needed. Out of the box, however, Automata is designed to work with all major modern browsers (Android, Chrome, Firefox, iOS, Opera, and Safari), as well as Internet Explorer 8 and up. An 'oldie.js' script has been included by default, which allows IE8 (and lower) to understand HTML5 sectioning elements and CSS3 media queries. Normalize.css v2.x and auto vendor prefixing has also been included, which provides support for IE8+. To support IE7 and lower, normalize.css v1.x will need to be substituted and appropriate CSS 'hacks' will need to be used.

The MIT License (MIT)
---------------------

Copyright (c) 2013 Michael Guerra (Automata)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

  [@msguerra74]: http://twitter.com/msguerra74
  [Automata.zip]: https://github.com/msguerra74/Automata/archive/master.zip
  [CSS3]: http://www.w3.org/Style/CSS/current-work.en.html
  [GitHub]: https://github.com/msguerra74
  [Automata GitHub page]: https://github.com/msguerra74/Automata
  [Google Analytics]: http://www.google.com/analytics/
  [Grunt]: http://gruntjs.com/
  [grunt-autoprefixer]: https://github.com/nDmitry/grunt-autoprefixer
  [grunt-contrib-clean]: https://github.com/gruntjs/grunt-contrib-clean
  [grunt-contrib-connect]: https://github.com/gruntjs/grunt-contrib-connect
  [grunt-contrib-copy]: https://github.com/gruntjs/grunt-contrib-copy
  [grunt-contrib-cssmin]: https://github.com/gruntjs/grunt-contrib-cssmin
  [grunt-contrib-imagemin]: https://github.com/gruntjs/grunt-contrib-imagemin
  [grunt-contrib-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
  [grunt-contrib-sass]: https://github.com/gruntjs/grunt-contrib-sass
  [grunt-contrib-uglify]: https://github.com/gruntjs/grunt-contrib-uglify
  [grunt-contrib-watch]: https://github.com/gruntjs/grunt-contrib-watch
  [grunt-curl]: https://github.com/twolfson/grunt-curl
  [grunt-jekyll]: https://github.com/dannygarcia/grunt-jekyll
  [grunt-svg2png]: https://github.com/dbushell/grunt-svg2png
  [grunt-svgmin]: https://github.com/sindresorhus/grunt-svgmin
  [HTML5]: http://www.w3.org/html/wg/drafts/html/master/
  [HTML5 Boilerplate]: https://github.com/h5bp/html5-boilerplate
  [HTML5 Shiv]: https://github.com/aFarkas/html5shiv
  [JavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
  [Jekyll]: http://jekyllrb.com/
  [jQuery]: http://jquery.com/
  [Markdown]: http://daringfireball.net/projects/markdown/
  [matchdep]: https://github.com/tkellen/node-matchdep
  [msguerra74.com]: http://msguerra74.com/
  [node.js]: http://nodejs.org/
  [normalize.css]: https://github.com/necolas/normalize.css
  [Automata project website]: http://msguerra74.github.io/Automata/
  [RDiscount]: https://github.com/davidfstr/rdiscount
  [respond.js]: https://github.com/scottjehl/Respond
  [Ruby]: https://www.ruby-lang.org/en/
  [Sass]: http://sass-lang.com/