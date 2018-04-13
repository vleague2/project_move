
    var usercity;
    
    var trailApi = "https://trailapi-trailapi.p.mashape.com/";

    var trailParameters = "?limit=10&q[city_cont]="+usercity+"&radius=25";

    var mashapeKey = "UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE"; 
    var h = "Accept: text/plain";

    queryURL1 = trailApi + trailParameters;

    var openWeather = "http://api.openweathermap.org/data/2.5/forecast?";

    var openWeatherparam = "q="+usercity

    var openWeatherApik ="&APPID=9155ad4470b3c881f026f9305727169c";

    var queryURL2 = openWeather + usercity + openWeatherApik;
    

   
    $.ajax({
      url: queryURL1,
      method: "GET",
      headers: {
        "X-Mashape-Key":"UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE",
        "Accept": "text/plain"
      }
    }).then(function(response) {
      console.log(response);
      console.log("my mom does not love me");

    var cityName = response.places[1].city;
    var siteName = response.places[1].name;
    var lat = response.places[1].lat;
    var long = response.places[1].lon;
    var activity = response.places[1].activities[1].activity_type_name;
    
   

    // id 2 is hiking
    // id 5 is mountain biking 
    // id 6 is camping
    // id 7 is caving
    



    console.log(cityName);
    console.log(siteName);
    console.log(lat);
    console.log(long);
    console.log(activity);
     
      
    });

    // $.ajax({
    //     url: queryURL2,
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    //     console.log("hi");

    //     var cityName2 = response.city.name;

    //     console.log(cityName2);
 
    // });