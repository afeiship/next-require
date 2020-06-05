(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var findup = require('findup-sync');
  var path = require('path');
  var resolve = require('resolve')
  var micromatch = require('micromatch');
  var unique = require('array-unique');
  var parentDir = path.dirname(module.parent.filename);
  var SCOPE_RE = new RegExp('^@');
  var SCOPE_DECOMPOSITION_RE = new RegExp('^@(.+)/(.+)');
  var DEFAULT_RENAME_RE = /^next(-|\.)/;
  var DEFAULT_OPTIONS = {
    config: findup('package.json', { cwd: parentDir }),
    pattern: ['@feizheng/next-*', '!@feizheng/next-require'],
    scope: ['dependencies', 'devDependencies'],
    rename: function (inName) {
      var name = inName.replace(DEFAULT_RENAME_RE, '');
      return nx.camelize(name)
    },
    transform: function (name, target) {
      return target;
    }
  };

  // next packages:
  require('@feizheng/next-arrayify');
  require('@feizheng/next-camelize');

  nx.require = function (inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions)
    var pattern = options.pattern;
    var finalObject = {};
    var scope = options.scope;
    var config = options.config;
    var requireFn = typeof config === 'string' ? function (name) {
      var src = resolve.sync(name, { basedir: path.dirname(config) });
      return require(src);
    } : require;

    var configObject = (typeof config === 'string') ? require(config) : config;
    var names = scope.reduce(function (result, prop) {
      return result.concat(
        Object.keys(configObject[prop] || {})
      );
    }, []);

    var list = unique(micromatch(names, pattern));

    list.forEach(function (name) {
      var targetName = SCOPE_RE.test(name) ? SCOPE_DECOMPOSITION_RE.exec(name)[2] : name;
      var libName = options.rename(targetName);
      finalObject[libName] = options.transform(
        libName,
        requireFn(name)
      );
    });


    return finalObject;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.require;
  }
})();
