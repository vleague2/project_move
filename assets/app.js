// When the user clicks the search button
$("#user").on("click", function() {

    // Pull the value from the search form
    var userCity = $("#usercity").val().trim();
        console.log(userCity);

    // hide the current content in search-content
    $(".search-content").css('display', 'none');

    // Starting the API info for the Weather API

    // query parameter
    var openWeatherparam = "&q="+userCity

    // putting it all together in a queryURL
    var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?" + openWeatherparam + "&APPID=9155ad4470b3c881f026f9305727169c";
    
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
        
        // Setting up the dynamically-generated divs for the page!

        var container = $("<div class='container' id='dynamic-container'>");

        $("main").append(container);

        // rows to house content
        var weatherRow = $("<div class='row'>");

        var promptRow = $("<div class='row'>");

        var buttonRow = $("<div class='row'>");

        var buttonRow2 = $("<div class='row'>")

        var mapRow = $("<div class='row'>");

        // append all rows to the container
        container.append(weatherRow).append(promptRow).append(buttonRow).append(buttonRow2).append(mapRow);


            // WEATHER SECTION
            
            // column for Weather to limit width
            // var weatherCol = $("<div class='col m10 offset-m1'>");

            // var weatherCol = $("<div class='col m3 offset-m1' style='margin-top: 60px'>");
            var weatherCol2 = $("<div class='col m10 offset-m1' style='margin-top: 60px'>");


            // append!
            // weatherRow.append(weatherCol);
            weatherRow.append(weatherCol2);

                // Make the div that will show the current weather, this is the card container 
                // var newWeatherDiv = $("<div class='card horizontal' style='margin-top: 60px'>");
                var newWeatherDiv = $("<div class='card' id='weatherCard'>");
                // append!

                weatherCol2.append(newWeatherDiv);

                    // Div for the image that attaches to the card
                    // var newWeatherImage = $("<div class='card-image'>");
                    // var newWeatherImage = $("<p>");

                    // Append the div for the card image to the card horizontal div
                    // newWeatherDiv.append(newWeatherImage);
                    // weatherCol.append(newWeatherImage);

                        if (nowWeather == "Clouds") {
                            var weatherConditionImage = "assets/images/clouds.jpg";
                            // add in an image based on the weather
                            // newWeatherImage.append($("<img src=" + weatherConditionImage + ">"));
                            newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                        }

                        else if (nowWeather == "Rain") {
                            var weatherConditionImage = "assets/images/rain_large.jpg";
                            newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                            // add in an image based on the weather. NEED TO DO IMAGES IN AN IF/ELSE
                            // newWeatherImage.append($("<img height='200px' src=" + weatherConditionImage + ">"));
                        }

                        else {
                            var weatherConditionImage = "assets/images/sun.jpg";
                            newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                            // add in an image based on the weather. NEED TO DO IMAGES IN AN IF/ELSE
                            // newWeatherImage.append($("<img src=" + weatherConditionImage + ">"));
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
                            newWeatherContent.append("<p style='font-size: 20px' class='center-align'>Weather conditions for " + userCity + "</p><br>")

                            // Append a P tag that will hold the weather info
                            newWeatherContent.append("<p class='center-align'>Next 3 hours:<br>" + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " &#176 F</p><br>")

                            // Append a suggestion
                            if (nowWeather == "Clouds") {
                                newWeatherContent.append("<p class='center-align'>Today would be a great day for hiking or biking!</p>");
                            }

                            else if (nowWeather == "Rain") {
                                newWeatherContent.append("<p class='center-align'>It might be a good idea to stay home or go to the gym.</p>");
                            }

                            else {
                                newWeatherContent.append("<p class='center-align'>It's a beautiful day to visit a park or go camping!</p>");
                            }
            // This is prompt text.
            var promptCol =$("<div class='col m10 center-align offset-m1'>");

            promptRow.append(promptCol);
                
                var promptCard =$("<div class='card'>");
                    
                promptCol.append(promptCard);
                
                    var promptCon = $("<div class='card-content'>");

                    promptCard.append(promptCon);
                        
                    promptCon.append("<h5> What would you like to do? </h5>");

            // This row is for buttons.

            var buttonCol1 = $("<div class='col m5 offset-m1 center-align'>");

            var buttonCol2 = $("<div class='col m5 center-align'>");

            var buttonCol3 = $("<div class='col m5 offset-m1 center-align'>");

            var buttonCol4 = $("<div class='col m5 center-align'>");
                  
            buttonRow.append(buttonCol1).append(buttonCol2)
            
            buttonRow2.append(buttonCol3).append(buttonCol4);
                
                buttonCol1.append("<button class='waves-effect waves-light btn-large card-color' id='activity-btn' style='width: 100%'> Hiking </button>");

                buttonCol2.append("<button class='waves-effect waves-light btn-large card-color' id='activity-btn' style='width: 100%'> Mountain Biking </button>");
                
                buttonCol3.append("<button class='waves-effect waves-light btn-large card-color' id='activity-btn' style='width: 100%'> Camping </button>");

                buttonCol4.append("<button class='waves-effect waves-light btn-large card-color' id='activity-btn' style='width: 100%'> Visit a park </button>");

            // This for the map and content.
            
            var mapCol = $("<div class='col m6'>");

                mapRow.append(mapCol);

            var mapCard = $("<div class='card'>");

                mapCol.append(mapCard);

            var mapCon =$("<div class='card-content'>");

                mapCard.append(mapCon);

            var contentCol = $("<div class='col m6'>");
            
                mapRow.append(contentCol);

            var contentCard =$("<div class='card-content'>");

                contentCol.append(contentCard);

                
            
            





















                            
        // testing google places API

        var lat = response.city.coord.lat;

        var long = response.city.coord.lon;

        var queryURL3 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=park&key=AIzaSyDHo3GT-iOjN9IDB6VbfxLPxHzuQRonFBU&location=" + lat + "," + long + "&radius=40000";

        console.log(lat + ", " + long);
        console.log(queryURL3);

        // AJAX call for Google Places API
        $.ajax({
        url: queryURL3,
        method: "GET"

        // Once data is retrieved from API...
        }).then(function(response2){
            console.log(response2);
        });
 
    // Google maps
    var gmapAPIkey = "AIzaSyCSpUf0-RBtpwK-L4G2jhvJC9OqABx9aaY";


    var gmapCol = $("<div class='col s10'>");
    
    $(gmapCol).append("<iframe width='500' height='350' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=" + gmapAPIkey + "&q=" + userCity + "' allowfullscreen></iframe>");
    
    $(mapRow).append(gmapCol);
    // (".container").append(mapRow);

    function initMap() {
        var myLatLng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }
 
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
     
    // id 2 is hiking
    // id 5 is mountain biking 
    // id 6 is camping
    // id 7 is caving
      
    // });

    