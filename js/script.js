let units = "metric";
let currCity = "Chur"; 

// Cache DOM elements
const cityElement = document.querySelector(".weathercity");
const datetimeElement = document.querySelector(".weatherdatetime");
const weatherforecastElement = document.querySelector('.weatherforecast');
const weathertemperatureElement = document.querySelector(".weathertemperature");
const weathericonElement = document.querySelector(".weathericon");
const weatherminmaxElement = document.querySelector(".weatherminmax");
const weatherrealfeelElement = document.querySelector('.weatherrealfeel');
const weatherhumidityElement = document.querySelector('.weatherhumidity');
const weatherwindElement = document.querySelector('.weatherwind');
const weatherpressureElement = document.querySelector('.weatherpressure');
const loadingMessage = document.getElementById('loadingMessage');
const suggestions = document.getElementById('suggestions');
const searchInput = document.getElementById('search');
const rainContainer = document.querySelector('.rain');

//Workaround for Firefox
function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
}

function showCustomAlert() {
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlertOverlay').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('customAlertOverlay').style.display = 'none';
    localStorage.setItem('alertShown', 'true');
    setTimeout(function() {
        location.reload();
    }, 5000);
}

// Check if the alert has been shown before
const alertShown = localStorage.getItem('alertShown');

// Show the custom alert only if the user is using Firefox and the alert hasn't been shown before
if (isFirefox() && !alertShown) {
    showCustomAlert();
}


//Waether Location tracking
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
                if (!loadingMessageHidden) {
                    alert("Ihr aktueller Standort ist deaktiviert");
                    loadingMessageHidden = true; // Set the flag to true
                }
            }, { timeout: 5000 }
        ); // Set a timeout of 5 seconds for geolocation request
        } else {
            resolve(currCity);
            alert("Geolocation wird nicht unterstützt von Ihrem Browser.");
            reject("Geolocation is not supported by this browser.");
        }
    });
}

//Weather API
let loadingMessageHidden = false;

async function getWeather(city) {
    const API_KEY = '38a5ab5231acac96fef7ddc955511a71';

    if (!loadingMessageHidden) {
        loadingMessage.style.display = 'block'; // Show the loading message
    }

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=de`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=de`)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await weatherResponse.json();
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
        alert("Fehler beim Abrufen der Wetterdaten.");
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

    const rainConditions = [
        "Leichter Regen", "Mäßiger Regen", "Starker Regen", "Extrem starker Regen",
        "Gefrierender Regen", "Leichter Regenschauer", "Regenschauer", "Starkregen",
        "Unregelmäßiger Regenschauer"
    ];

    // Update the DOM elements directly
    cityElement.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
    datetimeElement.innerHTML = convertTimeStamp(data.dt, data.timezone);
    weatherforecastElement.innerHTML = `<p>${data.weather[0].description}</p>`;
    weathertemperatureElement.innerHTML = `${data.main.temp.toFixed()}&#176`;
    weathericonElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
    weatherminmaxElement.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
    weatherrealfeelElement.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    weatherhumidityElement.innerHTML = `${data.main.humidity}%`;
    weatherwindElement.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
    weatherpressureElement.innerHTML = `${data.main.pressure} hPa`;

    // Check if the current weather description matches any of the rain conditions
    if (rainConditions.includes(data.weather[0].description)) {
        rainContainer.style.display = 'block'; // Show rain animation
    } else {
        rainContainer.style.display = 'none'; // Hide rain animation
    }
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

// Function to convert country code to country name
function convertCountryCode(code) {
    // You might want to use a mapping or an API to convert country codes to country names
    // This is a simple placeholder implementation
    const countryNames = {
        "DE": "Deutschland",
        // Add more country codes and names as needed
    };
    return countryNames[code] || code;
}


/*RAIN if its raining in a City*/
function createRaindrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    drop.style.opacity = Math.random();

    rainContainer.appendChild(drop);

    setTimeout(() => {
        drop.remove();
    }, 1000);
}

setInterval(createRaindrop, 20);



// convert country code to name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["de"], { type: "region" });
    return regionNames.of(country);
}

// search Suggestions
searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    if (query.length < 1) return; // Wait until the user has entered at least 1 character

    suggestions.innerHTML = ''; // Clear previous suggestions

    // Filter cityList for matches
    const matchedCities = cityList.filter(item => item.city.toLowerCase().startsWith(query));
    if (matchedCities.length > 0) {
        matchedCities.slice(0, 4).forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.city}, ${result.country}`;
            listItem.addEventListener('click', function () {
                // Set search box value and clear suggestions
                searchInput.value = result.city;
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
        });
    } else {
        // Fallback to Geoapify API if no matches found in cityList
        const apiKey = '471cc67340e241f6985fc6c31de9791f'; // Provided Geoapify API key
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&lang=de&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.features.forEach(feature => {
                    const city = feature.properties.city;
                    const country = feature.properties.country;

                    // Ensure the city matches the query exactly (considering accents and special characters)
                    if (city && country && city.toLowerCase().startsWith(query)) {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${city}, ${country}`;
                        listItem.addEventListener('click', function () {
                            // Set search box value and clear suggestions
                            searchInput.value = city;
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
    }
});

document.addEventListener('click', function (event) {
    const target = event.target;
    const isSearchInput = target.matches('#search');
    const isSuggestion = target.matches('#suggestions') || target.closest('#suggestions');

    if (!isSearchInput && !isSuggestion) {
        suggestions.innerHTML = ''; // Hide suggestions
    }
});

document.querySelector(".weathersearch").addEventListener('submit', e => {
    e.preventDefault(); // Prevent form submission

    currCity = searchInput.value;
    getWeather(currCity);
    searchInput.value = "";
});


//End of search suggestions


// units
document.querySelector(".toggle-checkbox").addEventListener('change', function () {
    units = this.checked ? "imperial" : "metric";
    // get weather forecast 
    getWeather(currCity);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    getLocation().then(getWeather).catch(error => console.error("An error occurred: ", error));
});



