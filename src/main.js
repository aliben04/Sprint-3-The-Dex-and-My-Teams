
import { addPok } from "../script.js";
import {  addPokymon, getpokymonById, request, updatePokemon } from "./service/api.js";
import { setValeu } from "./storage.js";
import { actualiserPokymon, afficherDetails, afficherError, afficherFilter, afficherFilterCards, afficherPage, getData, searchName } from "./ui.js";
let page =1
afficherPage(page)


let prev=document.querySelector("#prev")
let next=document.querySelector("#next")

next.addEventListener("click",async()=>{
    BigInt.disabled =true
    page++
    try {
        await afficherPage(page);
    } catch (error) {
        btnNext.disabled = false
    }
})
prev.addEventListener("click",async()=>{
    if (page > 1) {
        page--;
        await afficherPage(page);
    }
})
await afficherFilter()

 let filters=document.querySelector("#filters")
 /*
 filters.addEventListener("click",async(e)=>{
    let button=e.target.closest("button")
    if (!button) {
        return;
    }
    for (let btn of filters.children) {
        btn.classList.remove("bg-red-500", "text-white");
        btn.classList.add("bg-white");
    }
    button.classList.remove("bg-white");
    button.classList.add("bg-red-500", "text-white");
    
    localStorage.setItem("typeFilter", button.textContent);


    if(button.textContent==="tous"){
        
        let allPok=await request("GET","/creatures")
    
        afficherFilterCards(allPok)
    }
    else{
        let pokType=await getpokymonByType(button.textContent)
        afficherFilterCards(pokType)
        
    }
 })

*/


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

 let typeSaved = localStorage.getItem("typeFilter")|| "tous";
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
    actualiserPokymon()
}






let search=document.querySelector("#search")
search.addEventListener("input",async()=>{
    if(search.value.trim()===""){
        let error_ = document.querySelector("#loading").nextElementSibling;
        error_.innerHTML = "";
        await afficherPage(1)
        return
    }else{

        await searchName(search.value)
    }
})



let sort=document.querySelector("#sort")
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
sort.addEventListener("change",async()=>{
    await actualiserPokymon();
})

let listPok=document.querySelector("#grid")
let idPok;
listPok.addEventListener("click",async (e)=>{

     let edit = e.target.closest("i");
    let article=e.target.closest("article")
    idPok=article.querySelector("#id").textContent
    let pok=await getpokymonById(idPok)
    if (edit) {
    
        let form=document.querySelector("#creature-form")
        for (let i of form.elements) {
              if (i.name) {
                if (i.name === "stat1") {
                    i.value = pok.stats.hp;
                }
                else if (i.name === "stat2") {
                    i.value = pok.stats.attack;
                }
                else if (i.name === "stat3") {
                    i.value = pok.stats.defence;
                }
                else {
                    i.value = pok[i.name];
                }
            }
        }
       document.querySelector("#update").classList.remove("hidden")
       document.querySelector("#submit").classList.add("hidden")
        return;
    }    
    afficherDetails(pok,"bg-black")

})


let inputs = addPok();

let form = document.querySelector("#creature-form");

inputs.type.addEventListener("change", async() => {
    inputs.type.nextElementSibling.textContent =
        inputs.type.value ? "Type valid" : "Choose a type";
});
form.addEventListener("submit", async(e) => {
    
    e.preventDefault();
    let allPok= await request("GET","/creatures")

    if (
         
        !inputs.validName() || !inputs.validLevel() ||
        !inputs.validDescription() || !inputs.validImage() ||
        !inputs.validSt() || !inputs.validSt2() ||
        !inputs.validSt3() || inputs.type.value === ""
    ) {
        return;
    }
    
    let maxId=0
    allPok.forEach(pok => {
        
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
            defence: inputs.st3.value
        },
        image: inputs.image.value,
        description: inputs.description.value
    };
    addPokymon(cart)
    
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


let update=document.querySelector("#update")
update.addEventListener('click',async(e)=>{
    e.preventDefault();
    
    if (
         
        !inputs.validName() || !inputs.validLevel() ||
        !inputs.validDescription() || !inputs.validImage() ||
        !inputs.validSt() || !inputs.validSt2() ||
        !inputs.validSt3() || inputs.type.value === ""
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
            defence: inputs.st3.value
        },
        image: inputs.image.value,
        description: inputs.description.value
    };
    await updatePokemon(newPok);
    form.reset()
    alert("Pokémon updated successfully!");
})

form.addEventListener("input", saveData);
getData()


