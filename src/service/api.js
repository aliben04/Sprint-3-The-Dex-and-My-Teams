export async function request (method, route, body = null) {
    let listPok=[]
    
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
        console.log(data)
        return data


    }catch(error){
        throw error
    }
    
}

export async function getpokymonByType(type){
    return request("GET",`/creatures?type=${type}`)
}
export async function searchByName(name) {

    let route = `/creatures?name=${encodeURIComponent(name.toLowerCase())}`;

    let response = await request("GET", route);

    if (response.length !== 0) {
        return response;
    } else {
        return null;
    }
}