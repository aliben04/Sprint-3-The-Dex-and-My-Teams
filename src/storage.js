export function getFilterType(){
    return JSON.parse(localStorage.getItem("types"))
}

export function setFilterType(data){
    localStorage.setItem("types",JSON.stringify(data))
}