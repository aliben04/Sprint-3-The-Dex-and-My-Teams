import { creatures } from "./data.js";
import { afficherCard } from "./src/ui.js";
// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------

let div = document.querySelector("#darkMode");

div.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.querySelector(".i").classList.toggle("fa-regular")
    document.querySelector(".i").classList.toggle("fa-solid")
});
let cmp=document.querySelector("#cmp")

export let teams = JSON.parse(localStorage.getItem("teams")) || [];
let tem = teams;







cmp.textContent=teams.length


      
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------

// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------
let listPok=JSON.parse(localStorage.getItem("listPok"))|| [];

if(listPok.length!==0){
    listPok.forEach((p)=>{
        afficherCard(p)
    })
}

function validation(input, regex, message) {
    let error = input.nextElementSibling;

    input.addEventListener("input", () => {
        let valid = regex.test(input.value);

        error.textContent = valid ? message + " valid" : message + " invalid";
        error.className = valid ? "text-green-500" : "text-red-500";

        input.style.border = valid ? "2px solid green" : "2px solid red";
        input.style.boxShadow = valid ? "2px 2px 5px green" : "2px 2px 5px red";

    });

    return () => regex.test(input.value);
}
export function addPok() {

   
    let name = document.querySelector('[name="name"]');
    let level = document.querySelector('[name="level"]');
    let description = document.querySelector('[name="description"]');
    let image = document.querySelector('[name="image"]');
    let type = document.querySelector('[name="type"]');

    let st = document.querySelector('[name="stat1"]');
    let st2 = document.querySelector('[name="stat2"]');
    let st3 = document.querySelector('[name="stat3"]');

   
    let validName = validation(name, /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/, "Name");
    let validLevel = validation(level, /^(Niveau|Level)\s\d$/, "Level");
    let validDescription = validation(description, /^[\s\S]{10,200}$/, "Description");
    let validImage = validation(image, /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i, "Image");

    let validSt = validation(st, /^\d{1,3}$/, "Stats");
    let validSt2 = validation(st2, /^\d{1,3}$/, "Stats");
    let validSt3 = validation(st3, /^\d{1,3}$/, "Stats");

   return {
         name, level, description, image, type, st, st2, st3
         , validName, validLevel, validDescription,
        validImage, validSt, validSt2, validSt3
    };
}
addPok()

// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------

// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
