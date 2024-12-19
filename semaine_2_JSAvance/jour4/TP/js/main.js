import { getAddress } from "./addressApi.js";
import { getNearCinema } from "./cinemaApi.js";

// console.log(getNearCinema());

let btnLocation = document.getElementById("btnLocation");
let searchAddress = document.getElementById("searchAddress");
let btnSearchNearCinema = document.getElementById("searchNearCinema");
let cinemaContainer = document.getElementById("cinemaContainer");

let calculDistance = (coords1, coords2) => {
    let [ lat1, long1 ] = coords1;
    let [ lat2, long2 ] = coords2;
   
    // Rayon moyen de la Terre en kilomètres
    const R = 6371;

    // Convertir les degrés en radians
    const toRadians = (deg) => deg * (Math.PI / 180);

    let dLat = toRadians(lat2 - lat1);
    let dLon = toRadians(long2 - long1);

    let a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return `${distance.toFixed(2)}`; // Retourne la distance formatée
};


// Créer un conteneur pour afficher le message d'erreur (au-dessus du formulaire)
const errorMessageContainer = document.createElement("div");
errorMessageContainer.style.color = "red";
errorMessageContainer.style.marginBottom = "10px";
errorMessageContainer.style.display = "none";  // Initialement caché
document.body.prepend(errorMessageContainer); // Ajouter le conteneur au début du body

// Fonction pour afficher le message d'erreur
function displayError(message) {
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.display = "block";  // Afficher le message d'erreur
}

function clearCinemaList() {
    // Clear all Pokémon-related content
    let lineToDelete = document.querySelectorAll("#cinemaContainer>*");
    lineToDelete.forEach(line => {
        line.remove();
    });
    let mapToDelete = document.querySelectorAll("#map>*");
    mapToDelete.forEach(map => {
        map.remove();
    });
}

btnLocation.addEventListener("click", async () => {
    try {
        const location = await getAddress();
        const address = location.features[0].properties.label;
        
        searchAddress.value = address;
        console.log(location.center); // Logs the location data

    } catch (error) {
        console.error("Error getting location:", error);
        displayError("Erreur de géolocalisation. Impossible de trouver votre adresse.");
    }
});

btnSearchNearCinema.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        
        let address = await getAddress(searchAddress.value);
        address = address.features[0].geometry.coordinates;
        
        console.log("address : ", address);
        const cinemaList = await getNearCinema(address);

        let cinemaListSorted = await cinemaList.results.sort((a, b) => {
            // Correct the reference to coordinates
            let distanceA = calculDistance(address, [a.geolocalisation.lon, a.geolocalisation.lat]);
            let distanceB = calculDistance(address, [b.geolocalisation.lon, b.geolocalisation.lat]);
            return distanceA - distanceB;
        });
        clearCinemaList();
        addMap(address, cinemaListSorted);
        cinemaListSorted.forEach(cinema => {
            let cinemaLine = document.createElement("div");
            let distance = calculDistance(address, [cinema.geolocalisation.lon, cinema.geolocalisation.lat])
            cinemaLine.innerHTML = `<p>Nom: ${cinema.nom}</p><p>adresse: ${cinema.adresse}</p><p>distance: ${distance} km</p><br>`;
            cinemaContainer.appendChild(cinemaLine);
        });
    } catch (error) {
        console.error("Error getting cinema list:", error);
        displayError("Erreur lors de la recherche des cinémas. Assurez-vous que l'adresse est correcte.");
    }
});



function addMap(address, cinemaList) {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    const map = new ol.Map({
        target: "map",
        layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
        view: new ol.View({
            center: ol.proj.fromLonLat(address),
            zoom: 12
        })
    });

    cinemaList.forEach(cinemaCoords => {
        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([cinemaCoords.geolocalisation.lon, cinemaCoords.geolocalisation.lat]))
        });
    
        const markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector({ features: [marker] }),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({ color: "red" }),
                    stroke: new ol.style.Stroke({ color: "black", width: 1 })
                })
            })
        });
    
        map.addLayer(markerLayer);
    });

}