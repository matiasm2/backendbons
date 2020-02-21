var graphqlTools = require('graphql-tools');
var resolvers = require('./resolvers')
const typeDef = `
    type Query{
        Cards(gameId: ID!): [Card]
        Game(id: ID!): Game
        #Games: [Game]
        Monster(gameId: ID!): Monster
        Player(gameId: ID!): Player
    }

    
    type Card {
        _id: ID
        effect: String
        value: Int
    }
    type Game {
        _id: ID
        player: Player
        monster: Monster
        turns: [Turn]
    }
    input GameInput {
        playerName: String!
    }
    type Monster {
        _id: ID
        hp: Int
        shield: Int
        cards: [Card]
    }
    type Player {
        _id: ID
        name: String
        hp: Int
        shield: Int
        cards: [Card]
    }
    type PlayedTurn{
        game: Game
        monsterEffect: Card
        turnsPlayed: Int
    }


    type Turn {
        _id: ID
        playedCard: Card
        monsterEffect: Card
    }
    input TurnInput{
        gameId: ID!
        cardId: ID
    }
    


    
    type Mutation {
        createGame(input: GameInput): Game
        #nextTurn(gameId: ID, cardId: ID): Turn
        nextTurn(input: TurnInput): PlayedTurn
    }
`

module.exports = graphqlTools.makeExecutableSchema({
    typeDefs:typeDef,
    resolvers:resolvers
})