import express  from "express";

import handlebars from 'express-handlebars';

import {Server, Socket} from 'socket.io';



import __dirname from './utils.js';
import viewRouter from './routes/views.routers.js';

const PORT = 8080;

const app = express();

app.use(express.static(__dirname +'public') );

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set ('view engine', 'handlebars');


app.use ('/', viewRouter);

const server = app.listen(PORT, ()=>{
    console.log('Servidor iniciado por puerto:'+ PORT)
} )

const socketServerIO = new Server(server);

const logs =[]

socketServerIO.on('connection', socket =>{
    console,log('usuario conectado');

    // socket.on("message2",data=>{
    //     socketServerIO.emit('log',data);
    // })
    socket.on ("messaje2", data =>{
        logs.push({socketid: socket.id, mesage: data});
        socketServerIO.emit('log',{logs})
    })
})