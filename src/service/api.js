async function getPokymon() {
    let base_url="http://localhost:3000/creatures/"
    try{
        let response=await fetch(base_url).catch(
            throw new Error("");
            
        )
    }
    
}