var graphqlTools = require('graphql-tools');
var resolvers = require('./resolvers')
const typeDef = `
    type Query{
        cards(id: Int): [Card]
        game(id: Int!): Game
        monster(id: Int): Monster
        player(id: Int): Player
    }

    
    type Card {
        _id: ID
        effect: Effect
        value: Int
    }
    type Effect{
        _id: ID
        effect: String
    }
    type Game {
        _id: ID
        player: Player
        monster: Monster
        turn: [Turn]
    }
    input GameInput {
        playerName: String!
    }
    type Player {
        _id: ID
        name: String
        hp: Int
        shield: Int
        cards: [Card]
    }
    type Monster {
        _id: ID
        hp: Int
        shield: Int
        cards: [Card]
    }
    type Turn {
        _ID: ID
        cardPlayed: Card
    }
    


    
    type Mutation {
        createGame(input: GameInput): Game
    }
`

module.exports = graphqlTools.makeExecutableSchema({
    typeDefs:typeDef,
    resolvers:resolvers
})