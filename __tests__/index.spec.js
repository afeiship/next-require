(function () {
  require('../src');

  const resolve = require('resolve');

  describe('api.basic test', () => {
    test('nx.require should require next-js-core2', function () {
      nx.require();
      expect(typeof nx.VERSION === 'string').toBe(true);
    });

    test('nx.require context should be attached', () => {
      nx.require({
        pattern: ['@jswork/next-*', '!@jswork/next-require', 'resolve']
      });

      expect(nx.resolve === resolve).toBe(true);
    });
  });
})();
