const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(  //schema do banco de dados
    {
        author: String,
        content: String,
        likes:  {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

module.exports = mongoose.model("Tweet", TweetSchema);