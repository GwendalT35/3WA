let container = document.getElementById("container");
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");

let offsetIndex = 0;

let apiUrl = (limite, offset) => {
    return `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${offset}`;
};

let apiUrlSprite = (pokemonName) => {
    return `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
};

function getPokemonList(limite, offset) {
    return new Promise((resolve, reject) => {
        // Fetch the Pokémon list from the API
        fetch(apiUrl(limite, offset))
            .then(response => {
                if (!response.ok) {
                    // Handle non-200 HTTP responses
                    reject(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Resolve the data received
                resolve(data.results);
            })
            .catch(error => {
                // Handle network or other errors
                reject(`Error: ${error.message}`);
            });
    });
}

function getPokemonSprite(pokemonName) {
    return new Promise((resolve, reject) => {
        // Fetch sprite for a specific Pokémon
        fetch(apiUrlSprite(pokemonName))
            .then(response => {
                if (!response.ok) {
                    // Handle non-200 HTTP responses
                    reject(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Resolve with the sprite URL
                resolve(data.sprites.front_default);
            })
            .catch(error => {
                // Handle network or other errors
                reject(`Error: ${error.message}`);
            });
    });
}

function clearPokemon() {
    // Clear all Pokémon-related content
    let pToDelete = document.querySelectorAll("#container>*");
    pToDelete.forEach(element => {
        element.remove();
    });
}

async function addPokemonToPage(pokemonList) {

    for (let pokemon of pokemonList) {
        try {
            // Get the sprite for the Pokémon
            let pokemonSprite = await getPokemonSprite(pokemon.name);

            // Create a new div to display the Pokémon
            let newPokemon = document.createElement("div");
            newPokemon.innerHTML = `<p>${pokemon.name}</p><img src="${pokemonSprite}" alt="${pokemon.name}"/>`;

            // Append the new Pokémon to the container
            container.appendChild(newPokemon);
        } catch (error) {
            console.error(`Failed to load sprite for ${pokemon.name}: ${error}`);
        }
    }
}

// Example usage:
getPokemonList(20, offsetIndex)
    .then(pokemonList => {
        console.log(pokemonList);
        addPokemonToPage(pokemonList)
    })
    .catch(error => console.error(error));


previousBtn.addEventListener("click", () => {
    if (offsetIndex == 0) return;
    clearPokemon()
    offsetIndex -= 20;
    getPokemonList(20, offsetIndex)
    .then(pokemonList => {
        console.log(pokemonList);
        addPokemonToPage(pokemonList)
    })
    .catch(error => console.error(error));
})

nextBtn.addEventListener("click", () => {
    clearPokemon()
    offsetIndex += 20;
    getPokemonList(20, offsetIndex)
    .then(pokemonList => {
        console.log(pokemonList);
        addPokemonToPage(pokemonList)
    })
    .catch(error => console.error(error));
})