import { conf } from "./conf.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
console.log(id);

let libelle = document.getElementById("libelle")
let description = document.getElementById("description")
let longueur = document.getElementById("longueur")
let largeur = document.getElementById("largeur")
let hauteur = document.getElementById("hauteur")
let poids = document.getElementById("poids")


let boite = {
    id : "",
    libelle : "",
    description : "",
    poids : 0,
    dimensions : {
        longueur : 0,
        largeur : 0,
        hauteur : 0
    },
    contenu : [] 
}

document.getElementById("add-objet").addEventListener("click", (e) => {
    let libelle = document.getElementById("libelle-c")
    let quantite = document.getElementById("quantite")

    if(libelle.value == "" || quantite.value == "") {
        showerror("contenu", conf.addErrors.CONENT)
    } else {
        hideError("contenu")
        let contenu = {
            libelle : libelle.value,
            quantite : parseInt(quantite.value)
        }
        boite.contenu.push(contenu)
        
        showContenu()
        
        libelle.value = ""
        quantite.value = ""
    }
})


if(id) {
    fetch(conf.api + "boites/" + id)
        .then(
            res => {
                if (res.status !== 200) {
                    window.location.replace(conf.urls.LIST)
                }
                return res.json()
            }
        ).then(
            json => {
                if(json != null && !json.failed) {
                    console.log(json)
                    boite = json;
                    libelle.value = boite.libelle
                    description.value = boite.description
                    poids.value = boite.poids
                    largeur.value = boite.dimensions.largeur
                    longueur.value = boite.dimensions.longueur
                    hauteur.value = boite.dimensions.hauteur
                    showContenu()
                } else {
                    window.location.replace(conf.urls.LIST)
                }
            }
        ).catch((error) => {
            window.location.replace(conf.urls.LIST)
        })
    
    document.getElementById("add-box").innerText = "Edit"
    document.getElementById("add-box").addEventListener("click", (e) => {
        fetch(conf.api + "boites", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(boite)
          }).then(res => {
              console.log(res)
              window.location.replace("/pages/tags.html");
          })
    })

} else {
  
    document.getElementById("add-box").addEventListener("click", (e) => {        
        if(libelle.value == "" || description.value == "" || longueur.value == ""
            || largeur.value == "" || hauteur.value == "" || poids.value == "") {
            showerror("boite", conf.addErrors.BOX)
            window.scrollTo(0, 0)
        } else {
            boite.libelle = libelle.value
            boite.description = description.value
            boite.poids = parseFloat(poids.value)
            boite.dimensions.longueur = parseFloat(longueur.value)
            boite.dimensions.largeur = parseFloat(largeur.value)
            boite.dimensions.hauteur = parseFloat(hauteur.value)
    
            
            fetch(conf.api + "boites", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(boite)
              }).then(res => {
                  console.log(res)
                  window.location.replace(conf.urls.LIST);
              })
        }
    })
}




function showerror(id, message) {
    let errorDiv = document.getElementById(id + "-error")
    errorDiv.style.display = "block"
    errorDiv.innerText = message
}

function hideError(id) {
    let errorDiv = document.getElementById(id + "-error")
    errorDiv.style.display = "none"
    errorDiv.innerText = ""
}

function showContenu() {
    let container = document.getElementById("added-contenu")
    container.innerHTML = ""
    boite.contenu.forEach(c => {
        container.innerHTML += conf.contenu(c)
    })
    addListeners()
}

function addListeners() {
    let elements = document.querySelectorAll('.contenu-ligne>div:last-of-type')
    Array.from(elements).forEach(element => {
        element.addEventListener("click", () => {
            let libelle = element.getAttribute("data-storage")

            boite.contenu = boite.contenu.filter(c => c.libelle != libelle)
            showContenu()
        })
    })
}