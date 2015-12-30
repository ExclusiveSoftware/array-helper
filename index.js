var fs = require('fs');
var mods = fs.readdirSync('./lib');
for (var x in mods) {
    if (mods[x].slice(-3) === '.js') require('./lib/' + mods[x]);
}