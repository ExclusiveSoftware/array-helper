Object.defineProperty(Array.prototype, 'contains', {
	enumerable: false,
	value: function(property) {
		return this.indexOf(property) !== -1;
	}
});