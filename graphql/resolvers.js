var Game = require('../database/Game')

var getCard = require('../game/cards');

var resolvers = {
    Query: {
        async Cards(root, { gameId }) {
            var cards = await Game.findById(gameId);                      
            return cards.get('player').get('cards');
        },
        async Game(root, { id }) {
            return await Game.findById(id);
        },
        // async Games (root) {            
        //     return await Game.find();
        // },
        async Monster(root, { gameId }) {    
            const monster = await Game.findById(gameId);
            return monster.get('monster');
        },
        async Player(root, { gameId }) { 
            const player = await Game.findById(gameId);           
            return player.get('player');
        }        
    },
    Mutation: {
        async createGame(_, { input }) {
            console.log(getCard());
            
            const newGame = new Game({
                player: {
                    name: input.playerName,
                    cards: [getCard(), getCard(), getCard(), getCard()]
                }
                ,monster: {
                    shield: 10,
                    cards: [getCard(), getCard(), getCard(), getCard()]
                }});
            await newGame.save();
            return newGame;
        },
        async nextTurn(_, { input }){
            var game = await Game.findById(input.gameId);
            
            var playedCard = game.get('player').get('cards').find(card => (card._id=input.cardId));
            var monsterEffect = game.get('monster').get('cards')[Math.floor(Math.random() * (5 - 1) + 1)-1]
            return {
                Game: game,
                monsterEffect: monsterEffect
            }
        }
    }
}

module.exports = resolvers;