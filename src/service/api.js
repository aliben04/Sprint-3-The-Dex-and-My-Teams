export async function request (method, route, body = null) {

    let base_url=  `http://localhost:3000${route}` 
    try{
        let options = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if(body!==null){
            options.body=JSON.stringify(body)
        }

        let response=await fetch(base_url,options).catch(
            error => {
                throw new Error("Network error");
        })
        if(!response.ok){
            throw new Error("API request failed");
        }
        let data =await response.json()
        console.log(base_url)
        return data


    }catch(error){
        throw error
    }
    
}
/*
export async function getpokymonByType(type){
    return request("GET",`/creatures?type=${type}`)
}*/
export async function searchByName(name) {

    let route = `/creatures?name=${encodeURIComponent(name.toLowerCase())}`;

    let response = await request("GET", route);

    if (response.length !== 0) {
        return response;
    } else {
        return null;
    }
}
/*
export async function sortpokymon(sortType){
      let route = "";

    if (sortType === "asc") {
        route = "/creatures?_sort=name&_order=asc";
    } 
    else if (sortType === "desc") {
        route = "/creatures?_sort=name&_order=desc";
    } 
    else if (sortType === "id") {
        route = "/creatures?_sort=id&_order=asc";
    }
     return await request("GET", route);

}
*/
export async function getPokymon(type, sortType) {

    let route = "/creatures?";

    if (type && type !== "tous") {
        route += `type=${type}&`;
    }

    if (sortType === "asc") {
        route += "_sort=name&_order=asc";
    }
    else if (sortType === "desc") {
        route += "_sort=name&_order=desc";
    }
    else if (sortType === "id") {
        route += "_sort=id&_order=asc";
    }
    else {
        route = route.endsWith("&") ? route.slice(0, -1) : route;
    }

    return await request("GET", route);
}

export async function getpokymonById(id){
    return request("GET",`/creatures/${Number(id)}`)
}
export function addPokymon(pokymon){
    return request("POST","/creatures",pokymon)
}

export async function updatePokemon(newPok) {
    return await request("PUT",`/creatures/${newPok.id}`,newPok)
}
export async function deletePokemon(id) {
    return await request("DELETE",`/creatures/${id}`)
}