const path = require('path')
const username = require('username');

const mockServerRoot = path.join(__dirname, '.');

const data = path.join(mockServerRoot, 'data/');
const tmp = path.join(mockServerRoot, 'tmp/');
var jsonConcat = require("json-concat");

username().then(username => {
    console.log(username);

    jsonConcat({
        src: data,
        // dest: tmp + `/${username}-db.json`
        dest: mockServerRoot + `/db.json`
    }, function (json) {
        console.log("json", json) ;
        //  t= tmp + `/new-db.json`;
    })
})

