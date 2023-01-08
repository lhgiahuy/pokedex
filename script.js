// Load pokemonDetails.appendChild(pokemonDefense);


var count = 1;
var offset = 0;
var pokeList = [];


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

async function fetchPokeList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + `?offset=0&limit=10`
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

const pokemon = await fetchPokeList();

let pokemonProfile = [];
pokemon.map((profile) => {
  if (profile.id == 9) {
    pokemonProfile = profile;
  }
});

console.log(pokemonProfile.name);

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

function getPrimaryColor(){
    typesName.map((item) => {
    if (item.type.toLowerCase() == pokemonProfile.types[0].type.name) {
       primaryColor = item.color;
    }
  });
}

getPrimaryColor();
background.style.backgroundColor = primaryColor;

let pokemonImage = document.createElement("img");
pokemonImage.classList.add("pokemon-image");
pokemonImage.src =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonProfile.id}.png`;

let imgContainer = document.querySelector(".img_container");
imgContainer.appendChild(pokemonImage);

let card = document.querySelector(".card");
const pokemonTypes = document.createElement("div");
pokemonTypes.classList.add("pokemon-types");
pokemonTypes.classList.add("container");
pokemonProfile.types.map((poke) => {
  const pokemonType = document.createElement("div");
  pokemonType.classList.add("pokemon-type");
  pokemonTypes.appendChild(pokemonType).innerHTML = poke.type.name;
  typesName.map((item) => {
    if (item.type.toLowerCase() == pokemonType.textContent) {
      pokemonType.style.backgroundColor = item.color;
    }
  });
});
card.appendChild(pokemonTypes);



const pokemonWeight = document.createElement("div");
pokemonWeight.classList.add("pokemon-weight");

if (/(-?\d+)(\d{1})/.test(pokemonProfile.weight)){
  pokemonProfile.weight = pokemonProfile.weight.toString().replace(/(-?\d+)(\d{1})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.weight} kg`;
} else if (/(-?\d+)(\d{2})/.test(pokemonProfile.weight)){
  pokemonProfile.weight = pokemonProfile.weight.toString().replace(/(-?\d+)(\d{2})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.weight} kg`;
}

const weightContainer = document.querySelector(".weight_container");
weightContainer.append(pokemonWeight);

const pokemonHeight = document.createElement("div");
pokemonHeight.classList.add("pokemon-height");

if (/(-?\d+)(\d{1})/.test(pokemonProfile.height)){
  pokemonProfile.height = pokemonProfile.height.toString().replace(/(-?\d+)(\d{1})/, "$1,$2");
  pokemonHeight.innerHTML = `${pokemonProfile.height} kg`;
} else if (/(-?\d+)(\d{2})/.test(pokemonProfile.height)){
  pokemonProfile.height = pokemonProfile.height.toString().replace(/(-?\d+)(\d{2})/, "$1,$2");
  pokemonWeight.innerHTML = `${pokemonProfile.height} kg`;
} else pokemonHeight.innerHTML = `0,${pokemonProfile.height} m`;

const heightContainer = document.querySelector(".height_container");
heightContainer.append(pokemonHeight);


const pokemonAbilities = document.createElement("div");
pokemonAbilities.classList.add("pokemon-abilities");
pokemonProfile.abilities.map((poke) => {
  const pokemonAbility = document.createElement("div");
  pokemonAbility.classList.add("pokemon-ability");
  pokemonAbilities.appendChild(pokemonAbility).innerHTML = poke.ability.name;
});

const abilitiesContainer = document.querySelector(".abilities_container");
abilitiesContainer.append(pokemonAbilities);

const pokemonDetails = document.querySelector(".details");


function createDiv(divName, data) {
    const div = document.createElement("div");
    div.classList.add(`${divName}`);
    if (data < 100){
      div.innerHTML = `0${data}`;
    }
    else div.innerHTML = `${data}`;
    return div;
}

const pokemonHP = createDiv("pokemon-hp", pokemonProfile.stats[0].base_stat);
const pokemonAttack = createDiv("pokemon-attack", pokemonProfile.stats[1].base_stat);
const pokemonDefense = createDiv("pokemon-defense", pokemonProfile.stats[2].base_stat);
const pokemonSpAttack = createDiv("pokemon-spAttack", pokemonProfile.stats[3].base_stat);
const pokemonSpDefense = createDiv("pokemon-spDefense", pokemonProfile.stats[4].base_stat);
const pokemonSpeed = createDiv("pokemon-speed",pokemonProfile.stats[5].base_stat);

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
document.querySelector(":root").style.setProperty("--hp", `${(pokemonProfile.stats[0].base_stat*100)/255}%`);
document.querySelector(":root").style.setProperty("--atk", `${(pokemonProfile.stats[1].base_stat*100)/181}%`);
document.querySelector(":root").style.setProperty("--def", `${(pokemonProfile.stats[2].base_stat*100)/230}%`);
document.querySelector(":root").style.setProperty("--spAtk", `${(pokemonProfile.stats[3].base_stat*100)/180}%`);
document.querySelector(":root").style.setProperty("--spDef", `${(pokemonProfile.stats[4].base_stat*100)/230}%`);
document.querySelector(":root").style.setProperty("--speed", `${(pokemonProfile.stats[5].base_stat*100)/200}%`);