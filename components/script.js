import showPokemon, { currentShow, setCurrentShow } from "./showPokemon.js";
import { pokemonById, filterList, pokeList } from "./fetchPokeList.js";
import regionDropdown from "./regionDropdown.js";
import typesDropdown from "./typesDropdown.js";
// Load pokemon
var offset = 0;
localStorage.setItem("offset", JSON.stringify(offset));

function nextPage() {
  let offset = JSON.parse(localStorage.getItem("offset"));
  if (offset >= currentShow) {
    return 0;
  } else {
    const loadingImg = document.getElementById("loadingImg");
    loadingImg.style.display = "block";

    if (offset < currentShow) {
      offset += 20;
      localStorage.setItem("offset", JSON.stringify(offset));
    }
    showPokemon(filterList);
    //   // setTimeout(() => {
    //   // }, 2000);
  }
}

setCurrentShow(showPokemon(filterList));

// add new pokemon if user scroll to bottom
window.onscroll = function (ev) {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    nextPage();
  }
};
const dropdownArrowRegion = document.getElementById("dropdownArrow__region");
dropdownArrowRegion.addEventListener("click", () => {
  regionDropdown();
});
const dropdownArrow = document.getElementById("dropdownArrow__type");
dropdownArrow.addEventListener("click", () => {
  typesDropdown();
});

const pokeCard = document.querySelectorAll(".pokemon-card");
Array.from(pokeCard).forEach((card) => {
  card.addEventListener("click", () => {
    const pokeId = card.querySelector(".pokemon-id").dataset.id;
    localStorage.setItem("pokeId", JSON.stringify(pokemonById[pokeId]));
  });
});
