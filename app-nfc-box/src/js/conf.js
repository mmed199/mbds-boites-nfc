let config = {
    api : "https://apiboites.herokuapp.com/api/",
    boiteHTML : function(boite) {
        return `
        <div class="boite-info">
            <div class="boite-header">
                    <div>
                        <div class="boite-title">`+ boite.libelle + `</div>
                        <div class="boite-dimensions">`+ boite.dimensions.longueur + ` cm x `
                            + boite.dimensions.largeur + ` cm x `
                            + boite.dimensions.hauteur + 
                        ` cm</div>
                    </div>
                    <div class="noselect supprimer" dataid="` + boite._id + `"><i class="far fa-trash-alt"></i></div>
                    <div class="noselect modifier" dataid="` + boite._id + `">Modifier</div>
                    <div class="noselect associer" dataid="` + boite._id + `">Associer</div>
            </div>
            <div class="boite-desc">`+ boite.description + `</div>
        </div>
        `
    },
    boiteDetaileHTML : function(boite) {

        let contenu = ''
        boite.contenu.forEach(element => {
            contenu += `
                <div class='contenu-ligne'>
                    <div> ` + element.libelle + `</div>
                    <div> ` + element.quantite + `</div>
                </div>
            `
        });


        return `   
            <div class="boite-header">
                    <div class="boite-title">`+ boite.libelle + `</div>
                    <div class="boite-dimensions"> 
                        <div><i class="fal fa-ruler-triangle" ></i></div>
                        <div>`
                        + boite.dimensions.longueur + ` cm x `
                        + boite.dimensions.largeur + ` cm x `
                        + boite.dimensions.hauteur + 
                        ` cm</div>
                    <div><i class="far fa-weight-hanging"></i></div>
                    <div>`+ boite.poids +` kg</div>
                    </div>
            </div>
            <div class="boite-desc">` + boite.description + `</div>
            <div class="contenu">` + contenu + `</div>
            <div> <span class="button" id="btnmodifier">Modifier</span> </div>
        `
    },

    contenu : function(contenu) {
        return `
                <div class='contenu-ligne'>
                    <div> ` + contenu.libelle + ` <span >(` + contenu.quantite + `)</span></div>
                    <div data-storage="` + contenu.libelle + `"><i class="fas fa-times"></i></div>
                </div>
          `
    },

    messages: {
        NONE : "Aucune boite trouvée! Essayez une autre boite",
        FIRST_TIME : "Cliquez ici, Autorisez NFC pour ce site, puis Scannez votre boite!",
        NOT_SUPPORTED : "Cette appareil ne supporte pas Web NFC, utilisez le navigateur Chrome sur un mobile",
        READING_ERROR : "Erreur de lecture! veuillez activer le NFC, et l'autoriser pour notre site",
    },

    addErrors : {
        CONENT : "Veuillez remplir les deux champs requis.",
        BOX : "Veuillez remplir tous les champs requis."
    },
    urlsHTML : {
        INDEX : "/",
        ADD : "/pages/add.html",
        MODIFY : "/pages/add.html?id=",
        LIST:"/pages/tags.html"
    },
    urlsNODE : {
        INDEX : "/",
        ADD : "/add",
        MODIFY : "/modify?id=",
        LIST:"/tags"
    }
}

config.urls = config.urlsHTML

export const conf = config