import { teams } from "../script.js";
import { getPokymon, request, searchByName } from "./service/api.js";
import { getValeus } from "./storage.js";

export async function afficherPage(page) {
  afficherLoading();

  let pageNumber = document.querySelector("#pageNumber");
  pageNumber.textContent = `Page ${page}`;
  try {
    let listPok = await request("GET", `/creatures?_page=${page}&_limit=8`);

    document.querySelector("#grid").innerHTML = "";

    if (listPok.length === 0) {
      afficherEmpty();
      return;
    }
    for (let poky of listPok) {
      afficherCard(poky);
    }
  } catch (error) {
    afficherError(page, error);
  } finally {
    hideLoading();
  }
}

export function afficherError(page, error) {
  let error_ = document.querySelector("#loading").nextElementSibling;
  let createError = document.createElement("div");
  createError.className =
    "text-center p-5 flex flex-col justify-center items-center w-full col-span-full";

  createError.innerHTML = `
        
            <p>${error}</p>
            

            <button id="retry" class="btn-primary bg-blue-500 text-white p-2 rounded">
                Réessayer
            </button>
    `;
  error_.innerHTML = "";
  error_.append(createError);

  document.querySelector("#retry").addEventListener("click", () => {
    afficherPage(page);
  });
}

function afficherEmpty() {
  document.querySelector("#grid").innerHTML = `
        <p>Aucune créature trouvée.</p>
    `;
}
export function afficherLoading() {
  document.querySelector("#grid").innerHTML = "";
  let loading = document.querySelector("#loading");
  loading.classList.remove("hidden");
  loading.classList.add("flex");
}

export function hideLoading() {
  let loading = document.querySelector("#loading");
  loading.classList.remove("flex");
  loading.classList.add("hidden");
}

export function checkColor(type) {
  let typeShape = "";

  switch (type.toLowerCase()) {
    case "fire":
      typeShape = "bg-orange-500";
      break;
    case "water":
      typeShape = "bg-blue-500";
      break;
    case "grass":
      typeShape = "bg-green-500";
      break;
    case "electric":
      typeShape = "bg-yellow-400";
      break;
    case "ice":
      typeShape = "bg-cyan-300";
      break;
    case "fighting":
      typeShape = "bg-red-700";
      break;
    case "poison":
      typeShape = "bg-purple-500";
      break;
    case "ground":
      typeShape = "bg-amber-700";
      break;
    case "flying":
      typeShape = "bg-indigo-400";
      break;
    case "psychic":
      typeShape = "bg-pink-500";
      break;
    case "bug":
      typeShape = "bg-lime-500";
      break;
    case "rock":
      typeShape = "bg-stone-500";
      break;
    case "ghost":
      typeShape = "bg-violet-700";
      break;
    case "dragon":
      typeShape = "bg-indigo-700";
      break;
    case "dark":
      typeShape = "bg-gray-800";
      break;
    case "steel":
      typeShape = "bg-slate-500";
      break;
    case "fairy":
      typeShape = "bg-pink-300";
      break;
    case "normal":
      typeShape = "bg-gray-400";
      break;
    default:
      typeShape = "bg-gray-400";
  }

  return typeShape;
}
let types = [
  "tous",
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];
export async function afficherFilter() {
  let filters = document.querySelector("#filters");
  filters.innerHTML = "";
  types.forEach((t) => {
    let button = document.createElement("button");
    button.textContent = t;
    button.className = "btn chip shrink-0";
    filters.appendChild(button);
  });
}
export async function afficherFilterCards(list) {
  document.querySelector("#grid").innerHTML = "";
  list.forEach((p) => {
    afficherCard(p);
  });
}

export function showErrorSearch(error) {
  let error_ = document.querySelector("#loading").nextElementSibling;

  let createError = document.createElement("div");

  createError.className =
    "text-center p-5 flex flex-col justify-center items-center w-full col-span-full";

  createError.innerHTML = `
    <div class="text-center p-6 bg-red-50 rounded-xl border border-red-200">
        <p class="text-red-600 text-lg font-bold">⚠️ Oops! An error occurred</p>
        <p class="text-gray-600 text-sm mt-2">${error}</p>
    </div>
`;

  error_.innerHTML = "";
  error_.append(createError);
}
export async function searchName(name) {
  if (name.trim() === "") {
    return;
  }
  afficherLoading();
  try {
    document.querySelector("#grid").innerHTML = "";
    let pokymon = await searchByName(name);
    if (pokymon !== null) {
      pokymon.forEach((p) => {
        afficherCard(p);
      });
    } else {
      throw new Error(
        "Creature not found. Please enter its full name and check the spelling",
      );
    }
  } catch (error) {
    showErrorSearch(error.message);
  } finally {
    hideLoading();
  }
}

export async function actualiserPokymon() {
  let type = localStorage.getItem("typeFilter") || "tous";
  let sortType = document.querySelector("#sort").value;

  try {
    let data = await getPokymon(type, sortType);

    let grid = document.querySelector("#grid");
    grid.innerHTML = "";

    data.forEach((pok) => {
      afficherCard(pok);
    });
  } catch (error) {
    afficherError(1, error);
  }
}
let section = document.querySelector("#grid");

let detail = document.querySelector("#detail");

let idPokemonDetail = "";

export function afficherCard(cart) {
  let typeShape = "bg-black";

  let article = document.createElement("article");

  article.innerHTML = `
        <article class="card flex flex-col gap-3 rounded-card border-2 bg-white p-3 pb-4 hover:translate-y-2">

            <div class="relative flex h-40 items-center justify-center rounded-xl bg-brand-light">
                <img src="${cart.image}"
                    class="h-full w-full object-contain p-2"
                    alt="${cart.name}">

                <span id="id" class="absolute left-3 top-2 font-mono text-sm text-muted">
                    ${cart.id}
                </span>
                <div class="absolute right-0 top-2">
                    <i id="delete" class="fa-solid fa-trash  cursor-pointer hover:text-red-500"></i>
                    <a href="#creature-form"><i id="update" class="fa-solid fa-pen-to-square mr-2"></i></a>
                </div>
                
                
            </div>

            <div class="flex items-center justify-between gap-2 flex-col md:flex-row">
                <h3 class="font-display font-semibold">${cart.name}</h3>
                <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white">
                    ${cart.type}
                </span>
            </div>

            <p class="text-sm text-muted">
                ${cart.level} · Total ${cart.stats.attack + cart.stats.defence}
            </p>

            <button id="ajouter" type="button" class="btn-outline">
                Ajouter à l'équipe
            </button>

        </article>
    `;

  let btnA = article.querySelector("#ajouter");

  actualiserBoutons(cart, btnA, article);

  section.append(article);
}

export function actualiserBoutons(cart, btnA, article) {
  let existe = teams.some((team) => team.id === cart.id);

  let btnD = detail.querySelector("#ajouter");

  btnA.disabled = existe || teams.length >= 6;

  if (existe) {
    btnA.className = "btn-outline";
    article.style.border = "black 1px solid";
    article.style.borderRadius = "20px";
  } else {
    btnA.className = "btn-outline bg-black text-white";
  }

  if (btnD && idPokemonDetail === cart.id) {
    btnD.disabled = existe || teams.length >= 6;

    btnD.className = existe ? "btn-outline" : "btn-outline bg-black text-white";
  }
}
/*
export function ajouterTeam(cart) {

    let existe = teams.some(team => team.id === cart.id);

    if (existe || teams.length >= 6) {
        return;
    }

    let card = {
        id: cart.id,
        img: cart.image,
        name: cart.name
    };

    teams.push(card);

    localStorage.setItem("teams", JSON.stringify(teams));

    addcartInTeam();

    cmp.textContent = teams.length;

    let boutons = section.querySelectorAll("button#ajouter");

    boutons.forEach(bouton => {

        let carte = bouton.closest("article");
        let id = carte.querySelector("span.font-mono");

        if (id && id.textContent.trim() === String(cart.id)) {
            bouton.disabled = true;
            bouton.className = "btn-outline";
        }
    });
}
*/
export function afficherDetails(cart, typeShape) {
  idPokemonDetail = cart.id;

  detail.innerHTML = `
        
            <div class="flex items-center justify-between">
                <span class="font-mono text-sm text-muted">${cart.id}</span>

                <button id="close" type="button"
                    class="btn-outline bg-red-500 w-11 px-0">
                    ✕
                </button>
            </div>

            <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
                <img src="${cart.image}"
                    class="h-full w-full object-contain p-2"
                    alt="${cart.name}">
            </div>

            <div class="flex items-center justify-between">
                <h2 class="font-display text-3xl font-extrabold">${cart.name}</h2>

                <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white">
                    ${cart.type}
                </span>
            </div>
            <p class="p text-gray-700">${cart.description}</p>

            <div class="flex flex-col gap-2 text-sm">

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">PV</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.hp}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.hp}</span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">Attaque</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.attack}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.attack}</span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">Défense</span>

                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full ${typeShape}"
                            style="width:${cart.stats.defence}%"></span>
                    </span>

                    <span class="text-right font-mono">${cart.stats.defence}</span>
                </div>

            </div>

            <button id="ajouter" type="button" class="btn-outline">
                Ajouter à l'équipe
            </button>
    `;

  detail.querySelector("#close").addEventListener("click", function () {
    idPokemonDetail = null;

    detail.innerHTML = `
            <h1 class="text-center font-bold">
                Aucun Pokémon sélectionné
            </h1>
        `;
  });

  let btnA = section.querySelector("article button#ajouter");

  actualiserBoutons(cart, btnA, btnA.closest("article"));
}

export function getData() {
  let form = document.querySelector("#creature-form");
  let data = getValeus();
  for (let i of form.elements) {
    if (i.name && data[i.name] !== undefined) {
      i.value = data[i.name];
    }
  }
}

export async function addcartInTeam() {
  let listT = document.querySelector("#listT");
  let teamCount = document.querySelector("#team-count");
  listT.innerHTML = "";
  let teams = await request("GET", "/teams");
  teams.forEach((te) => {
    let div = document.createElement("div");
    div.className = "relative border flex flex-col rounded-lg p-2";
    div.innerHTML = `
            
                <button id="removePok" data-id="${te.id}"><i class="fa-solid fa-xmark text-[16px] absolute right-0 top-1 text-red-500"></i></button>
                <img src="${te.img}" alt="${te.name}" class="py-3">
                <h3 class="text-[16px] font-bold text-center">
                    ${te.name}
                </h3>
            
        `;

    listT.append(div);
    /*
        div.querySelector("#removePok").addEventListener("click",()=>{
          
          teams.splice(teams.indexOf(te),1)
          localStorage.setItem("teams", JSON.stringify(teams));
          cmp.textContent=teams.length
          addcartInTeam();
        })*/
  });
  teamCount.innerHTML = teams.length;
}
