let units = "metric";
let currCity = ""; // Define currCity as a global variable

//Location GPS//
async function getLocation() {
    return new Promise((resolve, reject) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                // Use a reverse geocoding API to get the city name
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=de`)
                    .then(response => response.json())
                    .then(data => {
                        // Set the current city to the city name from the geocoding data
                        currCity = data.locality;
                        resolve(currCity);
                    })
                    .catch(error => {
                        console.error("Error occurred while getting location: ", error);
                        reject(error);
                    });
            }, error => {
                currCity = "Chur";
                resolve(currCity);
                alert("Ihr aktueller Standort ist deaktiviert");
                console.error("Error occurred while getting location: ", error);
            });
        } else {
            currCity = "Chur";
            resolve(currCity);
            alert("Geolocation wird nicht unterstützt von Ihrem Browser.");
            reject("Geolocation is not supported by this browser.");
        }
    });
}

//Weather////Weather//
let loadingMessageHidden = false;

async function getWeather(city) {
    const API_KEY = '38a5ab5231acac96fef7ddc955511a71';
    const loadingMessage = document.getElementById('loadingMessage');

    if (!loadingMessageHidden) {
        loadingMessage.style.display = 'block'; // Show the loading message
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=de`);
        const data = await response.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=de`);
        const forecastData = await forecastResponse.json();

        loadingMessage.style.display = 'none'; // Hide the loading message
        loadingMessageHidden = true; // Set the flag to true

        updateWeather(data);
        updateForecast(forecastData);
    } catch (error) {
        console.error("Error occurred while fetching weather data: ", error);
        if (!loadingMessageHidden) {
            loadingMessage.style.display = 'none'; // Hide the loading message if it is still visible
            loadingMessageHidden = true; // Set the flag to true
        }
    }
}

function updateForecast(forecastData) {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    const days = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    days.forEach(day => {
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p>${new Date(day.dt_txt).toLocaleDateString('de', { weekday: 'long' })}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
            <p>${day.main.temp.toFixed(1)}&#176; ${units === "imperial" ? "F" : "C"}</p>
            <p>${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(card);
    });
}

function updateWeather(data) {
    // Selectors
    let city = document.querySelector(".weathercity");
    let datetime = document.querySelector(".weatherdatetime");
    let weatherforecast = document.querySelector('.weatherforecast');
    let weathertemperature = document.querySelector(".weathertemperature");
    let weathericon = document.querySelector(".weathericon");
    let weatherminmax = document.querySelector(".weatherminmax");
    let weatherrealfeel = document.querySelector('.weatherrealfeel');
    let weatherhumidity = document.querySelector('.weatherhumidity');
    let weatherwind = document.querySelector('.weatherwind');
    let weatherpressure = document.querySelector('.weatherpressure');

    console.log(data);
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
    weatherforecast.innerHTML = `<p>${data.weather[0].main}`;
    weathertemperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
    weathericon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
    weatherminmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
    weatherrealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    weatherhumidity.innerHTML = `${data.main.humidity}%`;
    weatherwind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
    weatherpressure.innerHTML = `${data.main.pressure} hPa`;
}

function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return date.toLocaleString("de", options);
}

// convert country code to name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["de"], { type: "region" });
    return regionNames.of(country);
}

// search
document.getElementById('search').addEventListener('input', function() {
    const query = this.value;
    if (query.length < 0) return; // Wait until the user has entered at least 1 character

    const apiKey = '471cc67340e241f6985fc6c31de9791f'; // Provided Geoapify API key
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&lang=de&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const suggestions = document.getElementById('suggestions');
            suggestions.innerHTML = ''; // Clear previous suggestions

            data.features.forEach(feature => {
                if (feature.properties.city) {
                    const listItem = document.createElement('li');
                    listItem.textContent = feature.properties.city;
                    listItem.addEventListener('click', function() {
                        // Set search box value and clear suggestions
                        document.getElementById('search').value = feature.properties.city;
                        suggestions.innerHTML = ''; 

                        // Trigger form submission
                        const form = document.querySelector(".weathersearch");
                        const event = new MouseEvent('submit', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        form.dispatchEvent(event);
                    });
                    suggestions.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error:', error));
});

document.querySelector(".weathersearch").addEventListener('submit', e => {
    e.preventDefault(); // Prevent form submission

    currCity = document.getElementById('search').value;
    getWeather(currCity);
    document.getElementById('search').value = "";
});

// units
document.querySelector(".toggle-checkbox").addEventListener('change', function() {
    if (this.checked) {
        units = "imperial";
    } else {
        units = "metric";
    }
    // get weather forecast 
    getWeather(currCity);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    getLocation().then(getWeather).catch(error => console.error("An error occurred: ", error));
});

