import { typesName } from "./typesName.js";
import fetchRegion from "./regions.js";
import { pokemonById } from "./fetchPokeList.js";
import showPokemon, { setCurrentShow } from "./showPokemon.js";
import { filterList, pokeList, setFilterList } from "./fetchPokeList.js";

var offset = JSON.parse(localStorage.getItem("offset"));
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
const regions = await fetchRegion();
console.log(regions);
for (let key of typesName) {
  state.passingTags.types[key.type.toLowerCase()] = false;
}
for (let key of regions) {
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
export function allFilterClickListener(selectedField, filterProp) {
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
  localStorage.setItem("offset", JSON.stringify(offset));
  console.log(filterList);
  // if (selectedField == "all types" || selectedField == "all regions")
  //   filterList = multiPropsFilter(pokeList, filteredCollected());
  setFilterList(multiPropsFilter(searchPokemon(), filteredCollected()));

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
  setFilterList(multiPropsFilter(pokeList, filteredCollected()));
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
  setFilterList(searchPokemon());
  offset = 0;
  localStorage.setItem("offset", JSON.stringify(offset));
  showPokemon(filterList);

  console.log(filterList);
  console.log(searchPokemon());
  if (searchInput.value != "") {
    setFilterList(searchPokemon());
  } else {
    pokedexContainer.innerHTML = "";
    setFilterList(pokeList);
    offset = 0;
    localStorage.setItem("offset", JSON.stringify(offset));
  }
  console.log(filterList);
  console.log(pokemonById);
  setCurrentShow(filterList.length);
  if (selectedFieldType != "type") {
    allFilterClickListener(selectedFieldType, "types");
    offset =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
        ? filterList.length
        : Math.ceil((window.innerHeight + window.scrollY) / 150);
    localStorage.setItem("offset", JSON.stringify(offset));

    if (selectedFieldRegion != "region") {
      allFilterClickListener(selectedFieldType, "regions");
      offset =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
          ? filterList.length
          : Math.ceil((window.innerHeight + window.scrollY) / 150);
      localStorage.setItem("offset", JSON.stringify(offset));
    }
  } else showPokemon(filterList);
});
