const Tweet = require("../models/Tweet");

module.exports = {

    async index(req, res){
        const tweets = await Tweet.find({}).sort("-createdAt"); //procure por TODOS os tweets e ordene eles por mais recentes (createdAt menor em cima)
        
        return res.json(tweets); //retorna os tweets como JSON
    },                                              

    async store(req, res){
        const tweet = await Tweet.create(req.body); //armazenar novo tweet
    
        req.io.emit("tweet", tweet); //dispara um evento para todos conectados na aplicacao (sera consumido pela interface)

        return res.json(tweet); //retorna as infos do tweet armazenado no banco
    }

};