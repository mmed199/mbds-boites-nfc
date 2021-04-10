import { conf } from "./conf.js"

let loading =  document.getElementById("container-loading")

async function scanner() {
    try {
        if ('NDEFReader' in window) { 
            const ndef = new NDEFReader();
            await ndef.scan();
        
            ndef.addEventListener("readingerror", () => {
            });
        
            ndef.addEventListener("reading", ({ message, serialNumber }) => {  
            });
        } else {
        }
      } catch (error) {
      }
}


async function writer(id) {
    document.getElementById("overlay").style.display = "block"
    document.getElementById("overlay-text").innerHTML = "Approchez le tag NFC"

    try {
        const ndef = new NDEFReader();
        ndef.write(id).then(() => {
            document.getElementById("overlay-text").innerHTML = "Done! Cliquez ici pour sortir"
        });
    } catch (error) {
    }
}

window.onload = function() {
    scanner()

    let container = document.getElementsByClassName("container")[0]
    setTimeout(() => {
        fetch(conf.api + "boites")
        .then(
            res => {     
                loading.style.display = "none"
                if (res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    res.status);
                    return;  
                }

                return res.json()       
            }
        ).then(
            json => {
                json.forEach(boite => {
                    container.innerHTML = container.innerHTML + conf.boiteHTML(boite)
                });

                let associers = document.getElementsByClassName("associer")
                for(let i = 0; i < associers.length; i++) {
                    let element = associers[i];
                    element.addEventListener("click", () => {
                        if(element.getAttribute("dataid")) {
                            writer(element.getAttribute("dataid"))
                        }
                    })
                }

                let modifiers = document.getElementsByClassName("modifier")
                for(let i = 0; i < modifiers.length; i++) {
                    let element = modifiers[i];
                    element.addEventListener("click", () => {
                        window.location.replace(conf.urls.MODIFY + element.getAttribute("dataid"))
                    })
                }

                let supprimers = document.getElementsByClassName("supprimer")
                for(let i = 0; i < supprimers.length; i++) {
                    let element = supprimers[i];
                    element.addEventListener("click", () => {
                        if (window.confirm("Vous allez supprimer une boite")) {
                            fetch(conf.api + "boites/" + element.getAttribute("dataid"), {
                                method: 'DELETE',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                }
                            }).then((json) => {
                                document.location.reload()
                            })
                        }
                    })
                }
            })
    }, 500)


    document.getElementById("overlay").addEventListener("click", () => {
        document.getElementById("overlay").style.display = "none"
    })

}