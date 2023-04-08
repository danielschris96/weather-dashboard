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

submitButton.addEventListener("submit", getWeather);

    apiKey = '7b917ea8f42cc643cbf4f7763708048b';

function getWeather(event) {
    event.preventDefault();
    var userSearch = document.getElementById("city").value;
    console.log(userSearch);

  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userSearch + '&limit=5&appid=' + apiKey)
  .then(response => response.json())
  .then(data => {
    // console.log(data[0].lat);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=imperial')
  .then(response => response.json())
  .then(data => {console.log(data)

    container2.style.visibility = "visible";

    var saveCity = document.createElement("button");
    saveCity.textContent = data.city.name;
    cityList.appendChild(saveCity);
    saveCity.setAttribute("id", saveCity.value);



   for (var i of [0, 7, 15, 23, 31, 39]) {
    var tempI = data.list[i].main.temp;
    var tempRoundedI = tempI.toFixed(2);
    var windI = data.list[i].wind.speed;
    var humidityI = data.list[i].main.humidity;
    var iconI = data.list[i].weather[0].icon;
    var dateI = data.list[i].dt_txt;
    
    
    console.log(tempI);
    console.log(data.city.name);

    document.getElementById('city-name' + i).textContent = data.city.name;
    document.getElementById('date' + i).textContent = dateI;
    document.getElementById('icon' + i).src = "http://openweathermap.org/img/w/" + iconI + ".png";
    document.getElementById('temp' + i).textContent = tempRoundedI;
    document.getElementById('wind' + i).textContent = windI;
    document.getElementById('humidity' + i).textContent = humidityI;

    localStorage.setItem("cityName" + i, data.city.name);
    localStorage.setItem("date" + i, dateI);
    localStorage.setItem("icon" + i, iconI);
    localStorage.setItem("temp" + i, tempRoundedI);
    localStorage.setItem("wind" + i, windI);
    localStorage.setItem("humidity" + i, humidityI);

}
})
  .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}
 
