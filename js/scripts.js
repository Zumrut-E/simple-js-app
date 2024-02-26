let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
    const $ = window.$; // Function to display the modal with Pokemon data
    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
        let titleElement = $('<h1>' + item.name + '</h1>');
        let heightElement = $(
            '<p>' + '<strong>' + 'Height: ' + '</strong>' + item.height + '</p>'
        );

        let imageElement = $('<img class="modal-img">');
        imageElement.attr('src', item.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(heightElement);
        modalBody.append(imageElement);
    }
    // Function to add a Pokemon to the list
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            typeof pokemon.name === 'string'
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }
    // Function to get all the Pokemon in the list
    function getAll() {
        return pokemonList;
    }
    // Function to add a Pokemon to the list and display it as a list item
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal');
        listItem.classList.add('list-group-item');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Add an event listener to show the modal when the button is clicked
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Function to show a loading message while the Pokemon data is being fetched
    function showLoadingMessage() {
        let pokemonList = document.querySelector('.pokemon-list');
        let loadingMessage = document.createElement('p');
        pokemonList.appendChild(loadingMessage);
    }
    // Function to hide the loading message after the Pokemon data is fetched
    function hideLoadingMessage() {
        let pokemonList = document.querySelector('.pokemon-list');
        pokemonList.innerHTML = '';
    }
    // Function to fetch the Pokemon data from the PokeAPI
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    hideLoadingMessage();
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    // This function takes an item as an argument, fetches its details from a given URL and updates the item with the details.
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.other.dream_world.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }


    // This function takes an item as an argument, loads its details using the loadDetails function and shows a modal with the item details.
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        });
    }

    // This object returns public functions that can be accessed outside of the module.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
})();
// This code block loads the list of pokemon using the loadList function and adds list items to the page for each pokemon.
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
