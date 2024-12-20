const baseUrl = 'https://geo.api.gouv.fr';

export function getRegions() {
    // Return the Promise so the caller can handle it
    return fetch(`${baseUrl}/regions`)
        .then(response => response.json());
}

export function getDepartmentsFromRegion(selectedRegion) {
    // Return the Promise so the caller can handle it
    return fetch(`${baseUrl}/regions/${selectedRegion}/departements`)
        .then(response => response.json());
}

export function getCitiesFromDepartment(selectedDepartment) {
    // Return the Promise so the caller can handle it
    return fetch(`${baseUrl}/departements/${selectedDepartment}/communes`)
        .then(response => response.json())
        .then(response => {
            // Sort cities by population
            return response.sort((a, b) => b.population - a.population);
        });
}
