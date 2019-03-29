import {
    apiURL,
    citiesAPI
  } from "./BaseServices";


// export const headers = {
//     mode: 'no-cors', 
//     referrerPolicy: 'no-referrer'
// };

export const getForecast = (city) => {
   return fetch(apiURL + `/weather/data/2.5/forecast?q=${city}&units=metric`)
    .then(res => res.json())
    .catch(ex => {
        console.log('parsing failed', ex)
      });
}
export const getForecastByCityId = (cityId) => {
    return fetch(apiURL + `/weather/data/2.5/forecast?id=${cityId}&units=metric`)
     .then(res => res.json())
     .catch(ex => {
         console.log('parsing failed', ex)
       });
 }


export const getWeatherByCityId = (cityId) => {
    return fetch(apiURL + `/weather/data/2.5/weather?id=${cityId}&units=metric`)
     .then(res => res.json())
     .catch(ex => {
         console.log('parsing failed', ex)
       });
 }

 export const getCities = (query) => {
    return fetch(citiesAPI + `/city?name_like=${query.trim()}&_sort=name`)
     .then(res => res.json())
    //  .then(json => {
    //      if(json.length > 0){
    //         return json.filter(i=> i.name.startWith(query.trim())); 
    //      }else{
    //          return json;
    //      }
         
    //     })
     .catch(ex => {
         console.log('parsing failed', ex)
    });
 }