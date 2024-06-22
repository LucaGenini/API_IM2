# WEBSITE_URL
706575-3.web.fhgr.ch

# Verwendete API's: 
- Weather info https://openweathermap.com
- Current Location Info https://api.bigdatacloud.net/
- Background images of designated citiies https://api.pexels.com
- Search suggestions https:///api.geoapify.com

# Prozessdokumentation

## Features
Die Webseite kann... (Timos Text)


## Erklärung der einzelnen Dateien (wichtig)

### CSS:
- variables.css = alle Standartfraben, die mehrmals verwendet werden

- preset.css = alle css code Schnipsel die auf der About Page und auf der Hompepage werwendet werden

- buffer.css = "Ihr Standort wird aktualsiert" Animation

- style.css = CSS für Homepage

### JavaScript:
- script.js = Hauptscript für Homepage

- citiylist.js = Um zuerst relevante Städte zu zeigen statt alphabetisch mit der API (Also das beim Eintippen von z.B. New zuerst New York, USA als Vorschlag kommt, statt New Abirem, Ghana) wurde eine Liste mit relvanten Städten gemacht -->Falls die Stadt nicht in der citiylist.js gespeichert ist, wird die https:///api.geoapify.com angesteuert, welche im script.js auffindbar ist

- background.js = Sich nach Stadt wechselndes Hintergrundbild, API https://api.pexels.com


# Learnings
- Mit nur einem Computer arbeiten, da es bei der Arbeit mit verschiedenen Computern und dem Upload auf GitHub zu einem Durcheinander kommt.
- Optimierung von JavaScript: Je mehr JavaScript verwendet wird, desto langsamer lädt die Webseite.

# Pains
- Für das Projekt wurden vier verschiedene APIs verwendet, die alle miteinander kommunizieren müssen. Die Herstellung der Kommunikation zwischen den APIs war eine Herausforderung.

# KI-Einsatz
- Zum Erstellen der HTML-, CSS- und JavaScript-Dateien, für Empfehlungen von kostenlosen APIs, das Auslesen der Daten via API sowie das Optimieren und Korrigieren von Code wurden ChatGPT 4o (chatgpt.com), GitHub CoPilot (github.com/features/copilot) und Google Gemini (gemini.google.com) verwendet. Der Code wurde manuell bearbeitet, korrigiert und optimiert.

# Externe Quellen
- Es wurden teilweise Codefragmente von dieser Wetter-App verwendet sowie Inspiration vom Design dieser Wetter-Applikation genommen: https://codepen.io/gbopola/pen/gOdKqqr
- Es wurde mit https://www.w3schools.com/ und https://developer.mozilla.org/ gearbeitet; dabei wurden Code-Elemente davon verwendet, nachgeschlagen und implementiert.
- Die "Ihr Standort wird aktualisiert" Animation stammt von https://loading.io/css/