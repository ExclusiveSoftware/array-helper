var values = {
    get: function () {
        return function (exec, end) {
            if (typeof exec !== 'function') return;
            var i = 0;
            var self = this;
            var next = function () {
                if (self.length <= i) {
                    if (typeof end === 'function')
                        end();
                    return;
                }
                exec(self[i], function () {
                    setTimeout(next, 1); //truncate the call stack for large arrays
                });
                i++;
            };
            next();
        };
    },
    enumerable: false    
};

Object.defineProperty(Array.prototype, 'forEachCallback', values);