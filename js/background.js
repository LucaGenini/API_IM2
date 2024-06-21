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

// Call getCityImage function inside getWeather function after setting currCity
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
            changeBackgroundImage(imageUrl);
        } else {
            console.error("No images found for this city.");
        }
    } catch (error) {
        console.error("Error occurred while fetching city image: ", error);
    }
}

function changeBackgroundImage(imageUrl) {
    const body = document.body;
    const transitionTime = 1000; // Transition time in milliseconds

    body.style.transition = `background-image ${transitionTime}ms ease-in-out, opacity ${transitionTime}ms ease-in-out`;
    body.style.opacity = 0;

    setTimeout(() => {
        body.style.backgroundImage = `url(${imageUrl})`;
        body.style.opacity = 1;
    }, transitionTime);
}
