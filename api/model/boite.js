let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BoiteSchema = Schema({
    id : String,
    libelle : String,
    description : String,
    poids : Number,
    dimensions : {
        longueur : Number,
        largeur : Number,
        hauteur : Number
    },
    contenu : [
        {
            libelle : String,
            typeC : String,
            quantite : Number
        }
    ] 
});


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Boite', BoiteSchema);
