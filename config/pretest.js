var fs = require('fs');
var dir = 'report';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}