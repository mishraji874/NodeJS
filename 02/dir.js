const fs = require('fs');

if(!fs.existsSync('.new')) {
fs.mkdir('.new', (err) => { //mkdir to create directory
    if (err) throw err;
    console.log('Directory created')
});
}

if(fs.existsSync('.new')) {
    fs.rmdir('.new', (err) => { //rmdir to remove directory
        if (err) throw err;
        console.log('Directory removed')
    });
}