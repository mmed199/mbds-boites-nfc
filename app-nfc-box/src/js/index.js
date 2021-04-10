import { conf } from "./conf.js"

document.getElementById('associateTag').href = conf.urls.LIST
document.getElementById('addTag').href = conf.urls.ADD

let id = 0;

let scanButton = document.getElementById('scanButton')
let errorDiv = document.getElementById('error')
let boiteInfo = document.getElementById('boite-info')
let overlay = document.getElementById("overlay")

async function scanner() { 
    try {
        const ndef = new NDEFReader();
        await ndef.scan();
    
        ndef.addEventListener("readingerror", () => {
            showError(conf.messages.READING_ERROR)
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            for (const record of message.records) {
                
                if(record.recordType == "text") {
                    const textDecoder = new TextDecoder(record.encoding)
                    searchBox(textDecoder.decode(record.data))
                }
            }
        });

      } catch (error) {
            showError(conf.messages.READING_ERROR)
      }
}


function showError(message) {
    boiteInfo.style.display = "none"
    scanButton.style.display = "none"
    errorDiv.style.display = "flex"
    errorDiv.innerHTML = message
}

function searchBox(id) {
    overlay.style.display = "block"
    setTimeout(() => {
        fetch(conf.api + "boites/" + id)
            .then(
                res => {
                    overlay.style.display = "none"
                    if (res.status !== 200) {
                        showError(conf.messages.NONE)
                        return;  
                    }

                    return res.json()
                }
            ).then(
                json => {
                    if(json != null && !json.failed) {
                        errorDiv.style.display = "none"
                        scanButton.style.display = "none"
                        boiteInfo.innerHTML = conf.boiteDetaileHTML(json)
                        boiteInfo.style.display = "block"

                        document.getElementById("btnmodifier").addEventListener("click", () => {
                            window.location.replace(conf.urls.MODIFY + id)
                        })
                        
                    } else {
                        showError(conf.messages.NONE)
                    }
                }
            ).catch((error) => {
                showError(conf.messages.NONE)
            })
        }, 600)
}


window.onload = function() {
    if ('NDEFReader' in window) {
        navigator.permissions.query({ name: 'nfc'}).then(result => {
            if (result.state === 'granted') {
                scanner() 
            } else {
                document.getElementById("scanButtonText").innerHTML = conf.messages.FIRST_TIME
                scanButton.addEventListener("click", () => {
                    scanner()
                })
            }
        })
    } else {
        showError(conf.messages.NOT_SUPPORTED )
    }

}