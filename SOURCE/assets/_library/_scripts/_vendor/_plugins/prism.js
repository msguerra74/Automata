/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

(function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = self.Prism = {
  util: {
    type: function (o) {
      return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
    },

    // Deep clone a language definition (e.g. to extend it)
    clone: function (o) {
      var type = _.util.type(o);

      switch (type) {
        case 'Object':
          var clone = {};

          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              clone[key] = _.util.clone(o[key]);
            }
          }

          return clone;

        case 'Array':
          return o.slice();
      }

      return o;
    }
  },

  languages: {
    extend: function (id, redef) {
      var lang = _.util.clone(_.languages[id]);

      for (var key in redef) {
        lang[key] = redef[key];
      }

      return lang;
    },

    // Insert a token before another token in a language literal
    insertBefore: function (inside, before, insert, root) {
      root = root || _.languages;
      var grammar = root[inside];
      var ret = {};

      for (var token in grammar) {

        if (grammar.hasOwnProperty(token)) {

          if (token == before) {

            for (var newToken in insert) {

              if (insert.hasOwnProperty(newToken)) {
                ret[newToken] = insert[newToken];
              }
            }
          }

          ret[token] = grammar[token];
        }
      }

      return root[inside] = ret;
    },

    // Traverse a language definition with Depth First Search
    DFS: function(o, callback) {
      for (var i in o) {
        callback.call(o, i, o[i]);

        if (_.util.type(o) === 'Object') {
          _.languages.DFS(o[i], callback);
        }
      }
    }
  },

  highlightAll: function(async, callback) {
    var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

    for (var i=0, element; element = elements[i++];) {
      _.highlightElement(element, async === true, callback);
    }
  },

  highlightElement: function(element, async, callback) {
    // Find language
    var language, grammar, parent = element;

    while (parent && !lang.test(parent.className)) {
      parent = parent.parentNode;
    }

    if (parent) {
      language = (parent.className.match(lang) || [,''])[1];
      grammar = _.languages[language];
    }

    if (!grammar) {
      return;
    }

    // Set language on the element, if not present
    element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

    // Set language on the parent, for styling
    parent = element.parentNode;

    if (/pre/i.test(parent.nodeName)) {
      parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
    }

    var code = element.textContent;

    if(!code) {
      return;
    }

    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');

    var env = {
      element: element,
      language: language,
      grammar: grammar,
      code: code
    };

    _.hooks.run('before-highlight', env);

    if (async && self.Worker) {
      var worker = new Worker(_.filename);

      worker.onmessage = function(evt) {
        env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(env.element);
        _.hooks.run('after-highlight', env);
      };

      worker.postMessage(JSON.stringify({
        language: env.language,
        code: env.code
      }));
    }
    else {
      env.highlightedCode = _.highlight(env.code, env.grammar, env.language)

      _.hooks.run('before-insert', env);

      env.element.innerHTML = env.highlightedCode;

      callback && callback.call(element);

      _.hooks.run('after-highlight', env);
    }
  },

  highlight: function (text, grammar, language) {
    return Token.stringify(_.tokenize(text, grammar), language);
  },

  tokenize: function(text, grammar, language) {
    var Token = _.Token;

    var strarr = [text];

    var rest = grammar.rest;

    if (rest) {
      for (var token in rest) {
        grammar[token] = rest[token];
      }

      delete grammar.rest;
    }

    tokenloop: for (var token in grammar) {
      if(!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }

      var pattern = grammar[token],
        inside = pattern.inside,
        lookbehind = !!pattern.lookbehind,
        lookbehindLength = 0;

      pattern = pattern.pattern || pattern;

      for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

        var str = strarr[i];

        if (strarr.length > text.length) {
          // Something went terribly wrong, ABORT, ABORT!
          break tokenloop;
        }

        if (str instanceof Token) {
          continue;
        }

        pattern.lastIndex = 0;

        var match = pattern.exec(str);

        if (match) {
          if(lookbehind) {
            lookbehindLength = match[1].length;
          }

          var from = match.index - 1 + lookbehindLength,
              match = match[0].slice(lookbehindLength),
              len = match.length,
              to = from + len,
            before = str.slice(0, from + 1),
            after = str.slice(to + 1);

          var args = [i, 1];

          if (before) {
            args.push(before);
          }

          var wrapped = new Token(token, inside? _.tokenize(match, inside) : match);

          args.push(wrapped);

          if (after) {
            args.push(after);
          }

          Array.prototype.splice.apply(strarr, args);
        }
      }
    }

    return strarr;
  },

  hooks: {
    all: {},

    add: function (name, callback) {
      var hooks = _.hooks.all;

      hooks[name] = hooks[name] || [];

      hooks[name].push(callback);
    },

    run: function (name, env) {
      var callbacks = _.hooks.all[name];

      if (!callbacks || !callbacks.length) {
        return;
      }

      for (var i=0, callback; callback = callbacks[i++];) {
        callback(env);
      }
    }
  }
};

var Token = _.Token = function(type, content) {
  this.type = type;
  this.content = content;
};

Token.stringify = function(o, language, parent) {
  if (typeof o == 'string') {
    return o;
  }

  if (Object.prototype.toString.call(o) == '[object Array]') {
    return o.map(function(element) {
      return Token.stringify(element, language, o);
    }).join('');
  }

  var env = {
    type: o.type,
    content: Token.stringify(o.content, language, parent),
    tag: 'span',
    classes: ['token', o.type],
    attributes: {},
    language: language,
    parent: parent
  };

  if (env.type == 'comment') {
    env.attributes['spellcheck'] = 'true';
  }

  _.hooks.run('wrap', env);

  var attributes = '';

  for (var name in env.attributes) {
    attributes += name + '="' + (env.attributes[name] || '') + '"';
  }

  return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!self.document) {
  // In worker
  self.addEventListener('message', function(evt) {
    var message = JSON.parse(evt.data),
        lang = message.language,
        code = message.code;

    self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
    self.close();
  }, false);

  return;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
  _.filename = script.src;

  if (document.addEventListener && !script.hasAttribute('data-manual')) {
    document.addEventListener('DOMContentLoaded', _.highlightAll);
  }
}

})();;
Prism.languages.markup = {
  'comment': /&lt;!--[\w\W]*?-->/g,
  'prolog': /&lt;\?.+?\?>/,
  'doctype': /&lt;!DOCTYPE.+?>/,
  'cdata': /&lt;!\[CDATA\[[\w\W]*?]]>/i,
  'tag': {
    pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,
    inside: {
      'tag': {
        pattern: /^&lt;\/?[\w:-]+/i,
        inside: {
          'punctuation': /^&lt;\/?/,
          'namespace': /^[\w-]+?:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          'punctuation': /=|>|"/g
        }
      },
      'punctuation': /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          'namespace': /^[\w-]+?:/
        }
      }

    }
  },
  'entity': /&amp;#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});;
Prism.languages.css = {
  'comment': /\/\*[\w\W]*?\*\//g,
  'atrule': {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      'punctuation': /[;:]/g
    }
  },
  'url': /url\((["']?).*?\1\)/gi,
  'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
  'string': /("|')(\\?.)*?\1/g,
  'important': /\B!important\b/gi,
  'ignore': /&(lt|gt|amp);/gi,
  'punctuation': /[\{\};:]/g
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
      inside: {
        'tag': {
          pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      }
    }
  });
};
Prism.languages.css.selector = {
  pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
  inside: {
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
    'pseudo-class': /:[-\w]+(?:\(.*\))?/g,
    'class': /\.[-:\.\w]+/g,
    'id': /#[-:\.\w]+/g
  }
};

Prism.languages.insertBefore('css', 'ignore', {
  'hexcode': /#[\da-f]{3,6}/gi,
  'entity': /\\[\da-f]{1,8}/gi,
  'number': /[\d%\.]+/g,
  'function': /(attr|calc|cross-fade|cycle|element|hsl|hsla|image|lang|linear-gradient|matrix|matrix3d|perspective|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|rgb|rgba|rotate|rotatex|rotatey|rotatez|rotate3d|scale|scalex|scaley|scalez|scale3d|skew|skewx|skewy|steps|translate|translatex|translatey|translatez|translate3d|url|var)/ig
});;
Prism.languages.clike = {
  'comment': {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
    lookbehind: true
  },
  'string': /("|')(\\?.)*?\1/g,
  'class-name': {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,
  'boolean': /\b(true|false)\b/g,
  'function': {
    pattern: /[a-z0-9_]+\(/ig,
    inside: {
      punctuation: /\(/
    }
  },
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  'operator': /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  'ignore': /&(lt|gt|amp);/gi,
  'punctuation': /[{}[\];(),.:]/g
};;
Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
      inside: {
        'tag': {
          pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      }
    }
  });
};
/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 *    - Extends clike syntax
 *    - Support for PHP 5.3 and 5.4 (namespaces, traits, etc)
 *    - Smarter constant and function matching
 *
 * Adds the following new token classes:
 *    constant, delimiter, variable, function, package
 */

Prism.languages.php = Prism.languages.extend('clike', {
  'keyword': /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|extends|private|protected|parent|static|throw|null|echo|print|trait|namespace|use|final|yield|goto|instanceof|finally|try|catch)\b/ig,
  'constant': /\b[A-Z0-9_]{2,}\b/g
});

Prism.languages.insertBefore('php', 'keyword', {
  'delimiter': /(\?>|&lt;\?php|&lt;\?)/ig,
  'variable': /(\$\w+)\b/ig,
  'package': {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
    lookbehind: true,
    inside: {
      punctuation: /\\/
    }
  }
});

// Must be defined after the function pattern
Prism.languages.insertBefore('php', 'operator', {
  'property': {
    pattern: /(->)[\w]+/g,
    lookbehind: true
  }
});

// Add HTML support of the markup language exists
if (Prism.languages.markup) {

  // Tokenize all inline PHP blocks that are wrapped in <?php ?>
  // This allows for easy PHP + markup highlighting
  Prism.hooks.add('before-highlight', function(env) {
    if (env.language !== 'php') {
      return;
    }

    env.tokenStack = [];

    env.code = env.code.replace(/(?:&lt;\?php|&lt;\?|<\?php|<\?)[\w\W]*?(?:\?&gt;|\?>)/ig, function(match) {
      env.tokenStack.push(match);

      return '{{{PHP' + env.tokenStack.length + '}}}';
    });
  });

  // Re-insert the tokens after highlighting
  Prism.hooks.add('after-highlight', function(env) {
    if (env.language !== 'php') {
      return;
    }

    for (var i = 0, t; t = env.tokenStack[i]; i++) {
      env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php'));
    }

    env.element.innerHTML = env.highlightedCode;
  });

  // Wrap tokens in classes that are missing them
  Prism.hooks.add('wrap', function(env) {
    if (env.language === 'php' && env.type === 'markup') {
      env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, "<span class=\"token php\">$1</span>");
    }
  });

  // Add the rules before all others
  Prism.languages.insertBefore('php', 'comment', {
    'markup': {
      pattern: /(&lt;|<)[^?]\/?(.*?)(>|&gt;)/g,
      inside: Prism.languages.markup
    },
    'php': /\{\{\{PHP[0-9]+\}\}\}/g
  });
};
Prism.languages.insertBefore('php', 'variable', {
  'this': /\$this/g,
  'global': /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,
  'scope': {
    pattern: /\b[\w\\]+::/g,
    inside: {
      keyword: /(static|self|parent)/,
      punctuation: /(::|\\)/
    }
  }
});;
Prism.languages.scss = Prism.languages.extend('css', {
  'comment': {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
    lookbehind: true
  },
  // aturle is just the @***, not the entire rule (to highlight var & stuffs)
  // + add ability to highlight number & unit for media queries
  'atrule': /@[\w-]+(?=\s+(\(|\{|;))/gi,
  // url, compassified
  'url': /([-a-z]+-)*url(?=\()/gi,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some caracters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was ard to do, so please be careful if you edit this one :)
  'selector': /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
});

Prism.languages.insertBefore('scss', 'atrule', {
  'keyword': /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return)|(?=@for\s+\$[-_\w]+\s)+from/i
});

Prism.languages.insertBefore('scss', 'property', {
  // var and interpolated vars
  'variable': /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
});

Prism.languages.insertBefore('scss', 'ignore', {
  'placeholder': /%[-_\w]+/i,
  'statement': /\B!(default|optional)\b/gi,
  'boolean': /\b(true|false)\b/g,
  'null': /\b(null)\b/g,
  'operator': /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});
;
Prism.languages.bash = Prism.languages.extend('clike', {
  'comment': {
    pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
    lookbehind: true
  },
  'string': {
    //allow multiline string
    pattern: /("|')(\\?[\s\S])*?\1/g,
    inside: {
      //'property' class reused for bash variables
      'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
    }
  },
  'keyword': /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
});

Prism.languages.insertBefore('bash', 'keyword', {
  //'property' class reused for bash variables
  'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
});
Prism.languages.insertBefore('bash', 'comment', {
  //shebang must be before comment, 'important' class from css reused
  'important': /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});
;
(function(){

if(!window.Prism) {
  return;
}

function $$(expr, con) {
  return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

var CRLF = crlf = /\r?\n|\r/g;

function highlightLines(pre, lines, classes) {
  var ranges = lines.replace(/\s+/g, '').split(','),
      offset = +pre.getAttribute('data-line-offset') || 0;

  var lineHeight = parseFloat(getComputedStyle(pre).lineHeight);

  for (var i=0, range; range = ranges[i++];) {
    range = range.split('-');

    var start = +range[0],
        end = +range[1] || start;

    var line = document.createElement('div');

    line.textContent = Array(end - start + 2).join(' \r\n');
    line.className = (classes || '') + ' line-highlight';
    line.setAttribute('data-start', start);

    if(end > start) {
      line.setAttribute('data-end', end);
    }

    line.style.top = (start - offset - 1) * lineHeight + 'px';

    (pre.querySelector('code') || pre).appendChild(line);
  }
}

function applyHash() {
  var hash = location.hash.slice(1);

  // Remove pre-existing temporary lines
  $$('.temporary.line-highlight').forEach(function (line) {
    line.parentNode.removeChild(line);
  });

  var range = (hash.match(/\.([\d,-]+)$/) || [,''])[1];

  if (!range || document.getElementById(hash)) {
    return;
  }

  var id = hash.slice(0, hash.lastIndexOf('.')),
      pre = document.getElementById(id);

  if (!pre) {
    return;
  }

  if (!pre.hasAttribute('data-line')) {
    pre.setAttribute('data-line', '');
  }

  highlightLines(pre, range, 'temporary ');

  document.querySelector('.temporary.line-highlight').scrollIntoView();
}

var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

Prism.hooks.add('after-highlight', function(env) {
  var pre = env.element.parentNode;
  var lines = pre && pre.getAttribute('data-line');

  if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
    return;
  }

  clearTimeout(fakeTimer);

  $$('.line-highlight', pre).forEach(function (line) {
    line.parentNode.removeChild(line);
  });

  highlightLines(pre, lines);

  fakeTimer = setTimeout(applyHash, 1);
});

addEventListener('hashchange', applyHash);

})();;
Prism.hooks.add('after-highlight', function (env) {
  // works only for <code> wrapped inside <pre data-line-numbers> (not inline)
  var pre = env.element.parentNode;
  if (!pre || !/pre/i.test(pre.nodeName) || pre.className.indexOf('line-numbers') === -1) {
    return;
  }

  var linesNum = (1 + env.code.split('\n').length);
  var lineNumbersWrapper;

  lines = new Array(linesNum);
  lines = lines.join('<span></span>');

  lineNumbersWrapper = document.createElement('span');
  lineNumbersWrapper.className = 'line-numbers-rows';
  lineNumbersWrapper.innerHTML = lines;

  if (pre.hasAttribute('data-start')) {
    pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
  }

  env.element.appendChild(lineNumbersWrapper);

});;
