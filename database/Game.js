var mongoose     = require('mongoose');

var cardSchema = new mongoose.Schema({
    effect: String,
    value: Number
})

var playerSchema = new mongoose.Schema({
    name:  {
        type: String
    },
    hp:  {
        type: Number,
        default: 20
    },
    shield:  {
        type: Number,
        default: 0
    },
    Cards: [cardSchema]
})

var turnSchema = new mongoose.Schema({
    cardPlayed: cardSchema
})

var gameSchema = new mongoose.Schema({
    Player: playerSchema,
    Monster: playerSchema,
    Turns: [turnSchema]
})

module.exports = mongoose.model('Game', gameSchema);