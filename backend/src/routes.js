const express = require("express");

const routes = express.Router();

const TweetController = require("./controllers/TweetController"); //importa os metodos do controller pra usar em determinada rota
const LikeController = require("./controllers/LikeController");

routes.get('/tweets', TweetController.index);  //metodo http get para buscar info
routes.post('/tweets', TweetController.store); //metodo http post para enviar uma info

routes.post('/likes/:id', LikeController.store); //rota /likes com PARAMETRO id passado no post.

module.exports = routes;  //apos definir as rotas, exporta-las para poder importa-las no index.js