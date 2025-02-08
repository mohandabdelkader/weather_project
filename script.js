var listItem = document.querySelectorAll('.list li');
var one = document.querySelector('.one');
var two = document.querySelector('.two');
var three = document.querySelector('.three');
var inputSearch = document.getElementById('inputSearch');
var btn = document.getElementById('btn');
// url api
var apiKey = 'ac6a1689bc114f63a65161630250502';
var baseurl = 'http://api.weatherapi.com/v1';

// btn active
for (let i = 0; i < listItem.length; i++) {
	listItem[i].addEventListener('click', function () {
		for (let i = 0; i < listItem.length; i++) {
			listItem[i].classList.remove('active');
		}
		listItem[i].classList.add('active');
	});
}

var listWeatherForecast;

function getDayName(dateString) {
	var appendDateName = new Date(dateString);
	return appendDateName.toLocaleDateString('en-us', { weekday: 'long' });
}
function getDayNumber(dateNumber) {
	var appendDateNumber = new Date(dateNumber);
	return appendDateNumber.getDate();
}

async function getWeather(endPoint = 'cairo') {
	try {
		var response = await fetch(`${baseurl}/forecast.json?key=${apiKey}&q=${endPoint}&days=5`);

		var listWeather = await response.json();
		if (listWeather.error) {
			throw new Error(listWeather.error.message);
		}
		console.log(listWeather);

		var cityName = listWeather.location.name;
		listWeatherForecast = listWeather.forecast.forecastday;
		console.log(listWeather);

		displayWeather(cityName);
	} catch (error) {
		displayError(error.message);
	}
}

function displayError(message) {
	var element = [one, two, three];
	for (let i = 0; i < element.length; i++) {
		element[i].innerHTML = `<p style="color: red;">❌ ${message}</p>`;
	}
}

function displayWeather(cityName) {
	var element = [one, two, three];
	for (let i = 0; i < element.length; i++) {
		element[i].innerHTML = `
<h5>${getDayName(listWeatherForecast[i].date)}</h5>
<h5>${getDayNumber(listWeatherForecast[i].date)}</h5>

		<hr />
		<p>${cityName}</p>
		<h2>${listWeatherForecast[i].day.avgtemp_c}°C</h2>
		<img src="https:${listWeatherForecast[i].day.condition.icon}" alt="${listWeatherForecast[0].day.condition.text}" />
		<p>${listWeatherForecast[i].day.condition.text}</p>
	`;
	}
}

function search() {
	btn.addEventListener('click', function () {
		startApp(inputSearch.value);
		console.log(inputSearch.value);
	});
}

async function startApp(endPoint) {
	await getWeather(endPoint);
}
startApp(inputSearch.value || 'cairo');
search();
