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

container2.style.visibility = "hidden";

submitButton.addEventListener("submit", getWeather, getWeather2);



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
  var date = data.list[0].dt_txt;
  
  console.log(temp);
  console.log(data.city.name);
  console.log(date);
  cityName.textContent = data.city.name;
  currentDate.textContent = date;
  currentTemp.textContent = tempRounded;
  currentWind.textContent = wind;
  currentHumidity.textContent = humidity;
  currentIcon.src = "http://openweathermap.org/img/w/" + icon + ".png";

  container2.style.visibility = "visible";

  var saveCity = document.createElement("button");
  saveCity.textContent = data.city.name;
  cityList.appendChild(saveCity);
  saveCity.setAttribute("id", saveCity.value);
//   cityList.addEventListener("click", getWeather2);
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
   for (var i = 1; i < 6; i++) {
    var latitude = data[i].lat;
    var longitude = data[i].lon;
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial')
  .then(response => response.json())
  .then(data => {console.log(data)
  var tempI = data.list[i].main.temp;
  var tempRoundedI = temp.toFixed(2);
  var windI = data.list[i].wind.speed;
  var humidityI = data.list[i].main.humidity;
  var iconI = data.list[i].weather[i].icon;
  
  
  console.log(tempI);
  console.log(data.city.name);
  cityName.textContent = data.city.name;

  currentTemp.textContent = tempRoundedI;
  currentWind.textContent = windI;
  currentHumidity.textContent = humidityI;
  currentIcon.src = "http://openweathermap.org/img/w/" + iconI + ".png";

})}
//   .catch(error => console.error(error));
//   })
//   .catch(error => console.error(error));
})}
