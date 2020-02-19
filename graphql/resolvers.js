var Game = require('../database/Game')

var Cards = require('../game/cards');

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
            console.log(Cards.getCard());
            
            const newGame = new Game({
                player: {
                    name: input.playerName,
                    cards: [Cards.getCard(), Cards.getCard(), Cards.getCard(), Cards.getCard()]
                }
                ,monster: {
                    shield: 10,
                    cards: [Cards.getCard(), Cards.getCard(), Cards.getCard(), Cards.getCard()]
                }});
            await newGame.save();
            return newGame;
        },
        async nextTurn(_, { input }){
            var game = await Game.findById(input.gameId);
            const playedCardIndex = cards.findIndex(card => (card.get('_id').toString() === input.cardId));

            const monsterCardIndex = Math.floor(Math.random() * (5 - 1) + 1)-1;
            
            var monsterEffect = game.get('monster').get('cards')[monsterCardIndex]
            
            const newGame = await Game.update({ _id: input.gameId}, {
                player: {
                    cards: Cards.newHand(game.get('player').get('cards'), playedCardIndex)
                },
                monster: {
                    cards: Cards.newHand(game.get('player').get('cards'), monsterCardIndex)
                }
            });

            
            return {
                Game: newGame,
                monsterEffect: monsterEffect
            }
        }
    }
}

module.exports = resolvers;