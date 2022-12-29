var count = 1;
var offset = 0;
function nextPage() {
  let countButton = document.getElementById("count");
  countButton.innerHTML = `${count}`;
  console.log(count);
  count++;
  offset = (count - 1) * 20;
  console.log(offset);
}
let nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
  nextPage(offset);
  fetchPokedex();
});
function previousPage() {
  let countButton = document.getElementById("count");
  countButton.innerHTML = `${count}`;
  console.log(count);
  if (count > 1) {
    count--;
  } else count = 1;
  offset = (count - 1) * 20;

  console.log(url);
}
let previousButton = document.getElementById("previous");
previousButton.addEventListener("click", () => {
  previousPage();
  fetchPokedex();
});
async function fetchPokedex() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + `?offset=${offset}&limit=20`
  );
  const data = await response.json();
  const pokemon = data.results;
  console.log(data);
  // Generate a card for each Pokémon

  const pokedexContainer = document.getElementById("pokedex-container");
  pokemon.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    // Fetch data for each Pokémon
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((pokemonData) => {
        // Add Pokémon name and image to the card
        const pokemonName = document.createElement("div");
        pokemonName.classList.add("pokemon-name");
        pokemonName.innerHTML = pokemonData.name;

        const pokemonImage = document.createElement("img");
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;

        // Add Pokémon id and types to the card
        const pokemonId = document.createElement("div");
        pokemonId.classList.add("pokemon-id");
        if (pokemonData.id < 10) pokemonId.innerHTML = `#00${pokemonData.id}`;
        else if (pokemonData.id < 100)
          pokemonId.innerHTML = `#0${pokemonData.id}`;
        else pokemonId.innerHTML = `#${pokemonData.id}`;

        const typesName = [
          {
            type: "Rock",
            color: "#B69E31",
          },
          {
            type: "Ghost",
            color: "#70559B",
          },
          {
            type: "Steel",
            color: "#B7B9D0",
          },
          {
            type: "Water",
            color: "#6493EB",
          },
          {
            type: "Grass",
            color: "#74CB48",
          },
          {
            type: "Psychic",
            color: "#FB5584",
          },
          {
            type: "Ice",
            color: "#9AD6DF",
          },
          {
            type: "Dark",
            color: "#75574C",
          },
          {
            type: "Fairy",
            color: "#E69EAC",
          },
          {
            type: "Normal",
            color: "#AAA67F",
          },
          {
            type: "Fighting",
            color: "#C12239",
          },
          {
            type: "Flying",
            color: "#A891EC",
          },
          {
            type: "Poison",
            color: "#A43E9E",
          },
          {
            type: "Ground",
            color: "#DEC16B",
          },
          {
            type: "Bug",
            color: "#A7B723",
          },
          {
            type: "Fire",
            color: "#F57D31",
          },
          {
            type: "Electric",
            color: "#F9CF30",
          },
          {
            type: "Dragon",
            color: "#7037FF",
          },
        ];
        const pokemonTypes = document.createElement("div");
        pokemonTypes.classList.add("pokemon-types");
        pokemonData.types.map((poke) => {
          const pokemonType = document.createElement("div");
          pokemonType.classList.add("pokemon-type");
          pokemonTypes.appendChild(pokemonType).innerHTML = poke.type.name;
          typesName.map((item) => {
            if (item.type.toLowerCase() == pokemonType.textContent) {
              pokemonType.style.backgroundColor = item.color;
            }
          });
        });

        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonId);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonTypes);
      });

    pokedexContainer.appendChild(pokemonCard);
  });
}
fetchPokedex();
