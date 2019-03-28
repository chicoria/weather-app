const jsonServer = require('json-server')
var cookieParser = require('cookie-parser');

const server = jsonServer.create()
server.use(cookieParser());

const router = jsonServer.router('./mock-server/db.json')
const middlewares = jsonServer.defaults(); //#endregion
var request = require('request');


const weatherApiConfig = {
    "url" : "https://api.openweathermap.org",
    "appId" : "e63f3d4a8a1ce62142956481964b86e4",
}

server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


server.get('/api/weather/*', function (req, res, next) {
        // reading the config
        req.setTimeout(600000);
    
        var pathname = req.originalUrl;
        pathname = pathname.toLowerCase();
        console.log("pathname " + pathname);
        pathname = pathname.replace("/api/weather","");
        console.log("pathname " + pathname);
        //https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
        // var url = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e63f3d4a8a1ce62142956481964b86e4';
        
        var url = `${weatherApiConfig.url+pathname+"&APPID="+weatherApiConfig.appId}`;
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

server.use(middlewares)
server.use('/api', router);
server.listen(8080, () => {
  console.log('JSON Server is running on 8080')
})


