var values = {
    enumberable: false,
    value: function (arr) {
        if (!Array.isArray(arr)) return false;
        if (arr.length !== this.length) return false;
        for (var x in this) {
            if (Array.isArray(this[x])) {
                if (!this[x].equals(arr[x])) return false;
            }
            else if (this[x] !== arr[x]) return false;
        }
        return true;
    }
};

if (!Array.prototype.equals) {
    Object.defineProperty(Array.prototype, 'equals', values);
}