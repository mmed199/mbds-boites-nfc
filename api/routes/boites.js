let Boite = require('../model/boite');


// La liste des boites
function getBoites(req, res){
    Boite.find((err, boites) => {
        if(err){
            res.send(err)
        }
        res.send(boites);
    });
}

// Une seule boite par ID
function getBoite(req, res){
    let id = req.params.id;
    console.log(id)
    Boite.findOne({_id: id}, (err, boite) =>{
        if(err){
            res.send({
                failed:true,
                error:err
            })
        } else {
            res.json(boite)
        }
    })
}

// Ajouter une boite
function postBoite(req, res){
    let boite = new Boite(req.body);
    console.log("POST boite reçu :");
    console.log(boite)
    
    
    boite.save( (err) => {
        if(err){
            console.log(err)
            res.status(400).send("Cannot save this Boite")
        } else {
            res.json({ message: `${boite.libelle} saved!`})
        }
    })
}

// Modifier une boite
function updateBoite(req, res) {
    b = new Boite(req.body)
    
    Boite.findByIdAndUpdate(req.body._id, b, {new: true}, (err, boite) => {
        if (err) {
            console.log(err);
            res.json({error : true, message : err})
        } else {
          res.json({error : false, boite : boite})
        }
    });
}

// Supprimer une boite
function deleteBoite(req, res) {
    let boiteId = req.body.id || req.params.id

    Boite.deleteOne({_id: boiteId}, (err, b) => {
        if(err){
            res.send(err)
        }

        res.json(b)
    })
}

module.exports = { getBoites, getBoite, postBoite, updateBoite, deleteBoite };
