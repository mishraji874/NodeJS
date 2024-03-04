//How NodeJS differs from VanillaJS
// 1) Node runs on a server - not in a browser
// 2) the console is the terminal window

console.log("Hello world");

// 3) global object instead of window object
console.log(global);

// 4) Has common core modules that we will explore
// 5) CommonJS modules instead of ES6 modules

const os = require("os");
const path = require("path");
const math = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(math.add(2, 8));
console.log(math.sub(2, 8));
console.log(math.multiply(2, 8));
console.log(math.divide(2, 8));