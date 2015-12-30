Object.defineProperty(Array.prototype, 'distinct', {
    enumerable: false,
    value: function () {
        var ret = [];
        for (var x in this) {
            var item = this[x];
            if (!ret.some(function (t) { return t === item; })) ret.push(item);
        }
        return ret;
    }
});