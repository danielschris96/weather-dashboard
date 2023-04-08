var userInput = document.getElementById("text");
var submitButton = document.getElementById("weather-input");

submitButton.addEventListener("submit", getWeather);

function getWeather(event) {
    event.preventDefault();
    var userSearch = document.getElementById("city").value;
    console.log(userSearch);
   
}

apiKey = '7b917ea8f42cc643cbf4f7763708048b';


  fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=' + apiKey)
  .then(response => response.json())
  .then(data => {
    console.log(data[0].lat);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  })
  .catch(error => console.error(error));

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));