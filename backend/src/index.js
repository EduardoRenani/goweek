const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);  //uso do socket.io para que o server ouça tambem o protocolo webSocket
const io = require("socket.io")(server);    //para que o server entenda as requisicoes real-time

mongoose.connect(
    "mongodb://eduardo-goweek:goweek123@ds023500.mlab.com:23500/goweek-backend",
    {useNewUrlParser: true}
);

app.use( (req, res, next) =>{  //middleware que intercepta a requisicao
    
    req.io = io;    //adiciona a variavel io ao req.param de todas as requisicoes

    return next();  //faz a tratativa da rota e segue pra proxima requisicao 
});                                                                                                                                     
                                                                                                                                    
app.use(cors()); //modulo de seguranca que permite outras aplicacoes (nosso front-end) acessarem as informacoes do nosso backend
app.use(express.json()); //diz pro express que todas as requisicoes serao passadas como JSON
app.use(require("./routes"));  //usar o arquivo de rotas exportado em routes.js

server.listen(3000, () => {     //variavel server que aceita tanto WS como HTTP
    console.log("Server started on port 3000");
}); 