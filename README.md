# Running

1. Run **npm start**

2. Go to http://localhost:3000

3. Should see
![image](https://user-images.githubusercontent.com/923491/55205688-a1acdd80-51b2-11e9-9e01-bb9d8f4e2fe9.png)


# User Story
As a user interested to search for Weather forecast I should be able:
1. Type the name of the city on the search field
1. Get a autocomplete sugestion based on what I have typed 
1. Select the right city even we have different cities with the same name (ex: There are two Oslo in Norway - you have differentiate using longitute and latitue (sic)).
1. To see the list of cities suggested with a complementary information of (Acronom forr Country and Longitude and Latitude)  
1. To select, click or type other letter in order to selected the City 
1. To notice that search for the forecast data is being processed 
1. To see the forecast for my searched city for the next 5 days 
1. To the forecast data for each 3 hours for the next 5 days
1. See a forecast area chart time x temperature for each day.

# How it works 
It is a React-Redux app usign React Carbon Components to render forecast data for given city. The frontend code make RPC/REST API calls  through a node/express/json-server proxy to the OpenWeatherMap API. 

![image](https://user-images.githubusercontent.com/923491/55207398-b55b4280-51b8-11e9-91f5-60523e0f8947.png)
