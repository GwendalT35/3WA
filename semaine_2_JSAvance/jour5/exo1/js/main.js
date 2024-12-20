import { getRegions, getDepartmentsFromRegion, getCitiesFromDepartment } from "./geoapi.js";


const elements = {
    citiesForm: document.querySelector('#get-cities-form'),
    regionSelect: document.querySelector('#regions'),
    departmentSelect: document.querySelector('#departments'),
    citiesList: document.querySelector('#cities-list')
};



async function loadRegions() {
    const response = await getRegions();    
    const html = response.map(region => {
        return `<option value="${region.code}">${region.nom}</option>`;
    }).join('');
    
    elements.regionSelect.innerHTML = html;
    
    // Une fois que toutes les régions sont affichées, on affiche la liste des départements
    // pour la première région sélectionnée
    loadDepartments();
}

async function loadDepartments() {
    const response = await getDepartmentsFromRegion(elements.regionSelect.value);
    elements.departmentSelect.innerHTML = response.map(department => {
        return `<option value="${department.code}">${department.nom}</option>`;
    }).join('');
}

async function loadCities() {
    const response = await getCitiesFromDepartment(elements.departmentSelect.value);
    // Affichage de toutes les villes
    elements.citiesList.innerHTML = response.map(city => {
        return `<li>${city.nom} (${city.population})</li>`; 
    }).join('');
}

// Envoi d'une requête vers l'API pour récupérer la liste des régions
loadRegions();

elements.regionSelect.addEventListener('change', () => {
    // Lors du changement de région, on récupère tous les départements
    loadDepartments();
});

elements.citiesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Lors de la soumission du formulaire, on récupère toutes les villes du département
    loadCities();
});