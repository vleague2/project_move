// When the user clicks the search button
$("#user").on("click", function() {

    // Pull the value from the search form
    var userCity = $("#usercity").val().trim();
        console.log(userCity);

    // hide the current content in search-content
    $(".search-content").css('display', 'none');

    // in retrospect, changing bg color looks funky.....
    // $("main").css('background-image', 'none').css('background-color', '#7da3a1').css('transition', 'background-image 1s').css('transition', 'background-color 1s');







    // Starting the API info for the Weather API
    // Defining the start of the URL
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?";

    // query parameter
    var openWeatherparam = "&q="+userCity

    // API key parameter
    var openWeatherApik ="&APPID=9155ad4470b3c881f026f9305727169c";

    // putting it all together in a queryURL
    var queryURL2 = openWeatherURL + openWeatherparam + openWeatherApik;
    
    // AJAX call for Open Weather API
    $.ajax({
        url: queryURL2,
        method: "GET"

    // Once data is retrieved from API...
    }).then(function(response){
        console.log(response);
        
        // Pull the current weather and store in a variable
        var nowWeather = response.list["0"].weather["0"].main;

        // Pull the description of the current weather and store in a variable
        var nowWeatherDescription = response.list["0"].weather["0"].description;

        // Pull the humidity value and store in a variable
        var humidity = response.list["0"].main.humidity;

        // Pull and round the current temperature converted to F, store in a variable
        var temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);
        
        console.log(nowWeather);

        // Starting to make the div that will show the current weather but I have to go somewhere so it's unfinished lmao
        var newWeatherDiv = $("<div>");
        newWeatherDiv.text("")

        // Code below will go in a div with the current weather
        console.log("Current weather conditions: " + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " degrees Fahrenheit");
    });
})
   

// CODE FOR OTHER THINGS~~~~~~~~~~~~~~~~~~~~~~~


    // var usercity;
    
    // var trailApi = "https://trailapi-trailapi.p.mashape.com/";

    // var trailParameters = "?limit=10&q[city_cont]="+usercity+"&radius=25";

    // var mashapeKey = "UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE"; 
    // var h = "Accept: text/plain";

    // queryURL1 = trailApi + trailParameters;


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

    