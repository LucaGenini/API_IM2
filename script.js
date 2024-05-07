let suche = document.querySelector('#suche');
let anzeige = document.querySelector('#anzeige');


async function holeDaten(url) {
    try {
        // wenn daten geladen werden können//
        let data = await fetch(url);
        return await data.json();
    } catch (e) {
        // wenn ein Fehler auftritt//
        console.error(e);
    }
}
let cocktailDaten = await holeDaten("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
console.log(cocktailDaten);

function datenDaarstellen(cocktails) {
    anzeige.innerHTML = "";
    cocktails.forEach(cocktail => {
        let div = document.createElement('div');
        let image = document.createElement('img');
        image.src = cocktail.strDrinkThumb;
        let title = document.createElement('h2');
        title.innerText = cocktail.strDrink;
        div.appendChild(title);
        div.appendChild(image);
        anzeige.appendChild(div);
    });
}
datenDaarstellen(cocktailDaten.drinks);
suche.addEventListener('input', async function () {
    let ergebnis = suche.value;
    let searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + ergebnis;
    console.log(ergebnis);
    let cocktails_aus_suche = await holeDaten(searchUrl);
    console.log(cocktails_aus_suche);
    datenDaarstellen(cocktails_aus_suche.drinks);
    console.log(cocktails_aus_suche);

})