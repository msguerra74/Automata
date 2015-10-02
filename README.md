# Automata

[![Dependency Status](https://david-dm.org/msguerra74/automata.svg?style=flat)](https://david-dm.org/msguerra74/automata)

## Automated Static Website Generator

by **Michael Guerra** | [msguerra74.com][]

> **Automata** */aw-tom-uh-tuh/* - Machines that perform a function according to a predetermined set of coded instructions, especially ones capable of a range of programmed responses to different circumstances.

**Automata** is a CSS / HTML *Automated Static Website Generator*. It utilizes Jekyll (with MarkDown and Liquid) as it's HTML / templating / blogging platform, as well as Sass for responsive CSS preprocessing with automatic vendor prefixing and minification, JavaScript concatenation and minification, GIF / JPG / PNG / SVG image optimization, MD5-hash asset cache-busting, and an automated development server with LiveReload for near-instant feedback.

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
    - [HTML5 Shiv][]: The defacto way to enable use of HTML5 sectioning elements in legacy Internet Explorer.
    - [jQuery][]: Feature-rich JavaScript library
    - [Respond.js][]: A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)

### Components

- [GitHub][]: Code sharing with version control
- [HTML5 Boilerplate][]: Front-end template
- [Markdown][]: Text-to-HTML conversion tool
- [Node.js][]: JavaScript runtime platform
    - [Grunt][]: JavaScript task runner
        - Project Dependencies:
        - [autoprefixer][]: Parse CSS and add vendor prefixes to rules by Can I Use
        - [grunt-banner][]: Adds a simple banner to files
        - [grunt-contrib-clean][]: Clear files and folders
        - [grunt-contrib-connect][]: Start a static web server
        - [grunt-contrib-copy][]: Copy files and folders
        - [grunt-contrib-imagemin][]: Optimize GIF, JPG, and PNG images
        - [grunt-contrib-jshint][]: Validate JavaScript files
        - [grunt-contrib-sass][]: Compile Sass to CSS
        - [grunt-contrib-uglify][]: Minify JavaScript files
        - [grunt-contrib-watch][]: Run tasks whenever watched files change
        - [grunt-curl][]: Download files from the internet
        - [grunt-hashres][]: Hashes asset files and renames links in html/php/etc
        - [grunt-jekyll][]: Static site generator
        - [grunt-postcss][]: Apply several post-processors to your CSS using PostCSS
        - [grunt-prettify][]: Prettify HTML
        - [grunt-svg2png][]: Rasterize SVG to PNG using PhantomJS
        - [load-grunt-tasks][]: Load multiple grunt tasks using globbing patterns
- [Ruby][]: Programming Language / Runtime Environment
    - [Jekyll][]: Static site generator
    - [Sass][]: Extension to CSS3

### Installation

1. Download and install [Node.js][] if needed.
2. Download and install [Ruby][] if needed.
3. Download and unzip [Automata.zip][] where you want it.
4. From the command prompt, navigate to the `Automata` folder and type the following commands:
    - `sudo gem install jekyll sass`
    - `sudo npm install -g grunt-cli`
    - `sudo npm install`
    - Note: if you're installing in Windows, you do not need to start each command with `sudo`
5. That's it, now you can run any Grunt task!

### Usage

1. Modify the `Projects/_example.com/_website/_config.yml` file variables to match your project needs. (NOTE: You can also duplicate the `_example.com` directory to create multiple projects, so long as you point to the appropriate `Project Folder Name` at the top of the `Gruntfile.js` file).
2. From the command prompt, navigate to the `Automata` folder and run any of the following Grunt tasks:
    - `grunt` to develop the site with a LiveReload server
    - `grunt build` to build a production version of the current site
    - `grunt download` to download the latest vendor files: `.htaccess, _normalize.scss, html5shiv.js, jquery.js, and respond.js`

## The MIT License (MIT)

Copyright (c) 2015 Michael Guerra (Automata)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- Links -->

[@msguerra74]: http://twitter.com/msguerra74
[Automata.zip]: https://github.com/msguerra74/Automata/archive/master.zip
[autoprefixer]: https://github.com/postcss/autoprefixer
[CSS3]: http://www.w3.org/Style/CSS/current-work.en.html
[GitHub]: https://github.com/msguerra74
[Automata GitHub page]: https://github.com/msguerra74/Automata
[Google Analytics]: http://www.google.com/analytics/
[Grunt]: http://gruntjs.com/
[grunt-banner]: https://github.com/mattstyles/grunt-banner
[grunt-contrib-clean]: https://github.com/gruntjs/grunt-contrib-clean
[grunt-contrib-connect]: https://github.com/gruntjs/grunt-contrib-connect
[grunt-contrib-copy]: https://github.com/gruntjs/grunt-contrib-copy
[grunt-contrib-imagemin]: https://github.com/gruntjs/grunt-contrib-imagemin
[grunt-contrib-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt-contrib-sass]: https://github.com/gruntjs/grunt-contrib-sass
[grunt-contrib-uglify]: https://github.com/gruntjs/grunt-contrib-uglify
[grunt-contrib-watch]: https://github.com/gruntjs/grunt-contrib-watch
[grunt-curl]: https://github.com/twolfson/grunt-curl
[grunt-hashres]: https://github.com/luismahou/grunt-hashres
[grunt-jekyll]: https://github.com/dannygarcia/grunt-jekyll
[grunt-postcss]: https://github.com/nDmitry/grunt-postcss
[grunt-prettify]: https://github.com/jonschlinkert/grunt-prettify
[grunt-svg2png]: https://github.com/dbushell/grunt-svg2png
[HTML5]: http://www.w3.org/html/wg/drafts/html/master/
[HTML5 Boilerplate]: https://github.com/h5bp/html5-boilerplate
[HTML5 Shiv]: https://github.com/afarkas/html5shiv
[JavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Jekyll]: http://jekyllrb.com/
[jQuery]: http://jquery.com/
[load-grunt-tasks]: https://github.com/sindresorhus/load-grunt-tasks
[Markdown]: http://daringfireball.net/projects/markdown/
[msguerra74.com]: http://msguerra74.com/
[node.js]: http://nodejs.org/
[normalize.css]: https://github.com/necolas/normalize.css
[Respond.js]: https://github.com/scottjehl/Respond
[Ruby]: https://www.ruby-lang.org/en/
[Sass]: http://sass-lang.com/