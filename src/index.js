const state = {
    pokemonData: data,
    coverIndex: 0,
    searchFilter: '',
}

function getPokemonName(pokemon) {
    // Create the title for the card
    const pokemonName = document.createElement('h2')
    pokemonName.classList.add('card--title')
    // Convert the first character to upper case
    const pokemonNameCase =
        pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    pokemonName.innerText = pokemonNameCase

    return pokemonName
}

function getPokemonCovers(pokemon) {
    const pokemonCoversArray = [
        pokemon.sprites.other['official-artwork'].front_default,
        pokemon.sprites.front_default,
        pokemon.sprites.front_shiny,
        pokemon.sprites.other.dream_world.front_default,
    ]

    // Create the containing div
    const pokemonCoverContainer = document.createElement('div')
    pokemonCoverContainer.classList.add('image-wrapper')

    // Create the image
    const pokemonCoverImage = document.createElement('img')
    pokemonCoverImage.classList.add('card--img')
    pokemonCoverImage.width = 256
    pokemonCoverImage.height = 256
    // Set the default image to the official artwork
    pokemonCoverImage.src = pokemonCoversArray[state.coverIndex]

    // Append all the elements to the containing div
    pokemonCoverContainer.appendChild(
        createBackwardsButton(pokemonCoversArray, pokemonCoverImage)
    )
    pokemonCoverContainer.appendChild(pokemonCoverImage)
    pokemonCoverContainer.appendChild(
        createForwardsButton(pokemonCoversArray, pokemonCoverImage)
    )

    return pokemonCoverContainer
}

function createBackwardsButton(pokemonCoversArray, pokemonImageElement) {
    // Create button that moves backwards
    const backwardsButton = document.createElement('button')
    backwardsButton.classList.add('button')
    backwardsButton.setAttribute('id', 'backwards')
    backwardsButton.innerText = '←'

    backwardsButton.addEventListener('click', () => {
        state.coverIndex -= 1
        // If the value is negative we want to
        // loop back to the end of the array
        if (state.coverIndex < 0) {
            state.coverIndex = pokemonCoversArray.length - 1
        }
        pokemonImageElement.src = pokemonCoversArray[state.coverIndex]
    })

    return backwardsButton
}

function createForwardsButton(pokemonCoversArray, pokemonImageElement) {
    // Create button that moves forwards
    const forwardsButton = document.createElement('button')
    forwardsButton.classList.add('button')
    forwardsButton.setAttribute('id', 'forwards')
    forwardsButton.innerText = '→'

    forwardsButton.addEventListener('click', () => {
        state.coverIndex += 1
        // If the value exceeds the array
        // we want to loop back to the start
        if (state.coverIndex > pokemonCoversArray.length - 1) {
            state.coverIndex = 0
        }
        pokemonImageElement.src = pokemonCoversArray[state.coverIndex]
    })

    return forwardsButton
}

function getPokemonStats(pokemon) {
    // Create the list where all the stats will be shown
    const pokemonStats = document.createElement('ul')
    pokemonStats.classList.add('card--text')

    // Loop through the stats and add them to the list
    for (let i = 0; i < pokemon.stats.length; i++) {
        const statItem = pokemon.stats[i]
        const pokemonListItem = document.createElement('li')
        pokemonListItem.innerText = `
            ${statItem.stat.name.toUpperCase()}: ${statItem.base_stat}
        `
        pokemonStats.appendChild(pokemonListItem)
    }

    return pokemonStats
}

function getPokemonGames(pokemon) {
    // Create the containing div
    const pokemonGames = document.createElement('div')

    // Create the list where all the games will be shown
    const pokemonGamesList = document.createElement('ul')
    pokemonGamesList.classList.add('card--games')

    // Loop through the games and add them to the list
    for (let i = 0; i < pokemon.game_indices.length; i++) {
        const game = pokemon.game_indices[i]
        const pokemonGamesItem = document.createElement('li')
        const pokemonGamesItemCase =
            game.version.name[0].toUpperCase() + game.version.name.slice(1)
        pokemonGamesItem.innerText = pokemonGamesItemCase
        pokemonGamesList.appendChild(pokemonGamesItem)
    }

    // Append the header
    pokemonGames.appendChild(createPokemonGamesHeader())
    pokemonGames.appendChild(pokemonGamesList)

    return pokemonGames
}

function createPokemonGamesHeader() {
    // Create the header for the games list
    const pokemonGamesHeader = document.createElement('h4')
    pokemonGamesHeader.classList.add('card--games--header')
    pokemonGamesHeader.innerText = 'Featured Games:'

    return pokemonGamesHeader
}

function createSearchBar() {
    // Create the searchBar
    const searchBar = document.createElement('input')
    searchBar.setAttribute('id', 'searchBar')
    searchBar.placeholder = 'Search Pokemon...'

    // Match the value of the searchBar to the searchFilter
    // every time it is updated, render the state to update
    searchBar.addEventListener('input', (event) => {
        const value = event.target.value
        state.searchFilter = value.toLowerCase()
        renderPokemonCards()
    })

    // Insert the search bar at the top of the page
    const cardsUL = document.querySelector('ul')
    document.body.insertBefore(searchBar, cardsUL)
}

// Render the state
function renderPokemonCards() {
    // Grab the entry point on the HTML
    const cardsUL = document.querySelector('.cards')

    // Clear the HTML on every rerender
    cardsUL.innerHTML = ''

    // Filter the pokemon by the state.searchFilter string
    const filteredPokemon = state.pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(state.searchFilter.toLowerCase())
    )

    // Loop through all of the matching entries
    for (let i = 0; i < filteredPokemon.length; i++) {
        const pokemon = filteredPokemon[i]

        // Create the list entry (card)
        const card = document.createElement('li')
        card.classList.add('card')

        // Construct the queue for rendering
        const functions = [
            getPokemonName,
            getPokemonCovers,
            getPokemonStats,
            getPokemonGames,
        ]

        // Loop through the functions and append them to the card
        for (let i = 0; i < functions.length; i++) {
            card.appendChild(functions[i](pokemon))
        }

        // Append the card to the HTML page
        cardsUL.appendChild(card)
    }
}

// Initialise the search bar and Pokemon cards
document.addEventListener('DOMContentLoaded', () => {
    createSearchBar()
    renderPokemonCards()
})
