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
            const playedCardIndex = game.get('player').get('cards').findIndex(card => (card.get('_id').toString() === input.cardId));

            console.log(playedCardIndex);

            
            //Se ejecuta el turno del jugador
            var playerTurn = Cards.applyEffect(game.get('player'), game.get('monster'), game.get('player').get('cards')[playedCardIndex]);
            game['player'] = playerTurn['player'];
            game['monster'] = playerTurn['affectedPlayer'];

            console.log(game);
            
            //Se ejecuta el turno del monstruo
            const monsterCardIndex = Math.floor(Math.random() * (5 - 1) + 1)-1;         
            var monsterEffect = game.get('monster').get('cards')[monsterCardIndex];
            var monsterTurn = Cards.applyEffect(game.get('monster'), game.get('player'), game.get('monster').get('cards')[monsterCardIndex]);
            game['monster'] = monsterTurn['player'];
            game['player'] = monsterTurn['affectedPlayer'];
            
            //Se le asigna una nueva mano de cartas a cada jugador
            game['player']['cards'] = Cards.newHand(game.get('player').get('cards'), playedCardIndex);
            game['monster']['cards'] = Cards.newHand(game.get('player').get('cards'), monsterCardIndex);
            
            const newGame = await Game.findByIdAndUpdate(input.gameId, game, { new: true });

            console.log(newGame);
            
            return {
                game: newGame,
                monsterEffect: monsterEffect
            }
        }
    }
}

module.exports = resolvers;