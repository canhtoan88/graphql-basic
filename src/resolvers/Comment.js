const Comment = {
    author(parent, arg, { db }, info) {
        return db.users.find(user => user.id === parent.author);
    },
    post(parent, arg, { db }, info) {
        return db.posts.find(post => post.id === parent.post);
    }
}

export { Comment as default };