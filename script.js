// Load pokemon
var count = 1;
var pokeList = [];
var filterList = [];
var currentShow;
var offset = 0;
var filterArr = [];
const typesName = [
  { type: "All" },
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
function nextPage() {
  if (offset >= currentShow) {
    return 0;
  } else {
    const loadingImg = document.getElementById("loadingImg");
    loadingImg.style.display = "block";

    if (offset < currentShow) offset += 20;
    if (filterArr.length != 0) showPokemon(filterArr);
    else showPokemon(filterList);
    //   // setTimeout(() => {
    //   // }, 2000);
  }
}

async function fetchPokeList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + `?offset=0&limit=905`
  );
  const data = await response.json();
  const pokemon = data.results;
  for (let item of pokemon) {
    await fetch(item.url)
      .then((res) => res.json())
      .then((pokemonData) => {
        // fetchPoke(pokemonData)
        pokeList.push(pokemonData);
      });
  }
  return pokeList;
}

filterList = await fetchPokeList();
showPokemon(filterList);

function showPokemon(pokeList) {
  const loadingImg = document.getElementById("loadingImg");
  //load 20 cards pokemon/time
  loadingImg.style.display = "none";
  currentShow = pokeList.length;
  for (let i = offset; i < offset + 20 && i < currentShow; i++) {
    createPokemon(pokeList[i]);
  }
}

function createPokemon(pokemonData) {
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
  pokedexContainer.appendChild(pokemonCard);
}

// add new pokemon if user scroll to bottom
window.onscroll = function (ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    nextPage();
  }
};

const searchInput = document.getElementById("pokedex-search");
searchInput.addEventListener("input", () => {
  const pokedexContainer = document.getElementById("pokedex-container");
  const selectedField = document.getElementById("type").innerText.toLowerCase();
  if (searchInput.value != "") {
    filterList = [];
    pokedexContainer.innerHTML = "";
    filterList = pokeList.filter((pokemon) => {
      return pokemon.name.match(`${searchInput.value.trim()}`);
    });
  } else {
    pokedexContainer.innerHTML = "";
    filterList = pokeList;
    offset = 0;
  }
  currentShow = filterList.length;
  if (selectedField != "type") {
    filterPoke(selectedField);
    offset =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
        ? filterList.length
        : Math.ceil((window.innerHeight + window.scrollY) / 150);
  } else showPokemon(filterList);
});

// dropdown
const dropdownArrow = document.getElementById("dropdownArrow");
const menuOptions = document.querySelector("ul");
dropdownArrow.addEventListener("click", () => {
  typesName.map((item) => {
    const option = document.createElement("li");
    option.className = "option";
    // add type
    const optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = item.type;

    option.appendChild(optionText);
    menuOptions.appendChild(option);
  });
  // show select option
  showSelectOption();
});

function showSelectOption() {
  const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

  selectBtn.addEventListener("click", () =>
    optionMenu.classList.toggle("active")
  );

  options.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      optionMenu.classList.remove("active");
      filterPoke(selectedOption.toLowerCase());
    });
  });
}

function filterPoke(selectedField) {
  const pokedexContainer = document.getElementById("pokedex-container");
  pokedexContainer.innerHTML = "";
  filterArr = filterList.filter((pokemon) => {
    for (let poke of pokemon.types) {
      if (poke.type.name == selectedField) {
        return true;
      }
    }
    return false;
  });
  if (selectedField == "all") filterArr = filterList;
  currentShow = filterArr.length;

  console.log(filterArr);
  offset = 0;
  showPokemon(filterArr);
}
