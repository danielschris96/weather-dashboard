var userInput = document.getElementById("text");
var submitButton = document.getElementById("weather-input");
var cityName = document.getElementById("city-name");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var cityList = document.getElementById("city-list");
var currentIcon = document.getElementById("current-icon");
var currentDate = document.getElementById("current-date");
var container2 = document.getElementById("container2");
var storageCities = [];

// setting the weather data to be hidden until the data is inputted
container2.style.visibility = "hidden";

// listens for a click on the search button and executes getWeather
submitButton.addEventListener("submit", getWeather);

// api key for accesssing openweathermap api
    apiKey = '7b917ea8f42cc643cbf4f7763708048b';

    // retrieves any data in local storage under the storageCities array, or sets it blank if it is empty
    var storageCities = JSON.parse(localStorage.getItem('storageCities')) || [];
    // this only creates the buttons if the array is not empty
    if (storageCities !== null) {
        // creates a button for each city in the storageCities array and appends them with specific ids
        for (var i = 0; i < storageCities.length; i++) {
          var saveCity = document.createElement("button");
          saveCity.textContent = storageCities[i];
          cityList.appendChild(saveCity);
          saveCity.setAttribute("id", storageCities[i]);
        }
      }

    //   this main function fetches the data and prints it to the page
function getWeather(event) {
    // preventing the default action of the form so we dont lose the data
    event.preventDefault();
    var userSearch = document.getElementById("city").value;

    // fetches the openweathermap data based on the user search
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userSearch + '&limit=5&appid=' + apiKey)
  .then(response => response.json())
  .then(data => {
    // retrieving the latitude and longitude data from the initial search to use in the 5 day weather forecast fetch
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    // fetches the 5 day forecast data for the city based on its coordinates
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial')
  .then(response => response.json())
  .then(data => {console.log(data)

    // makes the weather data visible on the page
    container2.style.visibility = "visible";

    
    // only creates a button if that button does not already exist
    if (!document.getElementById(data.city.name)) {
    var saveCity = document.createElement("button");
    saveCity.textContent = data.city.name;
    cityList.appendChild(saveCity);
    saveCity.setAttribute("id", data.city.name);
    // pushes the city name to the storageCities array to be stored in local storage
    storageCities.push(data.city.name)
    localStorage.setItem('storageCities', JSON.stringify(storageCities));
    }


    var weatherData = [];

    // sets specific values for i to iterate through based on the target indexes in the weather data. This allows us to target the same time for each day in our extended forecast.
   for (var i of [0, 7, 15, 23, 31, 39]) {
    var tempI = data.list[i].main.temp;
    // rounds the temperature to 2 decimal places
    var tempRoundedI = tempI.toFixed(2);
    var windI = data.list[i].wind.speed;
    var humidityI = data.list[i].main.humidity;
    var iconI = data.list[i].weather[0].icon;
    var dateI = data.list[i].dt_txt;

    // creating an object for our data to be stored in local storage 
    var weatherObj = {
        cityName: data.city.name,
        date: dateI,
        icon: iconI,
        temp: tempRoundedI,
        wind: windI,
        humidity: humidityI
    };

    // pushes our object to the weatherData array
    weatherData.push(weatherObj);
    
    // this prints our data to the html page
    document.getElementById('city-name' + i).textContent = data.city.name;
    document.getElementById('date' + i).textContent = dateI;
    document.getElementById('icon' + i).src = "http://openweathermap.org/img/w/" + iconI + ".png";
    document.getElementById('temp' + i).textContent = tempRoundedI;
    document.getElementById('wind' + i).textContent = windI;
    document.getElementById('humidity' + i).textContent = humidityI;

    // storing our data in local storage with the city name attached to the array
    localStorage.setItem("weatherData-" + data.city.name, JSON.stringify(weatherData));
}})})}
 
// event listener for our buttons that uses the text content of the button for the pullWeather function
cityList.addEventListener("click", function(event) {
    var cityStore = event.target.textContent;
    pullWeather(cityStore);
});

function pullWeather(cityStore) {
    // our weather data is pulled from local storage using the name to identify what data to retrieve.
    var weatherData = JSON.parse(localStorage.getItem("weatherData-" + cityStore));
    // sets the html weather section to be visible if we click a button
    container2.style.visibility = "visible";

    // iterates through the parsed data to select the data we want
    for (var i = 0; i < weatherData.length; i++) {
        var date = weatherData[i].date;
        var icon = weatherData[i].icon;
        var temp = weatherData[i].temp;
        var wind = weatherData[i].wind;
        var humidity = weatherData[i].humidity;
        var name = weatherData[i].cityName
       
        // prints the data to its respective elements using classes meant for this function
        document.querySelector('.city-name' + i).textContent = name;
        document.querySelector('.date' + i).textContent = date;
        document.querySelector('.icon' + i).src = "http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector('.temp' + i).textContent = temp;
        document.querySelector('.wind' + i).textContent = wind;
        document.querySelector('.humidity' + i).textContent = humidity;    
    }
}