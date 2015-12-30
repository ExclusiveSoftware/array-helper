Object.defineProperty(Array.prototype, 'toDict', {
    enumerable: false,
    value: function (prop) {
        return this.reduce(function (obj, t) {
            if (!obj[t[prop]]) obj[t[prop]] = t;
            else if (Array.isArray(obj[t[prop]])) obj[t[prop]].push(t);
            else obj[t[prop]] = [obj[t[prop]], t];
            return obj;
        }, {});
    }
});