/*Variables assigned to the HTML elements */
var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');

var lastCity = "";
var currentCity = "";

const submitCity = document.querySelector('submitCity')

let cityName = document.getElementById('city');



/*Function to retrieve the weather based off the searched for city */
function weather() {

    var apiRequest =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName.value +
    "&appid=15a2f6e975005b96c0df56340849949d&units=imperial";
  console.log(apiRequest);
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })

    .then(function (response) {
      console.log(response);
      saveCity(response.name);
      console.log(response.name);
      
      array.push(response.name);
      /*localStorage.setItem("cities", JSON.stringify(array));*/
      displayStorage();
      //document.getElementById("citiesList").innerHTML = JSON.parse(localStorage.getItem("cities"));
      //addEntry();
      gps(response.coord.lat, response.coord.lon);
    });
}


var saveCity = (newCity) => {
  let cityExists = false;
  // Check if City exists in local storage
  for (let i = 0; i < localStorage.length; i++) {
      if (localStorage["cities" + i] === newCity) {
          cityExists = true;
          break;
      }
  }
  // Save to localStorage if city is new
  if (cityExists === false) {
      localStorage.setItem('cities' + localStorage.length, newCity);
  }
}

var array = [];

/*Function to display the contents of local storage */
function displayStorage() {
  /*const searchedCities = JSON.parse(localStorage.getItem("cities"));*/
  document.getElementById("citiesList").innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const cardCity = document.createElement("button");
cardCity.classList.add("research")
    cardCity.textContent = localStorage.getItem("cities" + i);
    /*cardCity.textContent = searchedCities[i];*/ 
    document.getElementById("citiesList").append(cardCity);
  }
}


/*Gets the 5 day forecast */
  function gps(lat, lon) {
    var apiRequest =
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
      lat +
      '&lon=' +
      lon +
      '&exclude=minutely,hourly,alerts&appid=15a2f6e975005b96c0df56340849949d&units=imperial';
      fetch(apiRequest)
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {
        console.log(response)
        displayWeather(response)
      });
  }

var eventEl = document.getElementById('events-container');
var eightDay = document.getElementById('dailyForecast');
var responseText = document.getElementById('responseText');


/*Function to display the weather conditions on the age by dynamically creating elements */
function displayWeather(response) {

  const eventsContainer = document.getElementById("Events")
  eventsContainer.textContent = "";
  
  for (var i = 1; i < 6; i++) {

    /*5d weather conditions variables */
    var date = response.daily[i].dt;
    var newDate = new Date(date * 1000);
    const formatDate = newDate.toLocaleDateString("en-US");
    const date2 = moment(formatDate, 'ddd, DD MMM YYYY HH:MM:SS').format('M/d/yyyy')

    eightDay = response.daily[i].weather[0].main;


const temp = response.daily[i].temp.day
const wind = response.daily[i].wind_speed
const humidity = response.daily[i].humidity
const icon = response.daily[i].weather[0].icon;


/*Create the elements for the 5D variables */
const cardContainer = document.createElement("div");
const cardDate = document.createElement("p");
cardDate.id = ("fiveDayDate");
const cardTemp = document.createElement("p");
const cardWind = document.createElement("p");
const cardHumidity = document.createElement("p");
const cardIcon = document.createElement("IMG");


/* Setting the data to the 5D cards */
cardDate.textContent = formatDate;
cardIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png"
cardTemp.textContent = "Temp: " + temp + "°F";
cardWind.textContent = "Wind: " + wind + " MPH";
cardHumidity.textContent = "Humidity: " + humidity + " %";


/*Adding the 5D cards to the container */
cardContainer.append(cardDate);
cardContainer.append(cardIcon);
cardContainer.append(cardTemp);
cardContainer.append(cardWind);
cardContainer.append(cardHumidity);

eventsContainer.append(cardContainer);
  }


  /*Creating the container for the current weather */
  const currentContainer = document.getElementById("Current")
  currentContainer.textContent = "";

  for (var i = 0; i < 1; i++) {

/*Current Weather conditions variables */

const currentTemp = response.current.temp
const currentWind = response.current.wind_speed
const currentHumidity = response.current.humidity
const currentIcon = response.current.weather[0].icon;
const currentUvi = response.current.uvi;
const currentName = cityName.value;

var date3 = response.current.dt;
var newDate3 = new Date(date3 * 1000);
const formatDate3 = newDate3.toLocaleDateString("en-US");


/*Create the elements for the current variables */
const currentCardContainer = document.createElement("div");
const currentCardDate = document.createElement("p");
currentCardDate.id = "new22"; 
const currentCardTemp = document.createElement("p");
const currentCardWind = document.createElement("p");
const currentCardHumidity = document.createElement("p");
const currentCardIcon = document.createElement("IMG");
const currentCardUvi = document.createElement("p");
const currentCardName = document.createElement("p");


/* Setting the data to the current cards */
currentCardDate.textContent = currentName + " (" + formatDate3 + ")";
currentCardIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
currentCardTemp.textContent = "Temp: " + currentTemp + "°F";
currentCardWind.textContent = "Wind: " + currentWind + " MPH";
currentCardHumidity.textContent = "Humidity: " + currentHumidity + " %";
/*currentCardName.textContent = currentName;*/
currentCardUvi.textContent = "UV Index: " + currentUvi;


/*Adding the current cards to the container */
/*currentCardContainer.append(currentCardName);*/
currentCardContainer.append(currentCardDate);
currentCardContainer.append(currentCardIcon);
currentCardContainer.append(currentCardTemp);
currentCardContainer.append(currentCardWind);
currentCardContainer.append(currentCardHumidity);
currentCardContainer.append(currentCardUvi);

currentContainer.append(currentCardContainer);


/* If statement for setting the background color for the UVI*/
if (currentUvi < 4 ) {
  currentCardUvi.id = "favorable";
} else if (currentUvi < 8) {
  currentCardUvi.id = "moderate";
} else {
  currentCardUvi.id =  "severe";
}


  }

}

/* Event listener to run the weather function when a city is searched for*/
  document.getElementById("submitCity").addEventListener("click", weather);

  /*Adds event listener to listen the entire time in case a research button is clicked, if clicked run the weather function */
    document.addEventListener("click", function(event) {
      event.preventDefault() 
      if (event.target.className === "research") {
        cityName.value = event.target.textContent;
        weather();
      }
    });
 


  
 