const cityList = [
    { city: "Zürich", country: "Schweiz" },
    { city: "Genf", country: "Schweiz" },
    { city: "Basel", country: "Schweiz" },
    { city: "Bern", country: "Schweiz" },
    { city: "Luzern", country: "Schweiz" },
    { city: "Lausanne", country: "Schweiz" },
    { city: "Winterthur", country: "Schweiz" },
    { city: "St. Gallen", country: "Schweiz" },
    { city: "Lugano", country: "Schweiz" },
    { city: "Biel/Bienne", country: "Schweiz" },
    { city: "Thun", country: "Schweiz" },
    { city: "Köniz", country: "Schweiz" },
    { city: "La Chaux-de-Fonds", country: "Schweiz" },
    { city: "Fribourg", country: "Schweiz" },
    { city: "Schaffhausen", country: "Schweiz" },
    { city: "Chur", country: "Schweiz" },
    { city: "Neuchâtel", country: "Schweiz" },
    { city: "Vernier", country: "Schweiz" },
    { city: "Sion", country: "Schweiz" },
    { city: "Aarau", country: "Schweiz" },
    { city: "Grenchen", country: "Schweiz" },
    { city: "Uster", country: "Schweiz" },
    { city: "Zug", country: "Schweiz" },
    { city: "New York", country: "USA" },
    { city: "Los Angeles", country: "USA" },
    { city: "Chicago", country: "USA" },
    { city: "Houston", country: "USA" },
    { city: "Phoenix", country: "USA" },
    { city: "Philadelphia", country: "USA" },
    { city: "San Antonio", country: "USA" },
    { city: "San Diego", country: "USA" },
    { city: "Dallas", country: "USA" },
    { city: "San Jose", country: "USA" },
    { city: "Austin", country: "USA" },
    { city: "Jacksonville", country: "USA" },
    { city: "Fort Worth", country: "USA" },
    { city: "Columbus", country: "USA" },
    { city: "Charlotte", country: "USA" },
    { city: "San Francisco", country: "USA" },
    { city: "Indianapolis", country: "USA" },
    { city: "Seattle", country: "USA" },
    { city: "Denver", country: "USA" },
    { city: "Washington", country: "USA" },
    { city: "Boston", country: "USA" },
    { city: "El Paso", country: "USA" },
    { city: "Nashville", country: "USA" },
    { city: "Detroit", country: "USA" },
    { city: "Oklahoma City", country: "USA" },
    { city: "Portland", country: "USA" },
    { city: "Las Vegas", country: "USA" },
    { city: "Memphis", country: "USA" },
    { city: "Louisville", country: "USA" },
    { city: "Baltimore", country: "USA" },
    { city: "Milwaukee", country: "USA" },
    { city: "Albuquerque", country: "USA" },
    { city: "Tucson", country: "USA" },
    { city: "Fresno", country: "USA" },
    { city: "Sacramento", country: "USA" },
    { city: "Kansas City", country: "USA" },
    { city: "Mesa", country: "USA" },
    { city: "Atlanta", country: "USA" },
    { city: "Omaha", country: "USA" },
    { city: "Colorado Springs", country: "USA" },
    { city: "Raleigh", country: "USA" },
    { city: "Miami", country: "USA" },
    { city: "Long Beach", country: "USA" },
    { city: "Virginia Beach", country: "USA" },
    { city: "Oakland", country: "USA" },
    { city: "Minneapolis", country: "USA" },
    { city: "Tulsa", country: "USA" },
    { city: "Arlington", country: "USA" },
    { city: "Tampa", country: "USA" },
    { city: "New Orleans", country: "USA" },
    { city: "Wichita", country: "USA" },
    { city: "London", country: "Vereinigtes Königreich" },
    { city: "Birmingham", country: "Vereinigtes Königreich" },
    { city: "Leeds", country: "Vereinigtes Königreich" },
    { city: "Glasgow", country: "Vereinigtes Königreich" },
    { city: "Sheffield", country: "Vereinigtes Königreich" },
    { city: "Manchester", country: "Vereinigtes Königreich" },
    { city: "Edinburgh", country: "Vereinigtes Königreich" },
    { city: "Liverpool", country: "Vereinigtes Königreich" },
    { city: "Bristol", country: "Vereinigtes Königreich" },
    { city: "Paris", country: "Frankreich" },
    { city: "Marseille", country: "Frankreich" },
    { city: "Lyon", country: "Frankreich" },
    { city: "Toulouse", country: "Frankreich" },
    { city: "Nice", country: "Frankreich" },
    { city: "Nantes", country: "Frankreich" },
    { city: "Strasbourg", country: "Frankreich" },
    { city: "Montpellier", country: "Frankreich" },
    { city: "Bordeaux", country: "Frankreich" },
    { city: "Berlin", country: "Deutschland" },
    { city: "Hamburg", country: "Deutschland" },
    { city: "München", country: "Deutschland" },
    { city: "Köln", country: "Deutschland" },
    { city: "Frankfurt am Main", country: "Deutschland" },
    { city: "Stuttgart", country: "Deutschland" },
    { city: "Düsseldorf", country: "Deutschland" },
    { city: "Dortmund", country: "Deutschland" },
    { city: "Essen", country: "Deutschland" },
    { city: "Leipzig", country: "Deutschland" },
    { city: "Bremen", country: "Deutschland" },
    { city: "Dresden", country: "Deutschland" },
    { city: "Hannover", country: "Deutschland" },
    { city: "Nürnberg", country: "Deutschland" },
    { city: "Duisburg", country: "Deutschland" },
    { city: "Madrid", country: "Spanien" },
    { city: "Barcelona", country: "Spanien" },
    { city: "Valencia", country: "Spanien" },
    { city: "Sevilla", country: "Spanien" },
    { city: "Zaragoza", country: "Spanien" },
    { city: "Málaga", country: "Spanien" },
    { city: "Murcia", country: "Spanien" },
    { city: "Palma", country: "Spanien" },
    { city: "Bilbao", country: "Spanien" },
    { city: "Rom", country: "Italien" },
    { city: "Mailand", country: "Italien" },
    { city: "Neapel", country: "Italien" },
    { city: "Turin", country: "Italien" },
    { city: "Palermo", country: "Italien" },
    { city: "Genua", country: "Italien" },
    { city: "Bologna", country: "Italien" },
    { city: "Florenz", country: "Italien" },
    { city: "Bari", country: "Italien" },
    { city: "Catania", country: "Italien" },
    { city: "Venedig", country: "Italien" },
    { city: "Verona", country: "Italien" },
    { city: "Athens", country: "Griechenland" },
    { city: "Thessaloniki", country: "Griechenland" },
    { city: "Vienna", country: "Österreich" },
    { city: "Graz", country: "Österreich" },
    { city: "Salzburg", country: "Österreich" },
    { city: "Brussels", country: "Belgien" },
    { city: "Antwerp", country: "Belgien" },
    { city: "Ghent", country: "Belgien" },
    { city: "Bruges", country: "Belgien" },
    { city: "Copenhagen", country: "Dänemark" },
    { city: "Aarhus", country: "Dänemark" },
    { city: "Odense", country: "Dänemark" },
    { city: "Helsinki", country: "Finnland" },
    { city: "Espoo", country: "Finnland" },
    { city: "Tampere", country: "Finnland" },
    { city: "Oslo", country: "Norwegen" },
    { city: "Bergen", country: "Norwegen" },
    { city: "Stavanger", country: "Norwegen" },
    { city: "Stockholm", country: "Schweden" },
    { city: "Gothenburg", country: "Schweden" },
    { city: "Malmö", country: "Schweden" },
    { city: "Warsaw", country: "Polen" },
    { city: "Krakow", country: "Polen" },
    { city: "Łódź", country: "Polen" },
    { city: "Wrocław", country: "Polen" },
    { city: "Poznań", country: "Polen" },
    { city: "Gdańsk", country: "Polen" },
    { city: "Lisbon", country: "Portugal" },
    { city: "Porto", country: "Portugal" },
    { city: "Amadora", country: "Portugal" },
    { city: "Bratislava", country: "Slowakei" },
    { city: "Košice", country: "Slowakei" },
    { city: "Ljubljana", country: "Slowenien" },
    { city: "Maribor", country: "Slowenien" },
    { city: "Sofia", country: "Bulgarien" },
    { city: "Plovdiv", country: "Bulgarien" },
    { city: "Varna", country: "Bulgarien" },
    { city: "Belgrade", country: "Serbien" },
    { city: "Novi Sad", country: "Serbien" },
    { city: "Prague", country: "Tschechien" },
    { city: "Brno", country: "Tschechien" },
    { city: "Ostrava", country: "Tschechien" },
    { city: "Budapest", country: "Ungarn" },
    { city: "Debrecen", country: "Ungarn" },
    { city: "Szeged", country: "Ungarn" },
    { city: "Zagreb", country: "Kroatien" },
    { city: "Split", country: "Kroatien" },
    { city: "Riga", country: "Lettland" },
    { city: "Vilnius", country: "Litauen" },
    { city: "Tallinn", country: "Estland" },
    { city: "Tokyo", country: "Japan" },
    { city: "Seoul", country: "Südkorea" },
    { city: "Bangkok", country: "Thailand" },
    { city: "Dubai", country: "Vereinigte Arabische Emirate" },
    { city: "Singapur", country: "Singapur" },
    { city: "Hongkong", country: "China" },
    { city: "Kapstadt", country: "Südafrika" },
    { city: "Sydney", country: "Australien" },
    { city: "Melbourne", country: "Australien" },
    { city: "Kairo", country: "Ägypten" },
    { city: "Johannesburg", country: "Südafrika" },
    { city: "Marrakesch", country: "Marokko" },
    { city: "Buenos Aires", country: "Argentinien" },
    { city: "Rio de Janeiro", country: "Brasilien" },
    { city: "São Paulo", country: "Brasilien" },
    { city: "Lima", country: "Peru" },
    { city: "Santiago de Chile", country: "Chile" },
    { city: "Bogotá", country: "Kolumbien" },
    { city: "Mexico-Stadt", country: "Mexiko" },
    { city: "Toronto", country: "Kanada" },
    { city: "Vancouver", country: "Kanada" },
    { city: "Montreal", country: "Kanada" },
    { city: "Peking", country: "China" },
    { city: "Shanghai", country: "China" },
    { city: "Neu-Delhi", country: "Indien" },
    { city: "Mumbai", country: "Indien" },
    { city: "Bangladesch", country: "Dhaka" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Jakarta", country: "Indonesien" },
    { city: "Manila", country: "Philippinen" },
    { city: "Taipei", country: "Taiwan" },
    { city: "Ho-Chi-Minh-Stadt", country: "Vietnam" },
    { city: "Hanoi", country: "Vietnam" },
    { city: "Tel Aviv", country: "Israel" },
    { city: "Jerusalem", country: "Israel" },
    { city: "Istanbul", country: "Türkei" },
    { city: "Doha", country: "Katar" },
    { city: "Riad", country: "Saudi-Arabien" },
    { city: "Maskat", country: "Oman" },
    { city: "Teheran", country: "Iran" },
    { city: "Auckland", country: "Neuseeland" },
    { city: "Wellington", country: "Neuseeland" },
    { city: "Christchurch", country: "Neuseeland" },
    { city: "Hobart", country: "Australien" },
    { city: "Adelaide", country: "Australien" },
    { city: "Perth", country: "Australien" },
    { city: "Brisbane", country: "Australien" },
    { city: "Kyoto", country: "Japan" },
    { city: "Osaka", country: "Japan" },
    { city: "Nagoya", country: "Japan" },
    { city: "Hiroshima", country: "Japan" },
    { city: "Fukuoka", country: "Japan" },
    { city: "Sapporo", country: "Japan" },
    { city: "Quito", country: "Ecuador" },
    { city: "Guayaquil", country: "Ecuador" },
    { city: "Caracas", country: "Venezuela" },
    { city: "La Paz", country: "Bolivien" },
    { city: "Sucre", country: "Bolivien" },
    { city: "Asunción", country: "Paraguay" },
    { city: "Montevideo", country: "Uruguay" },
    { city: "Panama-Stadt", country: "Panama" },
    { city: "San José", country: "Costa Rica" },
    { city: "San Salvador", country: "El Salvador" },
    { city: "Guatemala-Stadt", country: "Guatemala" },
    { city: "Managua", country: "Nicaragua" },
    { city: "Havanna", country: "Kuba" }
];