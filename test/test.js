var assert = require('assert');
require('../index.js');
describe('Array', function () {
    describe('#toDict', function () {
        it('should return an object with specified key from array of objects', function () {
            var a = { ID: 'a', Data: 'test a' };
            var b = { ID: 'b', Data: 'test b' };
            var c = { ID: 'b', Data: 'test c' };
            assert.equal(JSON.stringify({ a: a, b: b }), JSON.stringify([a, b].toDict('ID')));
            assert.equal(JSON.stringify({ a: a, b: [b, c] }), JSON.stringify([a, b, c].toDict('ID')));
        });
    });
    describe('#distinct', function () {
        it('should return only unique elements in an array', function () {
            var a = [1, 1, 3, 5, 12, 6, 3, 5];
            var b = ['a', 'b', 'c', 'a', 'a', 'b'];
            assert.equal(JSON.stringify([1, 3, 5, 12, 6]), JSON.stringify(a.distinct()));
            assert.equal(JSON.stringify(['a', 'b', 'c']), JSON.stringify(b.distinct()));
            assert.equal(JSON.stringify([a, b]), JSON.stringify([a, b, a, b].distinct()));
        });
    });
    describe('#equals', function () {
        it('should return true for arrays that have equvilent elements false otherwise', function () {
            var a = [1, 2, 3];
            var b = [1, 2, 3];
            var c = [2, 3, 4, 5];
            var d = [2, 3, 4];
            var e = [1, 2, [3, 4]];
            var f = [1, 2, [3, 4]];
            var g = [1, 2, [4, 5]];
            var h = [1, 2, [3, [4, 5]]];
            var i = [1, 2, [3, [4, 5]]];
            assert.equal(true, a.equals(b));
            assert.equal(false, a.equals(c));
            assert.equal(false, a.equals(d));
            assert.equal(true, e.equals(f));
            assert.equal(false, e.equals(g));
            assert.equal(true, h.equals(i));
        });
    });
});