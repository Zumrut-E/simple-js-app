let pokemonList = [
    { name: 'Muk', height: 1.2, types: ['poison'] },
    { name: 'Charizad', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Smoochum', height: 0.4, types: ['psychic', 'ice'] }
];

// forEach Method
pokemonList.forEach(function (pokemon) {
    document.write(pokemon.name + " " + "height: " + pokemon.height + " " + "type: " + pokemon.types + " ");
});


document.write("<br>");

pokemonList.forEach(pokemon => {
    if (pokemon.height > 1.5) {
        document.write(`${pokemon.name} height: ${pokemon.height} -Wow, That is big! type: ${pokemon.types} `);
    } else {
        document.write(`${pokemon.name} height: ${pokemon.height} type: ${pokemon.types} `);
    }
});


document.write("<br>");

//IIFE

let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Muk', height: 1.2, types: ['poison'] },
        { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
        { name: 'Smoochum', height: 0.4, types: ['psychic', 'ice'] }
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon)
        } else {
            console.error("this is not an object")
        };
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();
console.log(pokemonRepository.getAll());
let newPokemon = { name: 'Pikachu', height: 0.4, types: ['electric'] };
pokemonRepository.add(newPokemon);
pokemonRepository.add(3);
console.log(pokemonRepository.getAll());

//forEach for the IIFE

pokemonRepository.getAll().forEach(pokemon => {
    let getAllPokemonList = `${pokemon.name} height: ${pokemon.height} ${pokemon.types}`;
    document.write(getAllPokemonList);
});