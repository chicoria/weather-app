var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
app.use(cookieParser());


const weatherApiConfig = {
    "url" : "https://api.openweathermap.org",
    "appId" : "e63f3d4a8a1ce62142956481964b86e4",
}
var app = express();

app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World');
})



app.all('/api/weather*', function (req, res, next) {
    // reading the config
    req.setTimeout(600000);

    var pathname = req.originalUrl;
    pathname = pathname.toLowerCase();
    pathname = pathname.replace("/api/weather","");
    //https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
    // var url = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e63f3d4a8a1ce62142956481964b86e4';
    
    var url = `${weatherApiConfig.url+pathname+"&APPID="+weatherApiConfig.appId}`;

    //url = url.toLowerCase();
    console.log("URL " + url);

    req.headers["x-requested-with"] = 'XMLHttpRequest';

    var r = null;
    if (req.method === 'POST') {
        r = request.post({
            uri: url,
            headers: req.headers,
            json: req.body
        });
    } else if (req.method === 'PUT') {
        r = request.put({
            uri: url,
            headers: req.headers,
            json: req.body
        });
    } else {
        r = request(url);
    }
    req.pipe(r).on('error', function (e) {
        return next(e);
    }).pipe(res);
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})