var fs = require('fs')

var content = fs.readFileSync('./renderer.js', 'utf8')

alert(content)
