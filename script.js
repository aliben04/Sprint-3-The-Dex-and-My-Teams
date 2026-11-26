import { creatures } from "./data.js";
import { afficherCard } from "./src/ui.js";

let div = document.querySelector("#darkMode");

div.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".i").classList.toggle("fa-regular");
  document.querySelector(".i").classList.toggle("fa-solid");
});
let cmp = document.querySelector("#cmp");

export let teams = JSON.parse(localStorage.getItem("teams")) || [];

cmp.textContent = teams.length;

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

  let validName = validation(
    name,
    /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,
    "Name",
  );
  let validLevel = validation(level, /^(Niveau|Level)\s\d$/, "Level");
  let validDescription = validation(
    description,
    /^[\s\S]{10,200}$/,
    "Description",
  );
  let validImage = validation(
    image,
    /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,
    "Image",
  );

  let validSt = validation(st, /^\d{1,3}$/, "Stats");
  let validSt2 = validation(st2, /^\d{1,3}$/, "Stats");
  let validSt3 = validation(st3, /^\d{1,3}$/, "Stats");

  return {
    name,
    level,
    description,
    image,
    type,
    st,
    st2,
    st3,
    validName,
    validLevel,
    validDescription,
    validImage,
    validSt,
    validSt2,
    validSt3,
  };
}
addPok();
