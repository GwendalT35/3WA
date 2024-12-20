const baseUrl = 'https://geo.api.gouv.fr';

export function getRegions() {
    return fetch(`${baseUrl}/regions`)
        .then(response => response.json());
}

export function getDepartmentsFromRegion(selectedRegion) {
    return fetch(`${baseUrl}/regions/${selectedRegion}/departements`)
        .then(response => response.json());
}

export function getCitiesFromDepartment(selectedDepartment) {
    return fetch(`${baseUrl}/departements/${selectedDepartment}/communes`)
        .then(response => response.json())
        .then(response => {
            return response.sort((a, b) => b.population - a.population);
        });
}
