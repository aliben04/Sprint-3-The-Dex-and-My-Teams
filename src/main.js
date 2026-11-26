import { addPok } from "../script.js";
import {
  addPokymon,
  AddToTeam,
  deletePokemon,
  getpokymonById,
  removeFromTeam,
  request,
  updatePokemon,
} from "./service/api.js";
import { setValeu } from "./storage.js";
import {
  actualiserPokymon,
  addcartInTeam,
  afficherDetails,
  afficherError,
  afficherFilter,
  afficherFilterCards,
  afficherPage,
  getData,
  searchName,
} from "./ui.js";
let page = 1;
afficherPage(page);

let prev = document.querySelector("#prev");
let btnNext = document.querySelector("#next");
let totalPage = await request("GET", "/creatures");
btnNext.addEventListener("click", async () => {
  btnNext.disabled = true;
  page++;
  try {
    await afficherPage(page);
  } catch (error) {
    afficherError(error);
  } finally {
    //btnNext.disabled = page >=Math.ceil(totalPage.length/12) ;
    updateButtons();
  }
  if (page >= Math.ceil(totalPage.length / 12)) {
    btnNext.classList.add("bg-gray-300");
  }
});
prev.addEventListener("click", async () => {
  if (page > 1) {
    prev.disabled = true; // block double-clicks while loading
    btnNext.disabled = true;
    page--;
    try {
      await afficherPage(page);
    } catch (error) {
      afficherError(error);
    } finally {
      updateButtons(); // re-enable according to the current page
    }
  }
});
function updateButtons() {
  prev.disabled = page <= 1;
  btnNext.disabled = page >= Math.ceil(totalPage.length / 12);
  prev.classList.toggle("bg-gray-300", page <= 1);
}
await afficherFilter();

let filters = document.querySelector("#filters");

filters.addEventListener("click", async (e) => {
  let button = e.target.closest("button");

  if (!button) return;

  for (let btn of filters.children) {
    btn.classList.remove("bg-red-500", "text-white");
    btn.classList.add("bg-white");
  }

  button.classList.remove("bg-white");
  button.classList.add("bg-red-500", "text-white");

  localStorage.setItem("typeFilter", button.textContent);

  await actualiserPokymon();
});

let typeSaved = localStorage.getItem("typeFilter") || "tous";
for (let btn of filters.children) {
  if (btn.textContent.trim() === typeSaved) {
    btn.classList.remove("bg-white");
    btn.classList.add("bg-red-500", "text-white");
  }
}
if (typeSaved === "tous") {
  let allPok = await request("GET", "/creatures");
  afficherFilterCards(allPok);
} else {
  actualiserPokymon();
}

let search = document.querySelector("#search");
search.addEventListener("input", async () => {
  if (search.value.trim() === "") {
    let error_ = document.querySelector("#loading").nextElementSibling;
    error_.innerHTML = "";
    await afficherPage(1);
    return;
  } else {
    await searchName(search.value);
  }
});

let sort = document.querySelector("#sort");
/*
sort.addEventListener("change",async(e)=>{
    let sortType=e.target.value
    try {
        let data=await sortpokymon(sortType)
        let grid = document.querySelector("#grid");
        grid.innerHTML = "";
        data.forEach(pok => {
            afficherCard(pok)
        });
    } catch (error) {
        afficherError(1,error)
    }
})
*/
sort.addEventListener("change", async () => {
  await actualiserPokymon();
});

let listPok = document.querySelector("#grid");
let idPok;
listPok.addEventListener("click", async (e) => {
  let edit = e.target.closest("#update");
  let deletePok = e.target.closest("#delete");
  let ajouter = e.target.closest("#ajouter");
  let article = e.target.closest("article");
  idPok = article.querySelector("#id").textContent;
  let pok = await getpokymonById(idPok);
  if (edit) {
    let form = document.querySelector("#creature-form");
    for (let i of form.elements) {
      if (i.name) {
        if (i.name === "stat1") {
          i.value = pok.stats.hp;
        } else if (i.name === "stat2") {
          i.value = pok.stats.attack;
        } else if (i.name === "stat3") {
          i.value = pok.stats.defence;
        } else {
          i.value = pok[i.name];
        }
      }
    }
    document.querySelector("#updatePok").classList.remove("hidden");
    document.querySelector("#submit").classList.add("hidden");
    return;
  }
  if (deletePok) {
    deletePoky(idPok.trim());
    return;
  }
  if (ajouter) {
    try {
      let teams = await request("GET", "/teams");
      let existe = teams.some((team) => team.creatureId === pok.id);
      if (existe) {
        alert(`${pok.name} est déjà dans l'équipe`);
        return;
      }

      if (teams.length >= 6) {
        alert("L'équipe est pleine (6 créatures maximum)");
        return;
      }

      const entry = { creatureId: pok.id, name: pok.name, img: pok.image };
      await AddToTeam(entry);
      await addcartInTeam();
    } catch (err) {
      alert("Impossible d'ajouter à l'équipe");
      console.error(err);
    }
  }
  afficherDetails(pok, "bg-black");
});
await addcartInTeam(); /*
let listT=document.querySelector("#listT")
listT.addEventListener("click",(e)=>{
    let remove=e.target.closest("#removePok")
    if(remove){
        listT.classList.remove("bg-white")
        listT.classList.add("bg-red-500")
    }
})
*/
let inputs = addPok();

let form = document.querySelector("#creature-form");

inputs.type.addEventListener("change", async () => {
  inputs.type.nextElementSibling.textContent = inputs.type.value
    ? "Type valid"
    : "Choose a type";
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let allPok = await request("GET", "/creatures");

  if (
    !inputs.validName() ||
    !inputs.validLevel() ||
    !inputs.validDescription() ||
    !inputs.validImage() ||
    !inputs.validSt() ||
    !inputs.validSt2() ||
    !inputs.validSt3() ||
    inputs.type.value === ""
  ) {
    return;
  }

  let maxId = 0;
  allPok.forEach((pok) => {
    if (Number(pok.id) > maxId) {
      maxId = Number(pok.id);
    }
  });
  let newId = String(maxId + 1);
  let cart = {
    id: newId,
    name: inputs.name.value,
    type: inputs.type.value,
    level: inputs.level.value,
    stats: {
      hp: inputs.st.value,
      attack: inputs.st2.value,
      defence: inputs.st3.value,
    },
    image: inputs.image.value,
    description: inputs.description.value,
  };
  addPokymon(cart);

  form.reset();
});

function saveData() {
  let form = document.querySelector("#creature-form");
  let data = {};

  for (let i of form.elements) {
    if (i.name) {
      data[i.name] = i.value;
    }
  }

  setValeu(data);
}

let update = document.querySelector("#updatePok");
update.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    !inputs.validName() ||
    !inputs.validLevel() ||
    !inputs.validDescription() ||
    !inputs.validImage() ||
    !inputs.validSt() ||
    !inputs.validSt2() ||
    !inputs.validSt3() ||
    inputs.type.value === ""
  ) {
    return;
  }

  let newPok = {
    id: Number(idPok),
    name: inputs.name.value,
    type: inputs.type.value,
    level: inputs.level.value,
    stats: {
      hp: inputs.st.value,
      attack: inputs.st2.value,
      defence: inputs.st3.value,
    },
    image: inputs.image.value,
    description: inputs.description.value,
  };
  await updatePokemon(newPok);
  alert("Pokémon updated successfully!");
});

form.addEventListener("input", saveData);
getData();

async function deletePoky(id) {
  let confirmation = confirm("Are you sure you want to delete this creature?");
  if (confirmation) {
    await deletePokemon(id);
    alert("Creature successfully deleted!");
  }
}

let listT = document.querySelector("#listT")
listT.addEventListener("click",async(e)=>{
    let removePok=e.target.closest("#removePok")
    if(removePok){
        let id=removePok.dataset.id
        await removeFromTeam(id)
        alert("Creature successfully deleted from your team !")
    }
})
