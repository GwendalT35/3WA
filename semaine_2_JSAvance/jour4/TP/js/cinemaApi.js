let inputRange = document.getElementById("inputRange");

// URL builder function
let urlApi = (longitude, latitude, distance) => {
    return `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom%27POINT(${longitude}%20${latitude})%27%2C%20${distance}km)&limit=20`;
};

// Function to get nearby cinemas
export function getNearCinema(address) {
    return new Promise(async (resolve, reject) => {
        try {            
            console.log(address);
            const [ longitude, latitude ] = address;
            // Construct the API URL
            const apiUrl = urlApi(longitude, latitude, inputRange.value);
            
            
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