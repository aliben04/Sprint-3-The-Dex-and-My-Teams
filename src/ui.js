import { afficherCard } from "../script.js";
import {  request, searchByName } from "./service/api.js";





export async function afficherPage(page) {
    afficherLoading()
   
    let pageNumber=document.querySelector("#pageNumber")
    pageNumber.textContent = `Page ${page}`;
    try {
        let listPok = await request("GET",`/creatures?_page=${page}&_limit=12`);
        document.querySelector("#grid").innerHTML = "";

        if(listPok.length===0){
            afficherEmpty();
            return;
        }
        for (let poky of listPok) {
            afficherCard(poky);
        }
        

    } catch (error) {
        afficherError(page,error);
    }finally{
        hideLoading()
    }
    
}


function afficherError(page,error) {
    let error_=document.querySelector("#loading").nextElementSibling
    let createError=document.createElement("div")
    createError.className="text-center p-5 flex flex-col justify-center items-center w-full col-span-full"

    createError.innerHTML = `
        
            <p>${error}</p>
            

            <button id="retry" class="btn-primary bg-blue-500 text-white p-2 rounded">
                Réessayer
            </button>
    `;
    error_.innerHTML=""
    error_.append(createError)

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
    document.querySelector("#grid").innerHTML =""
    let loading=document.querySelector("#loading")
    loading.classList.remove("hidden")
    loading.classList.add("flex")
    
}

export function hideLoading() {
    let loading=document.querySelector("#loading")
    loading.classList.remove("flex")
    loading.classList.add("hidden")
    
}


export function checkColor(type) {
    let typeShape = "";

    switch (type.toLowerCase()) {
        case "fire": typeShape = "bg-orange-500"; break;
        case "water": typeShape = "bg-blue-500"; break;
        case "grass": typeShape = "bg-green-500"; break;
        case "electric": typeShape = "bg-yellow-400"; break;
        case "ice": typeShape = "bg-cyan-300"; break;
        case "fighting": typeShape = "bg-red-700"; break;
        case "poison": typeShape = "bg-purple-500"; break;
        case "ground": typeShape = "bg-amber-700"; break;
        case "flying": typeShape = "bg-indigo-400"; break;
        case "psychic": typeShape = "bg-pink-500"; break;
        case "bug": typeShape = "bg-lime-500"; break;
        case "rock": typeShape = "bg-stone-500"; break;
        case "ghost": typeShape = "bg-violet-700"; break;
        case "dragon": typeShape = "bg-indigo-700"; break;
        case "dark": typeShape = "bg-gray-800"; break;
        case "steel": typeShape = "bg-slate-500"; break;
        case "fairy": typeShape = "bg-pink-300"; break;
        case "normal": typeShape = "bg-gray-400"; break;
        default: typeShape = "bg-gray-400";
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
    "Fairy"
];
export async function afficherFilter(){
       
    let filters=document.querySelector("#filters")
    filters.innerHTML=""
    types.forEach((t)=>{
        
        let button=document.createElement("button")
        button.textContent=t;
        button.className="btn chip shrink-0"
        filters.appendChild(button)
    })
}
export async function afficherFilterCards(list) {
    document.querySelector("#grid").innerHTML = ""
    list.forEach((p)=>{
        afficherCard(p)
    })
}

export function showErrorSearch(error) {

    let error_ = document.querySelector("#loading").nextElementSibling;

    let createError = document.createElement("div");

    createError.className = "text-center p-5 flex flex-col justify-center items-center w-full col-span-full";

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
    afficherLoading()
    try {
        
        document.querySelector("#grid").innerHTML = ""
        let pokymon=await searchByName(name)
        if(pokymon!==null){
            pokymon.forEach(p=>{
                afficherCard(p)
            })
        }else{
           throw new Error("Creature not found. Please enter its full name and check the spelling"); 
        }
    } catch (error) {
        showErrorSearch(error.message)
    }finally{
        hideLoading()
    }

    
}



