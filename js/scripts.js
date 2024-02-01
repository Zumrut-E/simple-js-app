let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

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
        let pokemonList = document.querySelector(".list-group");

        // Create a list item
        let listItem = document.createElement('li');
        li.classList.add('list-group-item');
        pokemonList.appendChild(listItem);


        // Create a button element
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
        li.appendChild(button);
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');

        // Advanced Exercise: Call the function to add the event listener to the button
        addButtonClickListener(button, pokemon);

        function addButtonClickListener(button, pokemon) {
            button.addEventListener('click', function () {
                showDetails(pokemon);
            })
        }

        // New function showDetails
        function showDetails(pokemon) {
            loadDetails(pokemon).then(function () {
                showModal(pokemon.name, `Height: ${pokemon.height} Type: ${pokemon.types.map(type => type.type.name).join(', ')}`, pokemon.imageUrl);
            });
        }

        // Loadlist function 
        function loadList() {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        }

        // Load details function
        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url)
                .then(response => response.json())
                .then(details => {
                    item.imageUrl = details.sprites.front_default;
                    item.height = details.height;
                    item.types = details.types;
                })
                .catch(e => console.error(e));
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            showDetails: showDetails,
            loadList: loadList,
            loadDetails: loadDetails,
            showModal: showModal,
            hideModal: hideModal
        };
    };

    pokemonRepository.loadList().then(function () {
        // Now the data is loaded!
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    });

    // Advanced: Function to add event listener to a button
    function addButtonClickListener(button, pokemon) {
        button.addEventListener('click', function () {
            pokemonRepository.showDetails(pokemon);
        });
    }

    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    })
});
