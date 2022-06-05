const req = require("express/lib/request");

const express = require('express');
var router = express.Router();

//Llamado al modelo.
const Class = require ("../models/class");
const { route } = require(".");


router.get('/', (req,res) => {
res.render('pages/class/classAddEdit',{
    viewTitle: 'Nueva Clase.'
});
})
router.post('/', (req,res) => {
    if(req.body._id == '')
    saveClass(req,res);
    else
    updateClass(req,res);
});

function saveClass(req,res){
    var classe = new Class();
    classe.name = req.body.name;
    classe.save(e => {
        if(e)
        console.log("Error", e)
        else
        res.redirect('class/classList');
    });
}

function updateClass(req, res){
    Class.findOneAndUpdate({_id: req.body._id},
    req.body, {new:true}, (err, doc) => {
        if (!err){
            res.redirect('class/classList');
        }else{
            console.log("Error", err);
        }
    });
}

router.get('/classList',(req, res) => {
    Class.find((err, docs)=>{
        if (!err){
            res.render('pages/class/classList', {
                viewTitle: "Listado de clases.",
                list: docs
            });
        }else {
            console.log("Error", err);
        }
    });
});

router.get('/:id', (req,res) => {
    Class.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('pages/class/classAddEdit', {
                viewTitle: "Actualizar clase.",
                class: doc
            })
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Class.findByIdAndRemove(req.params.id, e=> {
        if(e)
        console.log("Error", e);
        else
        res.redirect('/class/classList');
    });
});

module.exports = router;