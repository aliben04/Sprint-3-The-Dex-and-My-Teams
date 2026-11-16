export async function getPokymon(page,limit) {
    let listPok=[]
    
    let base_url= `http://localhost:3000/creatures?_page=${page}&_limit=${limit}`
    try{
        let response=await fetch(base_url).catch(
            error => {
                throw new Error("Network error");
        })
        if(!response.ok){
            throw new Error("Could not fetch Pokemon");
        }
        let data =await response.json()
        for(let pok of data){
            listPok.push(pok)
        }
        return listPok
    }catch(error){
        throw error
    }
    
}