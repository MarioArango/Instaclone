if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/resolversMap');
const conexion = require('./config/database');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

//INIT
const init = async () => {
    try {
        const { url }  = await server.listen();
        console.log(`Servidor en ${url}`);
        await conexion();
    } catch (error) {
        console.log(`No se puedo conectar al servidor`);
    }
}

init();