const nx = require('@feizheng/next-js-core2');
require('../src/next-require');

describe('api.basic test', () => {
  test('nx.require should require next-js-core2', function () {
    nx.require();
    console.log(nx);
    expect(typeof nx.VERSION === 'string').toBe(true);
  });
});
