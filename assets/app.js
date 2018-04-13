
    // var usercity;
    
    // var trailApi = "https://trailapi-trailapi.p.mashape.com/";

    // var trailParameters = "?limit=10&q[city_cont]="+usercity+"&radius=25";

    // var mashapeKey = "UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE"; 
    // var h = "Accept: text/plain";

    // queryURL1 = trailApi + trailParameters;

$("#user").on("click", function() {

    var userCity = $("#usercity").val().trim()

    console.log(userCity);

    var openWeather = "http://api.openweathermap.org/data/2.5/forecast?";

    var openWeatherparam = "&q="+userCity

    var openWeatherApik ="&APPID=9155ad4470b3c881f026f9305727169c";

    var queryURL2 = openWeather + openWeatherparam + openWeatherApik;
    
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var nowWeather = response.list["0"].weather["0"].main;

        var nowWeatherDescription = response.list["0"].weather["0"].description;

        var humidity = response.list["0"].main.humidity;

        var temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);
        
        console.log(nowWeather);
        console.log("Current weather conditions: " + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " degrees Fahrenheit");
 
    });
})
   
    // $.ajax({
    //   url: queryURL1,
    //   method: "GET",
    //   headers: {
    //     "X-Mashape-Key":"UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE",
    //     "Accept": "text/plain"
    //   }
    // }).then(function(response) {
    //   console.log(response);
    //   console.log("my mom does not love me");

    // var cityName = response.places[1].city;
    // var siteName = response.places[1].name;
    // var lat = response.places[1].lat;
    // var long = response.places[1].lon;



    // console.log(cityName);
    // console.log(siteName);
    // console.log(lat);
    // console.log(long)
     
      
    // });

    