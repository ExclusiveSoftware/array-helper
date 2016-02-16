var mods = [
    'distinct',
    'equals',
    'execute',
    'forEach',
    'toDict'
];
for (var x in mods) {
    require('./lib/' + mods[x] + '.js');
}