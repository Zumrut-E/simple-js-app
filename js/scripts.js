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

        // Advanced Exercise: Call the function to add the event listener to the button
        addButtonClickListener(button, pokemon);

        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }

    // New function showDetails
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, `Height: ${pokemon.height} Type: ${pokemon.types.map(type => type.type.name).join(', ')}`, pokemon.imageUrl);
        });
    }

    // Modal Function
    function showModal(title, text, imgUrl) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = title;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal),
            modal.appendChild(imgElement);

        modalContainer.classList.add('is-visible');
    }
    let modalContainer = document.querySelector('#modal-container');

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });

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
})();

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
});