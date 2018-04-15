// When the user clicks the search button
$("#user").on("click", function() {

    // Pull the value from the search form
    var userCity = $("#usercity").val().trim();
        console.log(userCity);

    // hide the current content in search-content
    $(".search-content").css('display', 'none');

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
            console.log(nowWeather);

        // Pull the description of the current weather and store in a variable
        var nowWeatherDescription = response.list["0"].weather["0"].description;

        // Pull the humidity value and store in a variable
        var humidity = response.list["0"].main.humidity;

        // Pull and round the current temperature converted to F, store in a variable
        var temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);
        
        // Setting up the dynamically-generated html div for the weather!

        // row to house content
        var weatherRow = $("<div class='row'>");
            // column to limit width
            var weatherCol = $("<div class='col s6 offset-s3'>");

            // append!
            weatherRow.append(weatherCol);

                // Make the div that will show the current weather, this is the card container 
                var newWeatherDiv = $("<div class='card horizontal' style='margin-top: 20px'>");

                // append!
                weatherCol.append(newWeatherDiv);

                    // Div for the image that attaches to the card
                    var newWeatherImage = $("<div class='card-image'>");

                    // Append the div for the card image to the card horizontal div
                    newWeatherDiv.append(newWeatherImage);

                        if (nowWeather == "Clouds") {
                            var weatherConditionImage = "assets/images/clouds.png";
                            // add in an image based on the weather
                            newWeatherImage.append($("<img src=" + weatherConditionImage + ">"));
                        }

                        else if (nowWeather == "Rain") {
                            var weatherConditionImage = "assets/images/rain.png";
                            
                            // add in an image based on the weather. NEED TO DO IMAGES IN AN IF/ELSE
                            newWeatherImage.append($("<img src=" + weatherConditionImage + ">"));
                        }

                        else {
                            var weatherConditionImage = "assets/images/sun.png";

                            // add in an image based on the weather. NEED TO DO IMAGES IN AN IF/ELSE
                            newWeatherImage.append($("<img src=" + weatherConditionImage + ">"));
                        }

                    // Make a div that identifies as card stacked
                    var newWeatherCard = $("<div class='card-stacked'>");

                    // Append the card stacked div to the card horizontal div
                    newWeatherDiv.append(newWeatherCard);

                    // make a div that identifies the card content
                    var newWeatherContent = $("<div class='card-content'>");

                    // Append the card content div to the card horizontal div
                    newWeatherCard.append(newWeatherContent);

                        // Adding in the text for the card
                        newWeatherContent.append("<p style='font-size: 20px' class='center-align'>Current weather conditions for " + userCity + "</p><br>")

                        // Append a P tag that will hold the weather info
                        newWeatherContent.append("<p class='center-align'>" + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " &#176 F</p><br>")

                        // Append a suggestion
                        if (nowWeather == "Clouds") {
                            newWeatherContent.append("<p class='center-align'>Today would be a great day to go hiking or mountain biking!</p>");
                        }

                        else if (nowWeather == "Rain") {
                            newWeatherContent.append("<p class='center-align'>It might be a good idea to stay home or visit a museum, but if you want to brave the weather...</p>");
                        }

                        else {
                            newWeatherContent.append("<p class='center-align'>It's a beautiful day to visit a park or go camping!</p>");
                        }

        $("main").append(weatherRow);
    });
})

   

// CODE FOR OTHER THINGS~~~~~~~~~~~~~~~~~~~~~~~
    
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

    