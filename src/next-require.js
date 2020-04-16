(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxCamelize = nx.camelize || require('@feizheng/next-camelize');

  nx.require = function () {
    var args = nx.slice(arguments);
    args.forEach(function (item) {
      var pkg = require(item);
      nx.set(nx, '$.' + nxCamelize(item), pkg.default || pkg);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.require;
  }
})();
