const req = require("express/lib/request");

const express = require('express');
var router = express.Router();

//Llamado al modelo.
const Asig = require ("../models/asignanmet");
const { route } = require(".");


router.get('/', (req,res) => {
res.render('pages/asignanmet/asigAddEdit',{
    viewTitle: 'Nueva Asignación.'
});
})
router.post('/', (req,res) => {
    if(req.body._id == '')
    saveAsig(req,res);
    else
    updateAsig(req,res);
});

function saveAsig(req,res){
    var asig = new Asig();
    asig.grade = req.body.grade;
    asig.name= req.body.name;
    asig.e_id= req.body.e_id;
    asig.c_id= req.body.c_id;

    asig.save(e => {
        if(e)
        console.log("Error", e)
        else
        res.redirect('asignanmet/asigList');
    });
}

function updateAsig(req, res){
    Asig.findOneAndUpdate({_id: req.body._id},
    req.body, {new:true}, (err, doc) => {
        if (!err){
            res.redirect('asignanmet/asigList');
        }else{
            console.log("Error", err);
        }
    });
}

router.get('/asigList',(req, res) => {
    Asig.find((err, docs)=>{
        if (!err){
            res.render('pages/asignanmet/asigList', {
                viewTitle: "Listado de Asignación.",
                list: docs
            });
        }else {
            console.log("Error", err);
        }
    });
});

router.get('/:id', (req,res) => {
    Asig.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('pages/asignanmet/asigAddEdit', {
                viewTitle: "Actualizar Asignación.",
                asig: doc
            })
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Asig.findByIdAndRemove(req.params.id, e=> {
        if(e)
        console.log("Error", e);
        else
        res.redirect('/asignanmet/asigList');
    });
});

module.exports = router;