Object.defineProperty(Array.prototype, 'execute', {
    enumberable: false,
    value: function (callback) {
        var self = this;
        var complete = 0;
        var done = function (err) {
            if (err) {
                complete = -self.length;
                return setTimeout(function () { return callback(err); }, 1);
            }
            if (complete < 0) return;
            complete++;
            if (complete >= self.length)
                return setTimeout(function () { return callback(); }, 1);
        }
        for (var x in self) {
            (function () {
                var fn = self[x];
                if (typeof fn === 'function')
                    setTimeout(function () { fn(done); }, 1);
                else done();
            })();
        }
    }
});