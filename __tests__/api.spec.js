const nx = require('@feizheng/next-js-core2');
require('../src/next-require');

describe('api.basic test', () => {
  test('nx.require', function () {
    nx.require('fs', 'path');
    expect(typeof nx.$.fs).toBe('object');
    expect(typeof nx.$.path).toBe('object');
  });
});
