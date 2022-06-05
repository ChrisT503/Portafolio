const  express =require('express');

const app=express();

//definir motor de plantillas  a utilizar 
app.set('view engine','jade');



app.get('/', function(req,res){
    res.render('index',
    {title:"Programacion Computacional IV",message: "Express con Jade"}
    );
});


app.route( '/test').get(function(req,res){
    res.send("Test Page");
});
const server = app.listen(3000);