import { afficherCard } from "../script.js";
import { getpokymonByType, request } from "./service/api.js";
import { afficherFilter, afficherFilterCards, afficherPage } from "./ui.js";
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
 filters.addEventListener("click",async(e)=>{
    let button=e.target.closest("button")
    for (let btn of filters.children) {
        btn.classList.remove("bg-red-500", "text-white");
        btn.classList.add("bg-white");
    }
    button.classList.remove("bg-white");
    button.classList.add("bg-red-500", "text-white");
    if (!button) {
        return;
    }

    if(button.textContent==="tous"){
        
        let allPok=await request("GET","/creatures")
    
        afficherFilterCards(allPok)
    }
    else{
        let pokType=await getpokymonByType(button.textContent)
        afficherFilterCards(pokType)
        
    }
 })