# Automata

[![Dependency Status](https://david-dm.org/msguerra74/automata.svg?style=flat)](https://david-dm.org/msguerra74/automata) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Automated Website Generator

by [Michael Guerra](http://msguerra74.com)

> **Automata** – */aw-tom-uh-tuh/* – Machines that perform a function according to a predetermined set of coded instructions, especially ones capable of a range of programmed responses to different circumstances.

**Automata** is an *Automated Website Generator* that utilizes Jekyll for static site generation and templating, as well as Sass with Foundation support for responsive CSS preprocessing with automatic vendor prefixing and minification, JavaScript concatenation and minification, GIF/JPG/PNG/SVG image optimization, Bower asset management with cache-busting, and an automated PHP development server with BrowserSync for instant browser feedback.

- [Automata GitHub page](https://github.com/msguerra74/Automata)
- [Automata.zip](https://github.com/msguerra74/Automata/archive/master.zip)

### Installation

1. Download and install [Node.js](http://nodejs.org) if needed *(for Grunt)*.
2. Download and install [Ruby](https://www.ruby-lang.org/en) if needed *(for Jekyll)*.
3. Download and unzip [Automata.zip](https://github.com/msguerra74/Automata/archive/master.zip) where you want it.
4. From the command prompt, navigate to the `Automata` folder and type the following commands:
    - `sudo gem install jekyll jekyll-paginate`
    - `sudo npm install -g grunt-cli`
    - `sudo npm install`
    - **Note:** if you're installing on Windows, you do not need to begin each command with `sudo`
5. That's it, now you're ready to build your web project!

### Usage

1. Modify the `project` directory variable at the top of the `Gruntfile.js`, if needed, and edit the `projects/_example.com/website/_config.yml` variables to match your projects needs. (**Note:** You can also duplicate the `_example.com` directory to create multiple projects *(example2.com, example3.com, etc...)*, as long as you point to the appropriate `Project Directory` at the top of the `Gruntfile.js` file).
2. From the command prompt, navigate to the `Automata` folder and run any of the following Grunt tasks:
    - `grunt setup` to download the latest version of `.htaccess` and install the bower components you have listed in the `_config.yml` file.
    - `grunt` to develop your site with a live PHP server
    - `grunt build` to build a production version of your site

### Components

- [Foundation](http://foundation.zurb.com): The most advanced responsive front-end framework in the world
- [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate): Front-end template
- [Markdown](http://daringfireball.net/projects/markdown): Text-to-HTML conversion tool
- [Node.js](http://nodejs.org): JavaScript runtime platform
    - [Grunt](http://gruntjs.com): JavaScript task runner
        - **Grunt Dependencies:**
        - [autoprefixer](https://github.com/postcss/autoprefixer): Parse CSS and add vendor prefixes to rules by Can I Use
        - [bower](http://bower.io): A package manager for the web
        - [grunt-banner](https://github.com/mattstyles/grunt-banner): Adds a simple banner to files
        - [grunt-browser-sync](https://github.com/BrowserSync/grunt-browser-sync): Grunt Task for keeping multiple browsers & devices in sync when building websites
        - [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean): Clear files and folders
        - [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy): Copy files and folders
        - [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin): Optimize GIF, JPG, and PNG images
        - [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify): Minify JavaScript files
        - [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): Run tasks whenever watched files change
        - [grunt-curl](https://github.com/twolfson/grunt-curl): Download files from the internet via grunt
        - [grunt-hashres](https://github.com/luismahou/grunt-hashres): Hashes asset files and renames links in html/php/etc
        - [grunt-import-js](https://github.com/dev113/grunt-import-js): Import JS files within JS files by `@import` instruction
        - [grunt-jsbeautifier](https://github.com/vkadam/grunt-jsbeautifier): Beautify js, css, html and json files using Grunt and jsbeautify
        - [grunt-php](https://github.com/sindresorhus/grunt-php): Start a PHP-server
        - [grunt-postcss](https://github.com/nDmitry/grunt-postcss): Apply several post-processors to your CSS using PostCSS
        - [grunt-replace](https://github.com/outatime/grunt-replace): Replace text patterns with applause
        - [grunt-sass](https://github.com/sindresorhus/grunt-sass): Compile Sass to CSS
        - [grunt-shell](https://github.com/sindresorhus/grunt-shell): Run shell commands
        - [grunt-svg2png](https://github.com/dbushell/grunt-svg2png): Rasterize SVG to PNG using PhantomJS
        - [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks): Load multiple grunt tasks using globbing patterns
        - [oldie](https://github.com/jonathantneal/oldie): Provide CSS compatible with old Internet Explorer
- [Ruby](https://www.ruby-lang.org/en): Programming Language / Runtime Environment
    - [Jekyll](http://jekyllrb.com): Static site generator
    - [Sass](http://sass-lang.com): Extension to CSS3

## The MIT License (MIT)

Copyright (c) 2016 Michael Guerra (Automata)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.