const apiUrls = {
    region: "https://geo.api.gouv.fr/regions",
    departement: (code) => `https://geo.api.gouv.fr/regions/${code}/departements`,
    communes: (code) => `https://geo.api.gouv.fr/departements/${code}/communes`,
    getLocation: (lat, long) => `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${long}&fields=code,nom,codesPostaux,surface,population,centre,contour`
};

function clearChildElements(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createOptionElement(value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = text;
    return option;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

const regionList = document.getElementById("regionList");
const departementList = document.getElementById("departementList");
const showCommunes = document.getElementById("showCommunes");
const communeList = document.getElementById("communeList");
const getLocalisation = document.getElementById("getLocalisation");

async function populateRegions() {
    const regions = await fetchData(apiUrls.region);
    if (!regions || regions.length === 0) {
        console.warn("No regions found");
        return;
    }
    regions.forEach(region => {
        const option = createOptionElement(region.code, `${region.code} ${region.nom}`);
        regionList.appendChild(option);
    });
}

regionList.addEventListener("change", async (event) => {
    const regionCode = event.target.value;
    if (!regionCode) return;

    clearChildElements(departementList);
    try {
        const departements = await fetchData(apiUrls.departement(regionCode));
        if (!departements) return;

        departements.forEach(departement => {
            const option = createOptionElement(departement.code, `${departement.code} ${departement.nom}`);
            departementList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
});

showCommunes.addEventListener("click", async () => {
    if (regionList.value === "null" && departementList.value === "null") return;

    clearChildElements(communeList);
    try {
        const communes = await fetchData(apiUrls.communes(departementList.value));
        if (!communes || communes.length === 0) return;

        const sortedCommunes = communes.sort((a, b) => b.population - a.population);
        sortedCommunes.forEach(commune => {
            const p = document.createElement("p");
            p.innerText = `${commune.nom} - ${commune.population} habitants`;
            communeList.appendChild(p);
        });
    } catch (error) {
        console.error("Error fetching communes:", error);
    }
});

getLocalisation.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        console.log("Geolocation is available");

        clearChildElements(communeList);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const locationData = await fetchData(apiUrls.getLocation(latitude, longitude));
                if (!locationData || locationData.length === 0) return;

                const city = document.createElement("p");
                city.innerHTML = `Nom : ${locationData[0].nom}<br>
                                  Surface: ${locationData[0].surface} m²<br>
                                  Population : ${locationData[0].population}<br>
                                  <div id="map" style="width: 100%; height: 400px;"></div>`;
                communeList.appendChild(city);

                addMap(latitude, longitude, locationData[0].contour);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        });
    } else {
        console.log("Geolocation is not available");
    }
});

function addMap(lat, long, contour) {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    const map = new ol.Map({
        target: "map",
        layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
        view: new ol.View({
            center: ol.proj.fromLonLat([long, lat]),
            zoom: 12
        })
    });

    const marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat]))
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

    if (contour) {
        const contourLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(contour, {
                    featureProjection: "EPSG:3857"
                })
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({ color: "red", width: 2 }),
                fill: new ol.style.Fill({ color: "rgba(0, 0, 255, 0.1)" })
            })
        });
        map.addLayer(contourLayer);
    }
}

// Initialize regions
populateRegions();