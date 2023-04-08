var userInput = document.getElementById("text");
var submitButton = document.getElementById("weather-input");
var cityName = document.getElementById("city-name");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var cityList = document.getElementById("city-list");
var currentIcon = document.getElementById("current-icon");


submitButton.addEventListener("submit", getWeather);



function getWeather(event) {
    event.preventDefault();
    var userSearch = document.getElementById("city").value;
    console.log(userSearch);
   


apiKey = '7b917ea8f42cc643cbf4f7763708048b';


  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userSearch + '&limit=5&appid=' + apiKey)
  .then(response => response.json())
  .then(data => {
    // console.log(data[0].lat);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial')
  .then(response => response.json())
  .then(data => {console.log(data)
  var temp = data.list[0].main.temp;
  var tempRounded = temp.toFixed(2);
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity;
  var icon = data.list[0].weather[0].icon;
  
  console.log(temp);
  console.log(data.city.name);
  cityName.textContent = data.city.name;
  currentTemp.textContent = tempRounded;
  currentWind.textContent = wind;
  currentHumidity.textContent = humidity;
  currentIcon.src = "http://openweathermap.org/img/w/" + icon + ".png";

  var saveCity = document.createElement("button");
  saveCity.textContent = data.city.name;
  cityList.appendChild(saveCity);
  saveCity.setAttribute("id", saveCity.value);
  cityList.addEventListener("click", getWeather2);
})
  .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}
 
function getWeather2(event) {
    event.preventDefault();
    console.log(userSearch);
   


apiKey = '7b917ea8f42cc643cbf4f7763708048b';


  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userSearch + '&limit=5&appid=' + apiKey)
  .then(response => response.json())
  .then(data => {
    // console.log(data[0].lat);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial')
  .then(response => response.json())
  .then(data => {console.log(data)
  var temp = data.list[0].main.temp;
  var tempRounded = temp.toFixed(2);
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity;
  var icon = data.list[0].weather[0].icon;
  
  console.log(temp);
  console.log(data.city.name);
  cityName.textContent = data.city.name;
  currentTemp.textContent = tempRounded;
  currentWind.textContent = wind;
  currentHumidity.textContent = humidity;
  currentIcon.src = "http://openweathermap.org/img/w/" + icon + ".png";

  var saveCity = document.createElement("button");
  saveCity.textContent = data.city.name;
  cityList.appendChild(saveCity);
})
  .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}
