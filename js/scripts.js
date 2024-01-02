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

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");

        // Create a list item
        let listItem = document.createElement('li');

        // Create a button element
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('my-class');

        // Append the button to the list item
        listItem.appendChild(button);

        pokemonList.appendChild(listItem);

        /* Add Event listener to the Button
         button.addEventListener('click', function () {
             showDetails(pokemon);
         }); */

        // Advanced Exercise: Call the function to add the event listener to the button
        addButtonClickListener(button, pokemon);
    }

    // New function showDetails
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();


// Function to add event listener to a button
function addButtonClickListener(button, pokemon) {
    button.addEventListener('click', function () {
        pokemonRepository.showDetails(pokemon);
    });
}


pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});