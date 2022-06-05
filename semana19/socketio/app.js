var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = 0;

app.get('/', (req,res) =>  {

    res.sendFile(__dirname+ '/index.html');

});

io.on('connection',(socket) => {
    clients++;
    io.sockets.emit('broadcast',{
        total: clients + 'Clientes Conectados'
    });

    console.log('Un usuario  se ha conectado');

    socket.on('disconnect', () => {
        clients--;
        io.sockets.emit('broadcast',{
            total: clients + 'Clientes Conectados'
        }); 
    });


    //Recibiendo datos del cliente 
    socket.on('clientMessage', (data)=> {
        console.log(data);
    });
    setTimeout(() => {
        socket.send('Mensaje del servidor al cliente'); 
    }, 3000);

    socket.on('disconnect', ()=> {
        console.log('Se desconect un  usuario');
    })
    

});

http.listen(3000,() => {
    console.log('Escuchando puerto 3000');
});


