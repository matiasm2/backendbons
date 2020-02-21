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
    cards: [cardSchema]
})

var turnSchema = new mongoose.Schema({
    playedCard: cardSchema,
    monsterEffect: cardSchema
})

var gameSchema = new mongoose.Schema({
    player: playerSchema,
    monster: playerSchema,
    turns: [turnSchema]
})

module.exports = mongoose.model('Game', gameSchema);