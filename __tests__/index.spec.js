(function () {
  require('../src');

  describe('api.basic test', () => {
    test('nx.require should require next-js-core2', function () {
      nx.require();
      console.log(nx);
      expect(typeof nx.VERSION === 'string').toBe(true);
    });
  });
})();
