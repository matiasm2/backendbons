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
            var turn = {};

            //Se ejecuta el turno del jugador
            if (input.cardId){
                const playedCardIndex = game.get('player').get('cards').findIndex(card => (card.get('_id').toString() === input.cardId));
                if (playedCardIndex != -1){
                    var playerTurn = Cards.applyEffect(game.get('player'), game.get('monster'), game.get('player').get('cards')[playedCardIndex]);
                    game['player'] = playerTurn['player'];
                    game['monster'] = playerTurn['affectedPlayer'];
                    turn['playedCard'] = game.get('player').get('cards')[playedCardIndex];
                    game['player']['cards'] = Cards.newHand(game.get('player').get('cards'), playedCardIndex);
                } 
            }
            
            //Se ejecuta el turno del monstruo
            const monsterCardIndex = Math.floor(Math.random() * (5 - 1) + 1)-1;         
            var monsterEffect = game.get('monster').get('cards')[monsterCardIndex];
            var monsterTurn = Cards.applyEffect(game.get('monster'), game.get('player'), game.get('monster').get('cards')[monsterCardIndex]);
            game['monster'] = monsterTurn['player'];
            game['player'] = monsterTurn['affectedPlayer'];
            turn['monsterEffect'] = game.get('monster').get('cards')[monsterCardIndex];
            game['monster']['cards'] = Cards.newHand(game.get('monster').get('cards'), monsterCardIndex);

            game['turns'].push(turn)   
            const newGame = await Game.findByIdAndUpdate(input.gameId, game, { new: true });            
            
            return {
                game: newGame,
                monsterEffect: monsterEffect,
                turnsPlayed: game['turns'].length
            }
        }
    }
}

module.exports = resolvers;