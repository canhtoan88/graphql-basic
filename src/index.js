const { GraphQLServer } = require('graphql-yoga');

// Scalar types: ID, String, Int, Boolean, Float

const users = [
    {
        id: 1,
        name: 'Mr. Handsome Toan',
        age: 18
    },
    {
        id: 2,
        name: 'Mrs. Cute Nguyen',
        age: 20
    }
];

const posts = [
    {
        id: 1,
        title: 'Đây là một bài hát vui',
        content: 'Đây là một bài hát không buồn',
        like: 50,
        status: true,
        author: 1,
        createdAt: '20/02/2020'
    },
    {
        id: 2,
        title: 'Anh không đòi quà',
        content: 'Chia tay anh không đòi lại quà',
        like: 500,
        status: true,
        author: 2,
        createdAt: '14/08/2020'
    },
    {
        id: 3,
        title: 'Mùa đông không lạnh',
        content: 'Lại một đêm lại một đêm nữa',
        like: 5,
        status: false,
        author: 1,
        createdAt: '4/12/2020'
    }
];

const comments = [
    {
        id: 1,
        content: 'hay lắm bạn ơi',
        author: 2,
        post: 1
    },
    {
        id: 2,
        content: 'Nghe cũng được đó',
        author: 1,
        post: 2
    },
    {
        id: 3,
        content: 'Good song',
        author: 2,
        post: 3
    }
]

const typeDefs = `
    type Person {
        id: ID,
        name: String!
        age: Int!
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        content: String!
        like: Int!
        status: Boolean!
        author: Person!
        comments: [Comment!]!
        createdAt: String!
    }
    type Comment {
        id: ID!
        content: String!
        author: Person!
    }
    type Query {
        hello(name: String, age: Int): String!
        add(arr: [Int]): Int!
        users: [Person!]!
        posts: [Post!]!
        comments: [Comment!]!
    }
`;

const resolvers = {
    Query: {
        hello(parent, arg, ctx, info) {
            return `Hello ${arg.name}, you are ${arg.age} years old.`;
        },
        add(parent, arg, ctx, info) {
            return arg.arr.reduce((total, value) => total + value, 0);
        },
        users() {
            return users;
        },
        posts() {
            return posts;
        },
        comments() {
            return comments;
        }
    },
    Post: {
        author(parent, arg, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        comments(parent, arg, ctx, info) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },
    Person: {
        posts(parent, arg, ctx, info) {
            return posts.filter(post => post.author === parent.id);
        }
    },
    Comment: {
        author(parent, arg, ctx, info) {
            return users.find(user => user.id === parent.author);
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server was started...');
})