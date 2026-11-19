export function getFilterType(){
    return JSON.parse(localStorage.getItem("types"))
}

export function setFilterType(data){
    localStorage.setItem("types",JSON.stringify(data))
}

export function setValeu(data) {
    sessionStorage.setItem("valeu", JSON.stringify(data));
}
export function getValeus() {
    return JSON.parse(sessionStorage.getItem("valeu")) || {};
}