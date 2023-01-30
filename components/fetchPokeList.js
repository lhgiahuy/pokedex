export var pokemonById = {};
export var pokemonByName = {};
export var filterList = [];
export var pokeList = [];

export function setFilterList(value) {
  filterList = value;
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
export default fetchPokeList;
