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
