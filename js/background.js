// Rainfall

//Background Images Swap
const PEXELS_API_KEY = 'ikbT8rilOGWCIEeSwTOQ4rgf88h67Uss4OSJi6y9xfiiTuU14mM4wssB';

async function getCityImage(city) {
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.original;
            
            // Create a new image element to preload the image
            const img = new Image();
            img.src = imageUrl;

            // Once the image is loaded, set it as the background image
            img.onload = () => {
                document.body.style.backgroundImage = `url(${imageUrl})`;
                document.body.style.backgroundSize = 'cover';
            };
        } else {
            console.error("No images found for this city.");
            document.body.style.backgroundImage = "url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg')";
            document.body.style.backgroundSize = 'cover';
        }
    } catch (error) {
        console.error("Error occurred while fetching city image: ", error);
    }
}

// Call getCityImage function inside getWeather function after setting currCity
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

        const data = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        loadingMessage.style.display = 'none'; // Hide the loading message
        loadingMessageHidden = true; // Set the flag to true

        updateWeather(data);
        updateForecast(forecastData);
        
        // Update city background image
        await getCityImage(city);
        
        // Overblend the old background picture
        document.body.style.backgroundBlendMode = 'overlay';
    } catch (error) {
        console.error("Error occurred while fetching weather data: ", error);
        if (!loadingMessageHidden) {
            loadingMessage.style.display = 'none'; // Hide the loading message if it is still visible
            loadingMessageHidden = true; // Set the flag to true
        }
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    getLocation().then(city => {
        getWeather(city);
    }).catch(error => console.error("An error occurred: ", error));
});

// Ensure getCityImage only loads after all other JavaScript has loaded
window.addEventListener('load', () => {
    getLocation().then(city => {
        getCityImage(city); // Initial background image load
    }).catch(error => console.error("An error occurred: ", error));
});
