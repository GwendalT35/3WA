import { getLocation } from "./geolocation.js";

let urlApiLonLat = (longitude, latitude) => {
    return `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
};
let urlApiAddr = (addr) => {
    return `https://api-adresse.data.gouv.fr/search/?q=${addr}`;
};
export function getAddress(address = "") {
    return new Promise(async (resolve, reject) => {
        try {
            let apiUrl;
            if (address == "") {
                // Get the user's location
                const { latitude, longitude } = await getLocation();

                // Construct the API URL
                apiUrl = urlApiLonLat(longitude, latitude);
            }
            else{
                apiUrl = urlApiAddr(address);
            }

            // Fetch data from the API
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}