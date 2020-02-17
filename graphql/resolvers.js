var resolvers = {
    Query: {
        game: (root, args) => {
            return {
                _id: 1
            }
        }
    },
    Mutation: {
        createGame(_, { input }) {
            console.log(input);
            console.log(input.playerName);
            

            return {
                _id: 0,
                player: {
                    name: input.playerName,
                    hp: 20,
                    shield: 0,
                    card: []
                },
                monster: {
                    hp: 20,
                    shield: 10,
                    cards: []
                },
                turn: []
            }
        }
    }
}

module.exports = resolvers;