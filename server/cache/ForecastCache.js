const CacheService=  require('./CacheService');
var request = require('request');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

const ForecastCache = {



    getForecastByCityId(req, res) {

  
        const url= "https://api.openweathermap.org";
        const appId = "e63f3d4a8a1ce62142956481964b86e4";
     

        req.setTimeout(600000);
        
        var pathname = req.originalUrl;
        pathname = pathname.toLowerCase();
        pathname = pathname.replace("/api/weather","");
    
        console.log("pathname " + pathname);
        var completeURL = `${completeURL+pathname+"&APPID="+appId}`;
        console.log("URL " + completeURL);
        
        let cityId = req.query.id; 
   
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

    },
};
  
module.exports = ForecastCache;