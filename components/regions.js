import { pokemonById, pokemonByName } from "./fetchPokeList.js";
var regions = [{ name: "All Regions" }];

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
export default fetchRegion;
