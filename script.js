let units = "metric";
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
                        let currCity = data.locality;
                        resolve(currCity);
                    })
                    .catch(error => {
                        console.error("Error occurred while getting location: ", error);
                        reject(error);
                    });
            }, error => {
                resolve("Chur");
                alert("Ihr aktueller Standort ist deaktiviert" );
                console.error("Error occurred while getting location: ", error);
                
            });
        } else {
            resolve("Chur");
            alert("Geolocation wird nicht unterstützt von Ihrem Browser.");
            reject("Geolocation is not supported by this browser.");
        }
    });
}
//Weather//
async function getWeather(city) {
    const API_KEY = '38a5ab5231acac96fef7ddc955511a71';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=de`);
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert("Error occurred while fetching weather data");
        console.error("Error occurred while fetching weather data: ", error);
    }
}

function updateWeather(data) {
    // Selectors
    let city = document.querySelector(".weather__city");
    let datetime = document.querySelector(".weather__datetime");
    let weather__forecast = document.querySelector('.weather__forecast');
    let weather__temperature = document.querySelector(".weather__temperature");
    let weather__icon = document.querySelector(".weather__icon");
    let weather__minmax = document.querySelector(".weather__minmax");
    let weather__realfeel = document.querySelector('.weather__realfeel');
    let weather__humidity = document.querySelector('.weather__humidity');
    let weather__wind = document.querySelector('.weather__wind');
    let weather__pressure = document.querySelector('.weather__pressure');

    console.log(data);
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`;
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
    weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    weather__humidity.innerHTML = `${data.main.humidity}%`;
    weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
    weather__pressure.innerHTML = `${data.main.pressure} hPa`;
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
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    let currCity = search.value;
    // get weather forecast 
    getWeather(currCity);
    // clear form
    search.value = "";
});

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        // change to metric
        units = "metric";
        // get weather forecast 
        getLocation().then(getWeather);
    }
});

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        // change to imperial
        units = "imperial";
        // get weather forecast 
        getLocation().then(getWeather);
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    getLocation().then(getWeather).catch(error => console.error("An error occurred: ", error));
});


// Rainfall

const rainContainer = document.querySelector('.rain');

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