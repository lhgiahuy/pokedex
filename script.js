// Load pokemon
var pokeList = [];
var filterList = [];
var currentShow;
var offset = 0;
var regions = [{ name: "All Regions" }];
var pokemonById = {};
var pokemonByName = {};
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
    showPokemon(filterList);
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
          regions: "",
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

if (indexId == null) {
  filterList = await fetchPokeList();
} else {
  pokemonById = indexId;
  pokemonByName = indexName;
  pokeList = indexList;
  filterList = pokeList;
}
showPokemon(filterList);

function showPokemon(pokeList) {
  const loadingImg = document.getElementById("loadingImg");
  //load 20 cards pokemon/time
  loadingImg.style.display = "none";
  currentShow = pokeList.length;
  // console.log(pokeList);
  for (let i = offset; i < offset + 20 && i < currentShow; i++) {
    createPokemon(pokemonById[pokeList[i]]);
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
        pokemonData.pokemon_entries.map((poke) => {
          const pokemonName = poke.pokemon_species.name;
          const pokemonId = pokemonByName[pokemonName].id;
          if (pokemonById[pokemonId].regions == "")
            pokemonById[pokemonId].regions = regions[i].name;
        });
      });
  }
  return regions;
}
const regionsArr = await fetchRegion();

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

  selectBtn.addEventListener("click", () => {
    optionMenu.classList.toggle("active");
  });
  options.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      // optionMenu.classList.remove("active");
      if (filterName.includes("type")) {
        console.log("hi");
        // filterPoke(selectedOption.toLowerCase());
        allFilterClickListener(selectedOption.toLowerCase(), "types");
      } else if (filterName.includes("region")) {
        // filerPokeByRegion(selectedOption.toLowerCase());
        allFilterClickListener(selectedOption.toLowerCase(), "regions");
      }
    });
  });
}

const pokeCard = document.querySelectorAll(".pokemon-card");
Array.from(pokeCard).forEach((card) => {
  card.addEventListener("click", () => {
    const pokeId = card.querySelector(".pokemon-id").dataset.id;
    console.log(pokeId);
    localStorage.setItem("pokeId", JSON.stringify(pokemonById[pokeId]));
  });
});

var state = {
  // tags that render are inside of 'passingTags' object.
  passingTags: {
    search: {
      inputTerm: "",
    },
    types: {},
    regions: {},
  },
};
for (let key of typesName) {
  state.passingTags.types[key.type.toLowerCase()] = false;
}
for (let key of regionsArr) {
  state.passingTags.regions[key.name.toLowerCase()] = false;
}
function useState(defaultValue) {
  // 👆🏻We create a function useState with a default value
  let value = defaultValue;
  // 👆🏻We create a local variable value = defaultValue
  function getValue() {
    // 👆🏻We create a function getValue to get the value that return the value
    return value;
  }
  function setValue(newValue) {
    // 👆🏻We create a function to set the value with parameter newValue
    value = newValue; // 👈🏻 We change the value for newValue
  }
  return [getValue, setValue];
  // 👆🏻We return an array with the value and the function
}
const [filter, setFilter] = useState(state);

//**************UNIVERSAL FILTER ****************//
function allFilterClickListener(selectedField, filterProp) {
  if (filterProp == "types")
    setFilter({
      passingTags: {
        ...filter().passingTags,
        [filterProp]: {
          ...state.passingTags[filterProp],
        },
      },
    });
  if (filterProp == "regions")
    setFilter({
      passingTags: {
        ...filter().passingTags,
        [filterProp]: {
          ...state.passingTags[filterProp],
        },
      },
    });
  setFilter({
    passingTags: {
      ...filter().passingTags,
      [filterProp]: {
        ...filter().passingTags[filterProp],
        [selectedField]: !filter().passingTags[filterProp][selectedField],
      },
    },
  });

  console.log(filter());
  const pokedexContainer = document.getElementById("pokedex-container");
  pokedexContainer.innerHTML = "";
  offset = 0;
  console.log(filterList);
  // if (selectedField == "all types" || selectedField == "all regions")
  //   filterList = multiPropsFilter(pokeList, filteredCollected());
  filterList = multiPropsFilter(searchPokemon(), filteredCollected());

  showPokemon(filterList);
}
console.log(filter());

//*********COLLECT ALL KEYS AND FILTER **************//
// This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
function filteredCollected() {
  const collectedTrueKeys = {
    types: [],
    regions: [],
  };
  const { types, regions } = filter().passingTags;
  for (let typesKey in types) {
    if (types[typesKey]) collectedTrueKeys.types.push(typesKey);
  }

  for (let regionsKey in regions) {
    if (regions[regionsKey]) collectedTrueKeys.regions.push(regionsKey);
  }
  return collectedTrueKeys;
}

function multiPropsFilter(pokeList, filters) {
  const filterKeys = Object.keys(filters);
  return pokeList.filter((poke) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      if (filters[key][0] == "all types") return true;
      if (filters[key][0] == "all regions") return true;
      if (Array.isArray(pokemonById[poke][key])) {
        return pokemonById[poke][key].some((keyEle) =>
          filters[key].includes(keyEle)
        );
      }
      return filters[key][0].includes(pokemonById[poke][key]);
    });
  });
}

// **************** SEARCH Filter & Dispatch ****************
function searchPokemon() {
  filterList = multiPropsFilter(pokeList, filteredCollected());
  if (filter().passingTags.search == "") return filter;
  console.log(filter().passingTags.search);
  return filterList.filter((pokemon) => {
    return pokemonById[pokemon].name.includes(
      filter().passingTags.search.searchInput
    );
  });
}

const searchInput = document.getElementById("pokedex-search");
searchInput.addEventListener("input", () => {
  const pokedexContainer = document.getElementById("pokedex-container");
  const selectedFieldType = document
    .getElementById("type")
    .innerText.toLowerCase();
  const selectedFieldRegion = document
    .getElementById("region")
    .innerText.toLowerCase();
  setFilter({
    passingTags: {
      ...filter().passingTags,
      search: { searchInput: searchInput.value.trim() },
    },
  });
  pokedexContainer.innerHTML = "";
  filterList = searchPokemon();
  offset = 0;
  showPokemon(filterList);

  console.log(filterList);
  console.log(searchPokemon());
  if (searchInput.value != "") {
    filterList = searchPokemon();
  } else {
    pokedexContainer.innerHTML = "";
    filterList = pokeList;
    offset = 0;
  }
  console.log(filterList);
  console.log(pokemonById);
  currentShow = filterList.length;
  if (selectedFieldType != "type") {
    allFilterClickListener(selectedFieldType, "types");
    offset =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
        ? filterList.length
        : Math.ceil((window.innerHeight + window.scrollY) / 150);
    if (selectedFieldRegion != "region") {
      allFilterClickListener(selectedFieldType, "regions");
      offset =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
          ? filterList.length
          : Math.ceil((window.innerHeight + window.scrollY) / 150);
    }
  } else showPokemon(filterList);
});
