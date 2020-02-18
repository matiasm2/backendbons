var Game = require('../database/Game')

var getCard = require('../game/cards');

var resolvers = {
    Query: {
        async Cards(root, { gameId }) {            
            return await Game.findById(gameId).Player.Cards;
        },
        async Game(root, { id }) {
            return await Game.findById(id);
        },
        // async Games (root) {            
        //     return await Game.find();
        // },
        async Monster(root, { gameId }) {            
            return await Game.findById(gameId).Monster;
        },
        async Player(root, { gameId }) {            
            return await Game.findById(gameId).Player;
        }        
    },
    Mutation: {
        async createGame(_, { input }) {
            console.log(getCard());
            
            const newGame = new Game({
                Player: {
                    name: input.playerName,
                    Cards: [getCard(), getCard(), getCard(), getCard()]
                }
                ,Monster: {
                    shield: 10,
                    Cards: [getCard(), getCard(), getCard(), getCard()]
                }});
            await newGame.save();
            return newGame;
        },
        async nextTurn(_, { gameId, input }){
            var game = Game.findById(gameId);
            return null
        }
    }
}

module.exports = resolvers;