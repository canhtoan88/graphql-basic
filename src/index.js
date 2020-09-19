const { GraphQLServer, PubSub } = require('graphql-yoga');
// const Query = require('./resolvers/Query').default;
// const Mutation= require('./resolvers/Mutation').default;
// const Person = require('./resolvers/Person').default;
// const Post = require('./resolvers/Post').default;
// const Comment = require('./resolvers/Comment').default;
// const db = require('./db').default;
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Person from './resolvers/Person';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import db from './db';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Person,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
});

server.start(() => {
    console.log('Server was started...');
})