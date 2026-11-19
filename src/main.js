import { afficherCard } from "../script.js";
import { getpokymonByType, request, sortpokymon } from "./service/api.js";
import { actualiserPokymon, afficherError, afficherFilter, afficherFilterCards, afficherPage, searchName } from "./ui.js";
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
    let pokType = await getpokymonByType(typeSaved);
    afficherFilterCards(pokType);
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
