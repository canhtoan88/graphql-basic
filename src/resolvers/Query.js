// Scalar types: ID, String, Int, Boolean, Float
const Query = {
    hello(parent, arg, { db }, info) {
        return `Hello ${arg.name}, you are ${arg.age} years old.`;
    },
    add(parent, arg, { db }, info) {
        return arg.arr.reduce((total, value) => total + value, 0);
    },
    users(parent, arg, { db }, info) {
        return db.users;
    },
    posts(parent, arg, { db }, info) {
        if (arg.status !== undefined) {
            return db.posts.filter(post => post.status === arg.status);
        }
        return db.posts;
    },
    comments(parent, arg, { db }, info) {
        return db.comments;
    }
}

export { Query as default };