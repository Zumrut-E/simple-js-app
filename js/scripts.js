let pokemonList = [
    { name: 'Muk', height: 1.2, types: ['poison'] },
    { name: 'Charizad', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Smoochum', height: 0.4, types: ['psychic', 'ice'] }
];

// Exercise Part 1
/* for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " ");
} */

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " " + " -Wow, That is big!" + " ")
    } else {
        document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " ");
    }
}