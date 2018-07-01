// *************************************************************
// Configuration

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC1PojpHjoTN9wfR-eKil9jcxbGvZeJ-6I",
    authDomain: "project-move-1523543773098.firebaseapp.com",
    databaseURL: "https://project-move-1523543773098.firebaseio.com",
    projectId: "project-move-1523543773098",
    storageBucket: "",
    messagingSenderId: "101064034892"
};

firebase.initializeApp(config);

// Assign firebase to a variable
const database = firebase.database();

// initialize map marker
const mapMarker = {
    lat: null,
    long: null
};

// initialize usercity choice
let userCity = "";

// create a variable to store trails
let trails;

console.log(mapMarker);



// **************************************************************************
// function to initialize the Google map
function initMap(name = "") {

    let myLatLng = {
        lat: mapMarker.lat, 
        lng: mapMarker.long
    };

    // use the 0 index to access the DOM object
    let map = new google.maps.Map(($("#map")[0]), {
        zoom: 12,
        center: myLatLng
    });
    
    let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: name
    });
};


// function to get the weather from the open weather API
function getWeather() {

    return new Promise((resolve, reject) => {

        // query parameter for open weather API
        let openWeatherParam = `&q=${userCity}`;

        // open weather query for ajax call
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?${openWeatherParam}&APPID=9155ad4470b3c881f026f9305727169c`;

        // AJAX call for Open Weather API
        $.ajax({
            url: queryURL,
            method: "GET",

            // If we receive an error message...
            error: function(response, error) {
                console.log(error);
                $(".helper-text").text("Please enter a valid city.");

                // reject the promise so no code runs
                reject();
            },

            // Once data is retrieved from API...
            success: function(response) {
                console.log(response);

                // push the city into the database (needs work for array)
                database.ref().push({
                    City: userCity,
                });

                // resolve the promise so the code can continue
                resolve(response);
            }
        })
    })
}

// function to hide search page and display results page. basically all of the dynamically added structure is here
function setUpNewPage() {
   // hide the search screen on the homepage
   $(".search-content").css('display', 'none'); 

   // Add a back button so they can choose search again -- links to home page
        let backbutton = $( "<li>");

        let backbuttonLink = $("<a href='index.html'>Back to Search</a>");

        backbutton.append(backbuttonLink);

        $("#nav-mobile").append(backbutton);


   // Add a container that will hold all of the dynamic content and append it to the page
   let container = $("<div class='container' id='dynamic-container'>");

   $("main").append(container);


   // MAIN DYNAMIC CONTENT CONTAINERS
        let weatherRow = $("<div class='row' id='weather-row'>");
        let promptRow = $("<div class='row' id='prompt-row'>");
        let buttonRow = $("<div class='row' id='button-row'>");
        let buttonRow2 = $("<div class='row' id='button-row-2' style='margin-bottom: 40px'>")
        let resultRow = $("<div class='row' id='result-row'>");
        let mapRow = $("<div class='row' id='map-row' style='margin-bottom: 60px'>");

        container.append(weatherRow).append(promptRow).append(buttonRow).append(buttonRow2).append(resultRow).append(mapRow);

    // WEATHER DYNAMIC PAGE CONTENT
                
        // Column to house weather info, append to the correct row
        let weatherCol2 = $("<div class='col m12' style='margin-top: 60px'>");
        
        $('#weather-row').append(weatherCol2);

        // Make the div that will show the current weather; this is the card container. & append 
        let newWeatherDiv = $("<div class='card' id='weatherCard'>");

        weatherCol2.append(newWeatherDiv);

        // Make a div for Materialize's card stack; append
        let newWeatherCard = $("<div class='card-stacked'>");

        newWeatherDiv.append(newWeatherCard);

        // make a div that identifies the card content; append
        let newWeatherContent = $("<div class='card-content' id='new-weather-content'>");
        
        newWeatherCard.append(newWeatherContent);

    // USER CHOICE DYNAMIC CONTENT

        // Column to house the user choice prompt & append to the page
        let promptCol =$("<div class='col m10 offset-m1 center-align'>");
        promptRow.append(promptCol);
                
        // Create a card to format the text & append
        let promptCard =$("<div class='card'>");
        promptCol.append(promptCard);
                
        // Create the card content & append
        let promptCon = $("<div class='card-content'>");
        promptCard.append(promptCon);
            
        // Add text inside the card
        promptCon.append("<h5 class='question'> What would you like to do? </h5>"); 
        
    // BUTTON GENERATION

        // Create four columns, one for each button
        let buttonCol0 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

        let buttonCol1 = $("<div class='activity-btns col m5 center-align'>");

        let buttonCol2 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

        let buttonCol3 = $("<div class='activity-btns col m5 center-align'>");
        
        // Append the buttons to the appropriate rows
        buttonRow.append(buttonCol0).append(buttonCol1);
        buttonRow2.append(buttonCol2).append(buttonCol3);

        // Add the buttons themselves & add the correct labels
        buttonCol0.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='hiking' style='width: 100%'>Hiking</button>");

        buttonCol1.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='mountain+biking' style='width: 100%'>Mountain Biking</button>");
        
        buttonCol2.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='camping' style='width: 100%'>Camping</button>");

        buttonCol3.append("<button class='waves-effect waves-light btn-large card-color places-btn' value='4' style='width: 100%'>Visit a Park</button>");

    // create the area that will house the individual activities the user clicks & append
        let infoAreaCol = $("<div class='col m10 offset-m1' id='info-area-col'>");

        let infoArea = $("<div class='card' id='info-area' style='display: block'>");

        // append our infoArea column to the result row
        resultRow.append(infoAreaCol);
    

    // MAP ROW SECTION
                        
        // Create a column to house the map & append
        let mapCol = $("<div class='col m7' id='map'>");
        mapRow.append(mapCol);

        // Identify the API key for the map
        let gmapAPIkey = "AIzaSyCjHs6XkqXNSn2glWRVOqAdisf8xDJoFlg";
    
        // Append the map to the map column
        $(mapCol).append(`<script async defer src='https://maps.googleapis.com/maps/api/js?key=${gmapAPIkey}&callback=initMap'></script>`);

    // create a column to house the activity options & append
        let contentCol = $("<div class='col m5'>");
        mapRow.append(contentCol);

        // create the card to format the activity option text & append
        let contentCard =$("<div class='card' style='margin-top: 0px'>");
        contentCol.append(contentCard);

        // create the card content & append
        let contentCon =$("<div class='card-content selectAct center-align' id='content-con'>");
        contentCard.append(contentCon);
    
        // Add the title text
        contentCon.text("Select an activity.");    
}    

// function to grab weather results and add to page
function updateWeather(response) {
    // Pull the current weather from the API and store in a variable
    let nowWeather = response.list["0"].weather["0"].main;

    // Pull the description of the current weather from the API and store in a variable
    let nowWeatherDescription = response.list["0"].weather["0"].description;

    // Pull the humidity value from the API and store in a variable
    let humidity = response.list["0"].main.humidity;

    // Pull and round the current temperature converted to F, store in a variable
    let temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);

    // pull the location's latitude from the API
    mapMarker.lat = response.city.coord.lat;

    // Pull the location's longitude from the API
    mapMarker.long = response.city.coord.lon;
        
    // Adding in the text for the card - title
    $("#new-weather-content").append(`<p style='font-size: 20px' class='center-align'>Weather conditions for ${response.city.name} </p><br>`)

    // Append a P tag that will hold the weather info
    $("#new-weather-content").append(`<p class='center-align'>Next 3 hours:<br>  ${nowWeatherDescription} | ${humidity}% humidity | ${temperature} &#176 F</p><br>`)

    weatherSuggestion(nowWeather);
}

// function to suggest activities
function weatherSuggestion(weather) {

    // choose an activity suggestion based on the weather

    let weatherSuggestion = "";
    let weatherImage = "";

    switch (weather) {
        case "Clouds":

            weatherSuggestion = "Today would be a great day for hiking or biking!" 
            
            weatherImage = "clouds.jpg";

            break;

        case "Rain":
            weatherSuggestion = "It might be a good idea to head to the gym!";

            weatherImage = "rain_large.jpg";

            break;

        case "Snow":
            weatherSuggestion = "It might be a good idea to head to the gym!";

            weatherImage = "snow2.jpg";

            break;

        default:
            weatherSuggestion = "It's a beautiful day to visit a park or go camping!";

            weatherImage = "sun.jpg";

            console.log("default");
            break;
    }  

    // append weather suggestion and weather image to the page
    $('#newWeatherContent').append(`<p class='center-align'>${weatherSuggestion}</p>`);

    $('#weatherCard').css("background-image", `url("assets/images/${weatherImage}")`);
}


// function to check the user's city input
function citySearch(){

    // Pull the value from the search form
    userCity = $("#usercity").val().trim();

    // make the city lowercase so the data is standardized in our database
    userCity = userCity.toLowerCase();
    
    console.log("userCity: " + userCity);
  
    // input validation -- make sure they are entering enough characters
    if (userCity.length < 3) {
        $(".helper-text").text("Please enter a city name.")
    }

    // if the input is long enough...
    else {
        // *************************************************************************************************************************************************************************************
        // call API to get the weather for the city the user entered
        getWeather()
        .then(response => {

            // hide the home page so we can load the search results
            setUpNewPage();

            // pass in the response from the api to update the weather info on the page
            updateWeather(response);
        });
    }
}

function activitySearch(active) {
    // empty the card that contains the activity options (card is created below)
    $("#content-con").empty();

    // Add the title text
    $("#content-con").text("Activity Options");

    // Create the trail API parameters
    let trailParameters = `?limit=10&q[activities_activity_type_name_eq]=${active}&q[city_cont]=${userCity}&radius=25`;

    // assemble the query URL for the trail API
    var queryURL = `https://cors-anywhere.herokuapp.com/https://trailapi-trailapi.p.mashape.com/${trailParameters}`;
                    
    // initiate ajax call to the API
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-Mashape-Key":"UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE",
            "Accept": "text/plain"
        }                      
    }).then(function(response) {
        // add a message for the user if the response returns no results
        if (response.places.length < 1) {
                            
            // add a paragraph to hold the error text, append, and add the text
            var errText = $("<p>");

            $("#content-con").append(errText);

            errText.text("Sorry, no options match that activity in this area.");
        }

        // if the response returns results:
        else {

            trails = response;

            createTrailButtons();
        }
    })
}


function createTrailButtons() {
    // loop through the length of the trails
    for (var i = 0; i < trails.places.length; i++ ){

        // create buttons for each trails item
        var trailbutton = `<button class='waves-effect waves-light btn-large card-color trail-btn'  value=${[i]} style='width: 100%'> ${trails.places[i].name} </button>`;

        // append to the card that holds the activity content
        $("#content-con").append(trailbutton);
    }
}

function displayTrails(index) {
    // make the infoArea visible & empty it
    $("#info-area").css('display', 'block').empty();

    $("#info-area-col").append($("#info-area"));

    // build table dynamically
    let table = $("<table>");
    let tr1 = $("<tr>");
    let tableHead = $("<th id='activity-name'>");
    let tr2 = $("<tr>");
    let tableBody = $("<td id='activity-descr'>");

    // add a title to the table with the name of the location
    tableHead.text(trails.places[index].name);

    // if the activity does not have a description
    if (trails.places[index].activities["0"].description == null) {
        tableBody.html("<em> Sorry, this location does not have a description. </em>")
    }

    // otherwise, add the description to the body
    else {
        tableBody.html(trails.places[index].activities["0"].description  + "<br> <br>" + "<a target='_blank' href='" + trails.places[index].activities["0"].url + "'>" + "Click here to learn more. </a>");
    }
    
    // append everything
    table.append(tr1);
    table.append(tr2);
    tr1.append(tableHead);
    tr2.append(tableBody);
    $("#info-area").append(table);

    mapMarker.lat = trails.places[index].lat;

    mapMarker.long = trails.places[index].lon;

    initMap(trails.places[index].name);
}



// *************************************************************************
// Event listeners

// When the user clicks the search button
$("#user").on("click", function() {
    citySearch();
});

// Allow the user to hit enter to search
$("#usercity").keyup(function(event) {
    if (event.keyCode === 13) {
        citySearch();
    }
});

// attaching as an event delegator to catch dynamically generated elements
$("body").on("click", ".activity-btn", function(){
    // Pull the value of the button the user clicked
    let active = $(this).attr("value");
    console.log(active);

    activitySearch(active);
});

$("body").on("click", ".trail-btn", function(){
    // pull the value of the clicked button
    let index = $(this).attr("value");

    displayTrails(index);
});
    /*
         // *************************************************************************************************************************************************************************************
        // query parameter for open weather API
        var openWeatherparam = "&q="+userCity

        // open weather query for ajax call
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + openWeatherparam + "&APPID=9155ad4470b3c881f026f9305727169c";
            
        // AJAX call for Open Weather API
        $.ajax({
            url: queryURL2,
            method: "GET",

            // If we receive an error message...
            error: function(response, error) {
                console.log(error);
                $(".helper-text").text("Please enter a valid city.");
            },

            // Once data is retrieved from API...
            success: function(response) {
                console.log(response);

                // push the city into the database (needs work for array)
                database.ref().push({
                    City: userCity,
                });

                // hide the search screen on the homepage
                $(".search-content").css('display', 'none');

                // Add a back button so they can choose search again -- links to home page
                var backbutton = $( "<li>");
                var backbuttonLink = $("<a href='index.html'>Back to Search</a>")
                backbutton.append(backbuttonLink);
                $("#nav-mobile").append(backbutton);
                
                // Pull the current weather from the API and store in a variable
                var nowWeather = response.list["0"].weather["0"].main;
                    console.log(nowWeather);

                // Pull the description of the current weather from the API and store in a variable
                var nowWeatherDescription = response.list["0"].weather["0"].description;

                // Pull the humidity value from the API and store in a variable
                var humidity = response.list["0"].main.humidity;

                // Pull and round the current temperature converted to F, store in a variable
                var temperature = Math.round((response.list["0"].main.temp - 273.15) * 1.8 + 32);

                // pull the location's latitude from the API
                mapMarker.lat = response.city.coord.lat;

                // Pull the location's longitude from the API
                mapMarker.long = response.city.coord.lon;
                    
                // Add a container that will hold all of the dynamic content and append it to the page
                var container = $("<div class='container' id='dynamic-container'>");
                $("main").append(container);

                // rows to house content, and append to the container
                var weatherRow = $("<div class='row'>");
                var promptRow = $("<div class='row'>");
                var buttonRow = $("<div class='row'>");
                var buttonRow2 = $("<div class='row' style='margin-bottom: 40px'>")
                var resultRow = $("<div class='row'>");
                var mapRow = $("<div class='row' style='margin-bottom: 60px'>");
                container.append(weatherRow).append(promptRow).append(buttonRow).append(buttonRow2).append(resultRow).append(mapRow);


                // append our infoArea column to the result row
                resultRow.append(infoAreaCol);


                // WEATHER CONTENT SECTION
                
                    // Column to house weather info, append to the correct row
                    var weatherCol2 = $("<div class='col m12' style='margin-top: 60px'>");
                    weatherRow.append(weatherCol2);

                    // Make the div that will show the current weather; this is the card container. & append 
                    var newWeatherDiv = $("<div class='card' id='weatherCard'>");
                    weatherCol2.append(newWeatherDiv);

                    // Make a div for Materialize's card stack; append
                    var newWeatherCard = $("<div class='card-stacked'>");
                    newWeatherDiv.append(newWeatherCard);

                    // make a div that identifies the card content; append
                    var newWeatherContent = $("<div class='card-content'>");
                    newWeatherCard.append(newWeatherContent);

                    // Adding in the text for the card - title
                    newWeatherContent.append("<p style='font-size: 20px' class='center-align'>Weather conditions for " + response.city.name + "</p><br>")

                    // Append a P tag that will hold the weather info
                    newWeatherContent.append("<p class='center-align'>Next 3 hours:<br>" + nowWeatherDescription + " | " + humidity + "% humidity | " + temperature + " &#176 F</p><br>")

                    // Append a suggestion about the weather & insert appropriate weather image
                    if (nowWeather == "Clouds") {
                        newWeatherContent.append("<p class='center-align'>Today would be a great day for hiking or biking!</p>");
                        var weatherConditionImage = "assets/images/clouds.jpg";
                        newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                    }

                    else if (nowWeather == "Rain") {
                        newWeatherContent.append("<p class='center-align'>It might be a good idea to head to the gym!</p>");
                        var weatherConditionImage = "assets/images/rain_large.jpg";
                        newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                    }

                    else if (nowWeather == "Snow") {
                        newWeatherContent.append("<p class='center-align'>It might be a good idea to head to the gym!</p>");
                        var weatherConditionImage = "assets/images/snow2.jpg";
                        newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                    }

                    else {
                        newWeatherContent.append("<p class='center-align'>It's a beautiful day to visit a park or go camping!</p>");
                        var weatherConditionImage = "assets/images/sun.jpg";
                        newWeatherDiv.css("background-image", "url('" + weatherConditionImage + "')");
                    }


                // USER CHOICE PROMPT CONTENT

                    // Column to house the prompt & append
                    var promptCol =$("<div class='col m10 offset-m1 center-align'>");
                    promptRow.append(promptCol);
                            
                    // Create a card to format the text & append
                    var promptCard =$("<div class='card'>");
                    promptCol.append(promptCard);
                            
                    // Create the card content & append
                    var promptCon = $("<div class='card-content'>");
                    promptCard.append(promptCon);
                        
                    // Add text inside the card
                    promptCon.append("<h5 class='question'> What would you like to do? </h5>");


                // BUTTON GENERATION & FUNCTIONALITY SECTION

                    // Create four columns, one for each button
                    var buttonCol0 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

                    var buttonCol1 = $("<div class='activity-btns col m5 center-align'>");

                    var buttonCol2 = $("<div class='activity-btns btn-hiking-camping col m5 offset-m1 center-align'>");

                    var buttonCol3 = $("<div class='activity-btns col m5 center-align'>");
                    
                    // Append the buttons to the appropriate rows
                    buttonRow.append(buttonCol0).append(buttonCol1);
                    buttonRow2.append(buttonCol2).append(buttonCol3);


                    // Add the buttons themselves & add the correct labels
                    buttonCol0.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='hiking' style='width: 100%'>Hiking</button>");

                    buttonCol1.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='mountain+biking' style='width: 100%'>Mountain Biking</button>");
                    
                    buttonCol2.append("<button class='waves-effect waves-light btn-large card-color activity-btn' value='camping' style='width: 100%'>Camping</button>");

                    buttonCol3.append("<button class='waves-effect waves-light btn-large card-color places-btn' value='4' style='width: 100%'>Visit a Park</button>");

                    // When the user clicks on one of the first three
                    $(".activity-btn").on("click", function(){

                        // empty the card that contains the activity options (card is created below)
                        contentCon.empty();

                        // since we just emptied it, we have to append the title of the card (title is created below)
                        contentCon.append(contentTitle);

                        // Add the title text
                        contentTitle.text("Activity Options");

                        // Pull the value of the button the user clicked
                        var active = $(this).attr("value");
                        console.log(active);
    
                        // Create the trail API parameters
                        var trailParameters = "?limit=10&q[activities_activity_type_name_eq]="+active+"&q[city_cont]="+userCity+"&radius=25";
                
                        // assemble the query URL for the trail API
                        var queryURL1 = "https://cors-anywhere.herokuapp.com/https://trailapi-trailapi.p.mashape.com/" + trailParameters;
                    
                        // initiate ajax call to the API
                        $.ajax({
                            url: queryURL1,
                            method: "GET",
                            headers: {
                                "X-Mashape-Key":"UAIZZbiYBYmshS9WHNnVPYPKLg0Mp199qK4jsn409p32gnYRrE",
                                "Accept": "text/plain"
                            }                      
                        }).then(function(response3) {
                            console.log(response3);

                            // add a message for the user if the response returns no results
                            if (response3.places.length < 1) {
                            
                                // add a paragraph to hold the error text, append, and add the text
                                var errText = $("<p>");
                                contentCon.append(errText);
                                errText.text("Sorry, no options match that activity in this area.");
                            }

                            // if the response returns results:
                            else {

                                // loop through the length of the response
                                for (var i = 0; i < response3.places.length; i++ ){

                                    // create buttons for each response item
                                    var trailbutton = "<button class='waves-effect waves-light btn-large card-color trail-btn'  value=" +[i]+ " style='width: 100%'>" + response3.places[i].name + "</button>";

                                    // append to the card that holds the activity content
                                    $(contentCon).append(trailbutton);
                                };
                                
                                // listen for clicks on the newly created trail buttons
                                $(".trail-btn").on("click", function(){

                                    // pull the value of the clicked button
                                    var index = $(this).attr("value");

                                    // make the infoArea visible & empty it
                                    infoArea.css('display', 'block');
                                    infoArea.empty();
                                    infoAreaCol.append(infoArea);

                                    // build tabel dynamically
                                    var table = $("<table>");
                                    var tr1 = $("<tr>");
                                    var tableHead = $("<th id='activity-name'>");
                                    var tr2 = $("<tr>");
                                    var tableBody = $("<td id='activity-descr'>");

                                    // add a title to the table with the name of the location
                                    tableHead.text(response3.places[index].name);

                                    // if the activity does not have a description
                                    if (response3.places[index].activities["0"].description == null) {
                                        tableBody.html("<em> Sorry, this location does not have a description. </em>")
                                    }

                                    // otherwise, add the description to the body
                                    else {
                                        tableBody.html(response3.places[index].activities["0"].description  + "<br> <br>" + "<a target='_blank' href='" + response3.places[index].activities["0"].url + "'>" + "Click here to learn more. </a>");
                                    }
                                    
                                    // append everything
                                    table.append(tr1);
                                    table.append(tr2);
                                    tr1.append(tableHead);
                                    tr2.append(tableBody);
                                    infoArea.append(table);

                                    mapMarker.lat = response3.places[index].lat;
                                    mapMarker.long = response3.places[index].lon;
                                    
                                    console.log(mapMarker);

                                    addMarker();

                                    function addMarker(location, map){
                                        var myLatLng = {lat: mapMarker.lat, lng: mapMarker.long};
                                        
                                        var map = new google.maps.Map(document.getElementById("map"), {
                                            zoom: 12,
                                            center: myLatLng
                                        });
                                            console.log(map);
                                        
                                        var marker = new google.maps.Marker({
                                            position: myLatLng,
                                            map: map,
                                            title: response3.places[index].name
                                        });
                                            console.log(myLatLng);
                                    }
                                });
                            }
                        });
                    });

                    // listen for clicks on the park button specifically
                    $(".places-btn").on("click", function(){
                          
                        // empty the content card
                        contentCon.empty();

                        // append the title & add text
                        contentCon.append(contentTitle);
                        contentTitle.text("Activity Options");

                        // define the URL for the google places API
                        var queryURL3 = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=park&key=AIzaSyDHo3GT-iOjN9IDB6VbfxLPxHzuQRonFBU&location=" + mapMarker.lat + "," + mapMarker.long + "&radius=40000";

                        console.log(queryURL3);

                        // AJAX call for Google Places API
                        $.ajax({
                        url: queryURL3,
                        method: "GET",

                            // if the API returns an error, that means there are no activities
                            error: function(response4, error) {
                                console.log(error);
                                var errText = $("<p>");
                                contentCon.append(errText);
                                errText.text("Sorry, no options match that activity in this area.");
                            },
                    
                            // Once data is retrieved from API...
                            success: function(response4) {
                                console.log(response4);

                                // loop through the first 10 results
                                for (var i = 0; i < 10; i++ ){

                                    // create buttons for each result & append
                                    var trailbutton = "<button class='waves-effect waves-light btn-large card-color trail-btn'  value=" +[i]+ " style='width: 100%'>" + response4.results[i].name + "</button>";
                                    $(contentCon).append(trailbutton);
                                };

                                $(".trail-btn").on("click", function(){
                                    // pull the value of the clicked button
                                    var index = $(this).attr("value");

                                    // make the infoArea visible & empty it
                                    infoArea.css('display', 'block');
                                    infoArea.empty();
                                    infoAreaCol.append(infoArea);

                                    // build table dynamically
                                    var table = $("<table>");
                                    var tr1 = $("<tr>");
                                    var tableHead = $("<th id='activity-name'>");
                                    var tr2 = $("<tr>");
                                    var tableBody = $("<td id='activity-descr'>");

                                    // add a title to the table with the name of the location
                                    tableHead.text(response4.results[index].name);

                                    // add the address and rating of the location
                                    tableBody.html("Address: " + response4.results[index].formatted_address + "<br> Rating: " + response4.results[index].rating + "/5" )
                                                    
                                    // append everything
                                    table.append(tr1);
                                    table.append(tr2);
                                    tr1.append(tableHead);
                                    tr2.append(tableBody);
                                    infoArea.append(table);

                                    mapMarker.lat = response4.results[index].geometry.location.lat;
                                    mapMarker.long = response4.results[index].geometry.location.lng;
                                    
                                    console.log(mapMarker);

                                    addMarker();

                                    function addMarker(location, map){
                                        var myLatLng = {lat: mapMarker.lat, lng: mapMarker.long};
                                        
                                        var map = new google.maps.Map(document.getElementById("map"), {
                                            zoom: 12,
                                            center: myLatLng
                                        });
                                            console.log(map);
                                        
                                        var marker = new google.maps.Marker({
                                            position: myLatLng,
                                            map: map,
                                            title: response4.results[index].name
                                        });
                                            console.log(myLatLng);
                                    };
                                });
                            }
                        });
                    });
                
                // MAP ROW SECTION
                        
                    // Create a column to house the map & append
                    var mapCol = $("<div class='col m7' id='map'>");
                    mapRow.append(mapCol);

                    // Identify the API key for the map
                    var gmapAPIkey = "AIzaSyCjHs6XkqXNSn2glWRVOqAdisf8xDJoFlg";
                
                    // Append the map to the map column
                    $(mapCol).append("<script async defer                           src='https://maps.googleapis.com/maps/api/js?key=" + gmapAPIkey + "&callback=initMap'></script>");

                    // create a column to house the activity options & append
                    var contentCol = $("<div class='col m5'>");
                    mapRow.append(contentCol);

                    // create the card to format the activity option text & append
                    var contentCard =$("<div class='card' style='margin-top: 0px'>");
                    contentCol.append(contentCard);

                    // create the card content & append
                    var contentCon =$("<div class='card-content selectAct center-align'>");
                    contentCard.append(contentCon);

                    // Create the title of the card & append it
                    var contentTitle = $("<span class='card-title center-align'>");
                    contentCon.append(contentTitle);
                            
                    // Add the title text
                    contentCon.text("Select an activity.");    
            }
        });
    };
};
*/