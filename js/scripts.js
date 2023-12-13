let pokemonList = [
    { name: 'Muk', height: 1.2, types: ['poison'] },
    { name: 'Charizad', height: 1.7, types: ['fire', 'flying'] },
    { name: 'Smoochum', height: 0.4, types: ['psychic', 'ice'] }
];

// Exercise Part 1
/* for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " ");
} */
/* 
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " " + " -Wow, That is big!" + " ")
    } else {
        document.write(pokemonList[i].name + " " + "height: " + pokemonList[i].height + " ");
    }
} */


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


function divide(dividend, divisor) {
    if (divisor === 0) {
        return "You are trying to divided by zero"
    } else {
        let result = dividend / divisor;
        return result;
    }
}

console.log(divide(4, 2));