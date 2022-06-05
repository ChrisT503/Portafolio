const req = require("express/lib/request");

const express = require('express');
var router = express.Router();

//Llamado al modelo.
const Student = require ("../models/student");
const { route } = require(".");


router.get('/', (req,res) => {
res.render('pages/student/studentAddEdit',{
    viewTitle: 'Nuevo Estudiante.'
});
})
router.post('/', (req,res) => {
    if(req.body._id == '')
    saveStudent(req,res);
    else
    updateStudent(req,res);
});

function saveStudent(req,res){
    var student = new Student();
    student.name = req.body.name;
    student.lastname= req.body.lastname;
    student.birthday= req.body.birthday;
    student.height= req.body.height;
    student.location= req.body.location;
    student.last_update= req.body.last_update;
    student.active= req.body.active;
    

    student.save(e => {
        if(e)
        console.log("Error", e)
        else
        res.redirect('student/studentList');
    });
}

function updateStudent(req, res){
    Student.findOneAndUpdate({_id: req.body._id},
    req.body, {new:true}, (err, doc) => {
        if (!err){
            res.redirect('student/studentList');
        }else{
            console.log("Error", err);
        }
    });
}

router.get('/studentList',(req, res) => {
    Student.find((err, docs)=>{
        if (!err){
            res.render('pages/student/studentList', {
                viewTitle: "Listado de estudiantes.",
                list: docs
            });
        }else {
            console.log("Error", err);
        }
    });
});

router.get('/:id', (req,res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('pages/student/studentAddEdit', {
                viewTitle: "Actualizar estudiantes.",
                student: doc
            })
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Student.findByIdAndRemove(req.params.id, e=> {
        if(e)
        console.log("Error", e);
        else
        res.redirect('/student/studentList');
    });
});

module.exports = router;