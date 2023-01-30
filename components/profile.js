import { typesName } from "./typesName.js";

const pokemonProfile = JSON.parse(localStorage.getItem("pokeId"));

console.log(pokemonProfile);

let pokemonName = document.querySelector(".pokemon-name");
let pokemonID = document.querySelector(".pokemon-id");
pokemonName.innerHTML = pokemonProfile.name;

if (pokemonProfile.id < 10) {
  pokemonID.innerHTML = `#00${pokemonProfile.id}`;
} else if (pokemonProfile.id < 100) {
  pokemonID.innerHTML = `#0${pokemonProfile.id}`;
} else {
  pokemonID.innerHTML = `#${pokemonProfile.id}`;
}

let background = document.querySelector("body");
let primaryColor = "";

function getPrimaryColor() {
  typesName.map((item) => {
    if (item.type.toLowerCase() == pokemonProfile.types[0]) {
      primaryColor = item.color;
    }
  });
}

getPrimaryColor();
background.style.backgroundColor = primaryColor;

let pokemonImage = document.createElement("img");
pokemonImage.classList.add("pokemon-image");
pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonProfile.id}.png`;

let imgContainer = document.querySelector(".img_container");
imgContainer.appendChild(pokemonImage);

let card = document.querySelector(".card");
const pokemonTypes = document.createElement("div");
pokemonTypes.classList.add("pokemon-types");
pokemonTypes.classList.add("container");
pokemonProfile.types.map((type) => {
  const pokemonType = document.createElement("div");
  pokemonType.classList.add("pokemon-type");
  pokemonTypes.appendChild(pokemonType).innerHTML = type;
  typesName.map((item) => {
    if (item.type.toLowerCase() == pokemonType.textContent) {
      pokemonType.style.backgroundColor = item.color;
    }
  });
});
card.appendChild(pokemonTypes);

const pokemonWeight = document.createElement("div");
pokemonWeight.classList.add("pokemon-weight");

if (/(-?\d+)(\d{1})/.test(pokemonProfile.weight)) {
  pokemonProfile.weight = pokemonProfile.weight
    .toString()
    .replace(/(-?\d+)(\d{1})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.weight} kg`;
} else if (/(-?\d+)(\d{2})/.test(pokemonProfile.weight)) {
  pokemonProfile.weight = pokemonProfile.weight
    .toString()
    .replace(/(-?\d+)(\d{2})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.weight} kg`;
}

const weightContainer = document.querySelector(".weight_container");
weightContainer.append(pokemonWeight);

const pokemonHeight = document.createElement("div");
pokemonHeight.classList.add("pokemon-height");

if (/(-?\d+)(\d{1})/.test(pokemonProfile.height)) {
  pokemonProfile.height = pokemonProfile.height
    .toString()
    .replace(/(-?\d+)(\d{1})/, "$1,$2");
  pokemonHeight.innerHTML = `${pokemonProfile.height} kg`;
} else if (/(-?\d+)(\d{2})/.test(pokemonProfile.height)) {
  pokemonProfile.height = pokemonProfile.height
    .toString()
    .replace(/(-?\d+)(\d{2})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.height} kg`;
} else pokemonHeight.innerHTML = `0,${pokemonProfile.height} m`;

const heightContainer = document.querySelector(".height_container");
heightContainer.append(pokemonHeight);

const pokemonAbilities = document.createElement("div");
pokemonAbilities.classList.add("pokemon-abilities");
pokemonProfile.abilities.map((ability) => {
  const pokemonAbility = document.createElement("div");
  pokemonAbility.classList.add("pokemon-ability");
  pokemonAbilities.appendChild(pokemonAbility).innerHTML = ability;
});

const abilitiesContainer = document.querySelector(".abilities_container");
abilitiesContainer.append(pokemonAbilities);

const pokemonDetails = document.querySelector(".details");

function createDiv(divName, data) {
  const div = document.createElement("div");
  div.classList.add(`${divName}`);
  if (data < 100) {
    div.innerHTML = `0${data}`;
  } else div.innerHTML = `${data}`;
  return div;
}

const pokemonHP = createDiv("pokemon-hp", pokemonProfile.stats[0].base_stat);
const pokemonAttack = createDiv(
  "pokemon-attack",
  pokemonProfile.stats[1].base_stat
);
const pokemonDefense = createDiv(
  "pokemon-defense",
  pokemonProfile.stats[2].base_stat
);
const pokemonSpAttack = createDiv(
  "pokemon-spAttack",
  pokemonProfile.stats[3].base_stat
);
const pokemonSpDefense = createDiv(
  "pokemon-spDefense",
  pokemonProfile.stats[4].base_stat
);
const pokemonSpeed = createDiv(
  "pokemon-speed",
  pokemonProfile.stats[5].base_stat
);

const pokemonStats = document.createElement("div");
pokemonStats.classList.add("pokemon-stats");
pokemonStats.appendChild(pokemonHP);
pokemonStats.appendChild(pokemonAttack);
pokemonStats.appendChild(pokemonDefense);
pokemonStats.appendChild(pokemonSpAttack);
pokemonStats.appendChild(pokemonSpDefense);
pokemonStats.appendChild(pokemonSpeed);
pokemonDetails.appendChild(pokemonStats);

document.querySelector(":root").style.setProperty("--primary", primaryColor);
document
  .querySelector(":root")
  .style.setProperty(
    "--hp",
    `${(pokemonProfile.stats[0].base_stat * 100) / 255}%`
  );
document
  .querySelector(":root")
  .style.setProperty(
    "--atk",
    `${(pokemonProfile.stats[1].base_stat * 100) / 181}%`
  );
document
  .querySelector(":root")
  .style.setProperty(
    "--def",
    `${(pokemonProfile.stats[2].base_stat * 100) / 230}%`
  );
document
  .querySelector(":root")
  .style.setProperty(
    "--spAtk",
    `${(pokemonProfile.stats[3].base_stat * 100) / 180}%`
  );
document
  .querySelector(":root")
  .style.setProperty(
    "--spDef",
    `${(pokemonProfile.stats[4].base_stat * 100) / 230}%`
  );
document
  .querySelector(":root")
  .style.setProperty(
    "--speed",
    `${(pokemonProfile.stats[5].base_stat * 100) / 200}%`
  );
