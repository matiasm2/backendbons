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
        Player: Player
        Monster: Monster
        Turns: [Turn]
    }
    input GameInput {
        playerName: String!
    }
    type Player {
        _id: ID
        name: String
        hp: Int
        shield: Int
        Cards: [Card]
    }
    type Monster {
        _id: ID
        hp: Int
        shield: Int
        Cards: [Card]
    }
    type Turn {
        _ID: ID
        CardPlayed: Card
        Game: Game
        monsterEffect: Monster
    }
    input TurnInput{
        cardId: ID

    }
    


    
    type Mutation {
        createGame(input: GameInput): Game
        nextTurn(gameId: ID, input: TurnInput): Turn
    }
`

module.exports = graphqlTools.makeExecutableSchema({
    typeDefs:typeDef,
    resolvers:resolvers
})