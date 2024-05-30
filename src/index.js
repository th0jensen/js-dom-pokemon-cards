document.body.onload = addPokemonCards()

function addPokemonCards() {

  // Grab the entry point on the HTML
  const cardsUL = document.querySelector('.cards')

  // Loop through all of the entries in data.js
  for (let i = 0; i < data.length; i++) {

    const pokemon = data[i]

    // Create the list entry (card)
    const card = document.createElement('li')
    card.classList.add('card')

    // Create the header for the games list
    const pokemonGamesHeader = document.createElement('h4')
    pokemonGamesHeader.classList.add('card--games--header')
    pokemonGamesHeader.innerText = "Featured Games:"

    // Append all the items to the card
    card.appendChild(getPokemonName(pokemon))
    card.appendChild(getPokemonCover(pokemon))
    card.appendChild(getPokemonStats(pokemon))
    card.appendChild(pokemonGamesHeader)
    card.appendChild(getPokemonGames(pokemon))

    // Append the card to the HTML page
    cardsUL.appendChild(card)
  }
}

function getPokemonName(pokemon) {
  // Create the title for the card
  const pokemonName = document.createElement('h2')
  pokemonName.classList.add('card--title')
  // Convert the first character to upper case
  const pokemonNameCase = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  pokemonName.innerText = pokemonNameCase
  return pokemonName
}

function getPokemonCover(pokemon) {
  // Create the image of the Pokemon card
  const pokemonCover = document.createElement('img')
  pokemonCover.classList.add('card--img')
  pokemonCover.src = pokemon.sprites.other['official-artwork'].front_default
  pokemonCover.width = 256
  return pokemonCover
}

function getPokemonStats(pokemon) {
  // Create the list where all the stats will be shown
  const pokemonStats = document.createElement('ul')
  pokemonStats.classList.add('card--text')

  // Loop through the stats and add them to the list
  for (let i = 0; i < pokemon.stats.length; i++) {
    const stat = pokemon.stats[i]
    const pokemonStatItem = document.createElement('li')
    pokemonStatItem.innerText = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`
    pokemonStats.appendChild(pokemonStatItem)
  }
  return pokemonStats
}

function getPokemonGames(pokemon) {
  // Create the list where all the games will be shown
  const pokemonGames = document.createElement('ul')
  pokemonGames.classList.add('card--games')

  // Loop through the games and add them to the list
  for (let i = 0; i < pokemon.game_indices.length; i++) {
    const game = pokemon.game_indices[i]
    const pokemonGamesItem = document.createElement('li')
    const pokemonGamesItemCase = game.version.name[0].toUpperCase() + game.version.name.slice(1)
    pokemonGamesItem.innerText = pokemonGamesItemCase
    pokemonGames.appendChild(pokemonGamesItem)
  }
  return pokemonGames
}
