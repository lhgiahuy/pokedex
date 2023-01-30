import { typesName } from "./typesName.js";
import { pokemonById } from "./fetchPokeList.js";

export var currentShow;
function showPokemon(pokeList) {
  const loadingImg = document.getElementById("loadingImg");
  //load 20 cards pokemon/time
  loadingImg.style.display = "none";
  currentShow = pokeList.length;
  let offset = JSON.parse(localStorage.getItem("offset"));
  for (let i = offset; i < offset + 20 && i < currentShow; i++) {
    createPokemon(pokemonById[pokeList[i]]);
  }
  return currentShow;
}
// const indexId = JSON.parse(localStorage.getItem("pokemonById"));
function createPokemon(pokemonData) {
  // Add profile page to the card
  const pokemonLink = document.createElement("a");
  pokemonLink.setAttribute("href", "../profile.html");

  // Generate a card for each Pokémon
  const pokedexContainer = document.getElementById("pokedex-container");
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  // Add Pokémon name and image to the card
  const pokemonName = document.createElement("div");
  pokemonName.classList.add("pokemon-name");
  pokemonName.innerHTML = pokemonData.name;

  const pokemonImage = document.createElement("img");
  pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;

  // Add Pokémon id and types to the card
  const pokemonId = document.createElement("div");
  pokemonId.classList.add("pokemon-id");
  pokemonId.setAttribute("data-id", pokemonData.id);
  if (pokemonData.id < 10) {
    pokemonId.innerHTML = `#00${pokemonData.id}`;
  } else if (pokemonData.id < 100) {
    pokemonId.innerHTML = `#0${pokemonData.id}`;
  } else {
    pokemonId.innerHTML = `#${pokemonData.id}`;
  }

  //Add Pokemon types and set color base on types
  const pokemonTypes = document.createElement("div");
  pokemonTypes.classList.add("pokemon-types");
  pokemonData.types.map((poke) => {
    const pokemonType = document.createElement("div");
    pokemonType.classList.add("pokemon-type");
    pokemonTypes.appendChild(pokemonType).innerHTML = poke;
    typesName.map((item) => {
      if (item.type.toLowerCase() == pokemonType.textContent) {
        pokemonType.style.backgroundColor = item.color;
      }
    });
  });
  pokemonLink.appendChild(pokemonCard);
  pokemonCard.appendChild(pokemonImage);
  pokemonCard.appendChild(pokemonId);
  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(pokemonTypes);
  pokedexContainer.appendChild(pokemonLink);
}

export function setCurrentShow(value) {
  currentShow = value;
}
export default showPokemon;
