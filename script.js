var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
/*var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');*/
var cityName = document.getElementById("city");




var eventEl = document.getElementById('events-container');
var eightDay = document.getElementById('dailyForecast');
var responseText = document.getElementById('responseText');
function displayWeather(response) {
  const eventsContainer = document.getElementById("Events")
  eventsContainer.textContent = "";
  for (var i = 0; i < response.length; i++) {
    var date = response[i].dt;
    var newDate = new Date(date * 1000);
    iconCode = response[i].weather[0].icon;
    eightDay = response[i].weather[0].main;


const temp = response.data[i].temp.day
const wind = response.data[i].wind_speed
const humidity = response.data[i].humidity


const cardContainer = document.createElement("div");
const cardTemp = document.createElement("p");
const cardWind = document.createElement("p");
const cardHumidity = document.createElement("p");


cardTemp.textContent = temp;
cardWind.textContent = wind;
cardHumidity.textContent = humidity;


cardContainer.append(cardWind);
cardContainer.append(cardTemp);
cardContainer,append(cardHumidity);


eventsContainer.append(cardContainer);


/*

    morningTemp = Math.round(data[i].temp.morn);
    eveTemp = Math.round(data[i].temp.eve);

    var weatherContainer = document.createElement('contianer');
    document.getElementById('date').appendChild(weatherContainer);
    weatherContainer.setAttribute('class', 'weatherCard');

    var wCard = document.createElement('div');
    wCard.textContent = newDate;
    weatherContainer.appendChild(wCard);
    wCard.setAttribute('class', 'date');

    var weatherIcon = document.createElement('img');
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + iconCode + '.png';
    document.getElementById('date').appendChild(weatherIcon);
    weatherIcon.setAttribute('class', 'wImage');

    var conditions = document.createElement('div');
    conditions.textContent = eightDay;
    document.getElementById('date').appendChild(conditions);
    conditions.setAttribute('class', 'wConditions');

    var temp = document.createElement('div');
    temp.textContent = 'Temp: ' + morningTemp;
    document.getElementById('date').appendChild(amTemp);
    amTemp.setAttribute('class', 'earlyTemp');

    var pmTemp = document.createElement('div');
    pmTemp.textContent = 'Evening Temperature: ' + eveTemp;
    document.getElementById('date').appendChild(pmTemp);
    pmTemp.setAttribute('class', 'eveTemp');
    console.log(newDate, weatherIcon, eightDay, morningTemp, eveTemp);*/
  }
}

function weather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
  inputValue.value +
  '&appid=15a2f6e975005b96c0df56340849949d&units=imperial')
  .then(response => response.json())
  .then(data => console.log(data))
  
  .catch(err => alert("Wrong City"))
}

button.addEventListener('click', weather);

  function weather() {
      var URL =
        'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + 
        'seattle&appid=15a2f6e975005b96c0df56340849949d&units=imperial';
      console.log(URL);
      fetch(URL)
        .then(function (res) {
          return res.json();
        })
        .then(function (response) {
          console.log(response);
          console.log(response.name);
          gps(response.coord.lat, response.coord.lon);
        });
    }

function gps(lat, long) {
  var apiRequest =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    long +
    '&exclude=minutely,hourly,alerts&appid=15a2f6e975005b96c0df56340849949d&units=imperial';
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      console.log(response);
      displayWeather(response.daily);
    });
}
/*document.getElementById('submitCity').addEventListener('click', getWeather);*/

