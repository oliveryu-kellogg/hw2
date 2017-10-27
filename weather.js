let getWeather = function(info) {
  // console.info(info)
  let latitude = info.coords.latitude.toFixed(4);
  let longitude = info.coords.longitude.toFixed(4);
  console.log("Your current position is: ");
  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);

  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

let convertToJSON = function(response) {
  return response.json();
}

let updateWeather = function(dataFromService) {
  iconElement = document.querySelector('#weather img');
  iconUrl = "http://openweathermap.org/img/w/" + dataFromService.weather[0].icon + ".png";
  iconElement.src = iconUrl

  document.querySelector("#weather h4").innerHTML = dataFromService.name;
  document.querySelector("#weather a").innerHTML = dataFromService.main.temp.toFixed(0)
}

let link = document.getElementById("get_forecast")
link.addEventListener("click", function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
  // console.debug(event);
})

let displayError = function(error) {
  // console.debug(error);
  window.alert("Sorry, something went wrong.");
}
