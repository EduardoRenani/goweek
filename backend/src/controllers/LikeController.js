const Tweet = require("../models/Tweet");

module.exports = {
    async store(req, res){
        const tweet = await Tweet.findById(req.params.id); //procura o tweet expecifico passado por parametro dentro da DB
        
        tweet.set({likes: tweet.likes + 1}); //altera localmente o valor do campo likes desse tweet para incrementar 1

        await tweet.save(); //salva esse objeto no DB

        req.io.emit("like", tweet); //dispara um evento para todos conectados na aplicacao (sera consumido pela interface)

        return res.json(tweet); //retorna as infos do tweet

    },
}