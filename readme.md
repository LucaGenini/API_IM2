# WEBSITE_URL
[706575-3.web.fhgr.ch](https://706575-3.web.fhgr.ch/)

# Verwendete API's: 
- Weather info https://openweathermap.com
- Current Location Info https://api.bigdatacloud.net/
- Background images of designated citiies https://api.pexels.com
- Search suggestions https:///api.geoapify.com

# Prozessdokumentation

## Features
Die Webseite kann sowohl das Wetter ders eigenen Standorts als auch das einer in das Suchfeld eingegebenen Location anzeigen. Wenn der User die Ortungsdienste ausgeschaltet sind hat, wird standardmässig der Standort Chur verwendet. (Für das Umwandeln der Ortungsdaten von Llatitude und Longitude in eine Stadt wird bigdatacloud.net API verwendet). Um die Wetterdaten grafisch ansprechend darzustellen, wird das Hintergrundbild mithilfe einer der Pexels API an die jeweilige Location angepasst.
Man kann zwischen Farenheit und Celsius auswählen. 
Beim Klicken auf das Suchfeld werden spezifische Vorschläge angezeigt. Um relevantere Städte zuerst anzuzeigen, statt alphabetisch geordnete, wurde eine Liste(Array) mit wichtigen Städten erstellt.So kommt beim Eintippen von z.B. "New" zuerst "New York, USA", statt "New Abirem, Ghana", vorgeschlagen. (Siehe Details unten Bei JavaScript citylist.js) Falls die Stadt nicht in der citylist.js gespeichert ist, wird die API von https://api.geoapify.com verwendet, die im script.js zu finden ist.

-Die Seite wurde für Desktop und Mobile optimiert und ist responsive.
-Code wurde W3 validiert. Keine Fehler, eine Warnung beim h1, die aber bewusst ignoriert werden kann, da der h1 Text vom JavaScript aus eingefügt wird.

## Erklärung der einzelnen Dateien (wichtig)

### CSS:
- variables.css = alle Standartfraben, die mehrmals verwendet werden

- preset.css = alle css code Schnipsel die auf der About Page und auf der Hompepage werwendet werden

- buffer.css = "Ihr Standort wird aktualsiert" Animation

- style.css = CSS für Homepage

### JavaScript:
- script.js = Hauptscript für Homepage

- citylist.js = Um zuerst relevante Städte zu zeigen statt alphabetisch mit der API (Also das beim Eintippen von z.B. New zuerst New York, USA als Vorschlag kommt, statt New Abirem, Ghana) wurde eine Liste mit relevanten Städten gemacht -->Falls die Stadt nicht in der citylist.js gespeichert ist, wird die https:///api.geoapify.com angesteuert, welche im script.js auffindbar ist

- background.js = Sich nach Stadt wechselndes Hintergrundbild, API https://api.pexels.com


# Learnings
- Mit nur einem Computer arbeiten, da es bei der Arbeit mit verschiedenen Computern und dem Upload auf GitHub zu einem Durcheinander kommt.
- Optimierung von JavaScript: Je mehr JavaScript verwendet wird, desto langsamer lädt die Webseite.

# Pains
- Für das Projekt wurden vier verschiedene APIs verwendet, die alle miteinander kommunizieren müssen. Die Herstellung der Kommunikation zwischen den APIs war eine Herausforderung.
- Während alle Dateien auf Chrome, Edge und Safari reiblunglos laufen, brauchte Firefox immer eine Sonderbehandlung und einen Work-Around um zu funktionieren.

# KI-Einsatz
- Zum Erstellen der HTML-, CSS- und JavaScript-Dateien, für Empfehlungen von kostenlosen APIs, das Auslesen der Daten via API sowie das Optimieren und Korrigieren von Code wurden ChatGPT 4o (chatgpt.com), GitHub CoPilot (github.com/features/copilot) und Google Gemini (gemini.google.com) verwendet. Der Code wurde manuell bearbeitet, korrigiert und optimiert.

# Externe Quellen
- Es wurden teilweise Codefragmente von dieser Wetter-App verwendet sowie Inspiration vom Design dieser Wetter-Applikation genommen: https://codepen.io/gbopola/pen/gOdKqqr
- Es wurde mit https://www.w3schools.com/ und https://developer.mozilla.org/ gearbeitet; dabei wurden Code-Elemente davon verwendet, nachgeschlagen und implementiert.
- Die "Ihr Standort wird aktualisiert" Animation stammt von https://loading.io/css/
- Schriften von Adobe Fonts
- Icons Google Icons, OpenWeather Icons 