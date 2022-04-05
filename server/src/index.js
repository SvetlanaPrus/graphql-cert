const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

// It would be great to be able to send the server a test query and get a valid response.
// Fortunately, ApolloServer provides a way to do exactly that, using mocked data.
// We'll pass an object to the mocks property instead of just true.
// This object contains functions that provide the mocked data we want the server to return for each queried field.->

// With mocks enabled, Apollo Server always returns exactly two entries for every list field.
// To get more entries at a time, let's say 6, we'll add a Query.tracksForHome to our mocks object
// and return an Array of that given length like so: [...new Array(6)].

const mocks = {
    Query: () => ({
        tracksForHome: () => [...new Array(6)],
    }),
    Track: () => ({                                         //Note arrow functions and commas
        id: () => 'track_01',
        title: () => 'Astro Kitty, Space Explorer',
        author: () => {
            return {
                name: 'Grumpy Cat',
                photo:
                    'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg',
            };
        },
        thumbnail: () =>
            'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
        length: () => 1210,
        modulesCount: () => 6,
    }),
};

// We pass this object to the ApolloServer constructor ->

const server = new ApolloServer({
    typeDefs,
    mocks,
});

server.listen().then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
