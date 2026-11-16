import { afficherPage } from "./ui.js";
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