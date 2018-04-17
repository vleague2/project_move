# Project_Move

![Page ScreenShot](assets/images/page-screenshot.png)

* What the app does

1. User can search for the city of their choice around the US
2. Once search is completed the weather of the city will be shown
3. Based off the weather, activities to do will be recommended to the user
4. User can also choose from a list of things to do
5. A list of parks and trails for the city will populate 
6. The places will show up on the map in pins 
7. The user can use this data to help decide what they will like to do for the day!

* How we created the app

1. Our team used a combination of JavaScript, jQuery, Materialize, FireBase, and a few API's to create this app
2. Create HTML for main page and create a form for the user to input the city of their choice
3. The screen with all the park info, map, and weather will be dynamically created through JavaScript
4. Create AJAX calls for our APIs
5. Collect the zip code the user inputs and generate the weather for that location from the Weather API
6. Use that data to then recommend the activities to the user
7. Using Google Maps API append the map to the screen to show the area the user inputed
8. Use the Trail API to create the list of activities
9. Append buttons to the screen for the activities category
10. When an activity button is clicked use the Places API to generate a list of parks for the city
11. Append buttons to the screen for the parks
12. When the buttons are clicked append park data to the screen in a dynamically created div
13. Use materialize framework to create the design for the site
14. Test the site for mobile functionality
15. Add media queries if needed