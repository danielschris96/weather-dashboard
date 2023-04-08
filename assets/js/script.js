var userInput = document.getElementById("text");
var submitButton = document.getElementById("weather-input");

submitButton.addEventListener("submit", getWeather);

function getWeather(event) {
    event.preventDefault();
    var userSearch = document.getElementById("city").value;
    console.log(userSearch);
   
}

