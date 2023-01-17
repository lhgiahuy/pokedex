// Load pokemon
var pokeList = [];
var filterList = [];
var currentShow;
var offset = 0;
var filterArr = [];
var regions = [{ name: "All Regions" }];
var pokemonById = {};
var pokemonByName = {};
var pokemonInRegion = {};
const typesName = [
  { type: "All Types" },
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
        pokemonById[pokemonData.id] = {
          id: pokemonData.id,
          name: pokemonData.species.name,
          types: pokemonData.types.map((poke) => {
            return poke.type.name;
          }),
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities.map((poke) => {
            return poke.ability.name;
          }),
          stats: pokemonData.stats.map((poke) => {
            return poke;
          }),
        };
        pokemonByName[pokemonData.species.name] = {
          id: pokemonData.id,
        };
        pokeList = [...pokeList, pokemonData.id];
      });
  }
  console.log(pokemonById);
  console.log(pokemonByName);

  localStorage.setItem("pokemonById", JSON.stringify(pokemonById));
  localStorage.setItem("pokemonByName", JSON.stringify(pokemonByName));
  localStorage.setItem("pokeList", JSON.stringify(pokeList));

  return pokeList;
}
const indexId = JSON.parse(localStorage.getItem("pokemonById"));
const indexName = JSON.parse(localStorage.getItem("pokemonByName"));
const indexList = JSON.parse(localStorage.getItem("pokeList"));

// console.log(arr);
if (indexId == null) {
  filterList = await fetchPokeList();
} else {
  pokemonById = indexId;
  pokemonByName = indexName;
  pokeList = indexList;
  filterList = pokeList;
}
// console.log(pokemonById);
// console.log(pokemonByName);
console.log(filterList);
showPokemon(filterList);

function showPokemon(pokeList) {
  // console.log(offset);
  const loadingImg = document.getElementById("loadingImg");
  //load 20 cards pokemon/time
  loadingImg.style.display = "none";
  currentShow = pokeList.length;
  for (let i = offset; i < offset + 20 && i < currentShow; i++) {
    // console.log(pokeList);
    createPokemon(pokemonById[pokeList[i]]);
    // console.log(pokemonById[pokeList[i]]);
  }
}

function createPokemon(pokemonData) {
  // Add profile page to the card
  const pokemonLink = document.createElement("a");
  pokemonLink.setAttribute("href", "./profile.html");

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
    filterList = pokeList.filter((id) => {
      return pokemonById[id].name.match(`${searchInput.value.trim()}`);
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

// dropdown filter by type
const dropdownArrow = document.getElementById("dropdownArrow__type");
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
  showSelectOption("dropdownArrow__type", "select-menu--type");
});

// dropdown filter by region

async function fetchRegion() {
  for (let i = 1; i < 10; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${i}`);
    const data = await response.json();
    regions = [...regions, data];
    // console.log(region);
  }
  for (let i = 1; i < 10; i++) {
    await fetch(regions[i].pokedexes[0].url)
      .then((res) => res.json())
      .then((pokemonData) => {
        pokemonInRegion[regions[i].name] = {
          pokemonId: pokemonData.pokemon_entries.map((poke) => {
            return poke.pokemon_species.name;
          }),
        };
        // console.log(pokemonInRegion);
        // console.log(region);
      });
  }
  return regions;
}

fetchRegion();

const dropdownArrowRegion = document.getElementById("dropdownArrow__region");
const menuOptionsRegion = document.getElementById("options--region");
dropdownArrowRegion.addEventListener("click", () => {
  menuOptionsRegion.innerHTML = "";
  console.log(regions);
  regions.map((location) => {
    const option = document.createElement("li");
    option.className = "option";
    // add type
    const optionText = document.createElement("span");
    optionText.className = "option-text";
    optionText.textContent = location.name;
    option.appendChild(optionText);
    menuOptionsRegion.appendChild(option);
  });
  // show select option
  showSelectOption("dropdownArrow__region", "select-menu--region");
});

function showSelectOption(filterName, menuName) {
  const optionMenu = document.querySelector(`.${menuName}`),
    selectBtn = document.getElementById(filterName),
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
      if (filterName.includes("type")) filterPoke(selectedOption.toLowerCase());
      else if (filterName.includes("region"))
        filerPokeByRegion(selectedOption.toLowerCase());
    });
  });
}

function filterPoke(selectedField) {
  const pokedexContainer = document.getElementById("pokedex-container");
  pokedexContainer.innerHTML = "";
  filterArr = filterList.filter((id) => {
    for (let poke of pokemonById[id].types) {
      if (poke == selectedField) {
        return true;
      }
    }
    return false;
  });
  if (selectedField == "all types") filterArr = filterList;
  currentShow = filterArr.length;

  // console.log(filterArr);
  offset = 0;
  showPokemon(filterArr);
}

async function filerPokeByRegion(selectedField) {
  // console.log(pokemonInRegion[selectedField].pokemonId);
  if (selectedField == "all regions") filterArr = filterList;
  else {
    filterArr = pokemonInRegion[selectedField].pokemonId.map((poke) => {
      // console.log(pokemonById[pokemonByName[poke].id]);
      return pokemonByName[poke].id;
    });
  }
  console.log(selectedField);
  showPokemon(filterArr);
}

const pokeCard = document.querySelectorAll(".pokemon-card");
Array.from(pokeCard).forEach((card) => {
  card.addEventListener("click", () => {
    const pokeId = card.querySelector(".pokemon-id").dataset.id;
    console.log(pokeId);
    localStorage.setItem("pokeId", JSON.stringify(pokemonById[pokeId]));
  });
});
