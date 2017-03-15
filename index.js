var mods = [
    'distinct',
    'equals',
    'execute',
    'forEach',
    'toDict',
	'contains'
];
for (var x in mods) {
    require('./lib/' + mods[x] + '.js');
}