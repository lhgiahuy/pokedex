import { typesName } from "./typesName.js";
import fetchRegion from "./regions.js";
import { pokemonById } from "./fetchPokeList.js";
import showPokemon, { setCurrentShow } from "./showPokemon.js";
import { filterList, pokeList, setFilterList } from "./fetchPokeList.js";

var offset = JSON.parse(localStorage.getItem("offset"));
var afterSearchList = pokeList;
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

for (let key of typesName) {
  state.passingTags.types[key.type.toLowerCase()] = false;
}
for (let key of regions) {
  state.passingTags.regions[key.name.toLowerCase()] = false;
}
function useState(defaultValue) {
  // We create a function useState with a default value
  let value = defaultValue;
  // We create a local variable value = defaultValue
  function getValue() {
    // We create a function getValue to get the value that return the value
    return value;
  }
  function setValue(newValue) {
    // We create a function to set the value with parameter newValue
    value = newValue; //  We change the value for newValue
  }
  return [getValue, setValue];
  // We return an array with the value and the function
}
const [filter, setFilter] = useState(state);

//**************UNIVERSAL FILTER ****************//
export function allFilterClickListener(selectedField, filterProp) {
  console.log("ko phải search");
  setFilterList(afterSearchList);
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

  const pokedexContainer = document.getElementById("pokedex-container");
  pokedexContainer.innerHTML = "";
  offset = 0;
  localStorage.setItem("offset", JSON.stringify(offset));
  setFilterList(multiFilter(afterSearchList, filteredCollected()));
  showPokemon(filterList);
}

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

function multiFilter(pokeList, filters) {
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

// **************** SEARCH Filter ****************
function searchPokemon() {
  if (filter().passingTags.search.searchInput == "") afterSearchList = pokeList;
  else {
    afterSearchList = pokeList.filter((pokemon) => {
      return pokemonById[pokemon].name.includes(
        filter().passingTags.search.searchInput
      );
    });
  }
  setFilterList(multiFilter(afterSearchList, filteredCollected()));
}

const searchInput = document.getElementById("pokedex-search");
searchInput.addEventListener("input", () => {
  const pokedexContainer = document.getElementById("pokedex-container");
  setFilter({
    passingTags: {
      ...filter().passingTags,
      search: { searchInput: searchInput.value.trim() },
    },
  });
  pokedexContainer.innerHTML = "";
  offset = 0;
  localStorage.setItem("offset", JSON.stringify(offset));
  searchPokemon();
  setCurrentShow(filterList.length);
  showPokemon(filterList);
});
