export async function afficherPage(page) {
    afficherLoading()
    
    let pageNumber=document.querySelector("#pageNumber")
    pageNumber.textContent = `Page ${page}`;
    try {
        let listPok = await loadlinks(page);
        document.querySelector("#grid").innerHTML = "";

        if(listPok.length===0){
            afficherEmpty();
            return;
        }
        for (let poky of listPok) {
            afficherCard(poky);
        }
        afficherFilter()

    } catch (error) {
        afficherError(page,error);
    }finally{
        hideLoading()
    }
    
}


function afficherError(page,error) {
    let error_=document.querySelector("#loading").nextElementSibling
    let createError=document.createElement("div")
    createError.className="text-center p-5 flex flex-col justify-center items-center w-full col-span-full"

    createError.innerHTML = `
        
            <p>${error}</p>
            <p>Check your Internet connection.</p>

            <button id="retry" class="btn-primary bg-blue-500 text-white p-2 rounded">
                Réessayer
            </button>
    `;
    error_.innerHTML=""
    error_.append(createError)

    document.querySelector("#retry").addEventListener("click", () => {
        afficherPage(page);
    });
}

function afficherEmpty() {
    document.querySelector("#grid").innerHTML = `
        <p>Aucune créature trouvée.</p>
    `;
}
export function afficherLoading() {
    document.querySelector("#grid").innerHTML =""
    let loading=document.querySelector("#loading")
    loading.classList.remove("hidden")
    loading.classList.add("flex")
    
}

export function hideLoading() {
    let loading=document.querySelector("#loading")
    loading.classList.remove("flex")
    loading.classList.add("hidden")
    
}
