const Post = {
    author(parent, arg, { db }, info) {
        return db.users.find(user => user.id === parent.author);
    },
    comments(parent, arg, { db }, info) {
        return db.comments.filter(comment => comment.post === parent.id)
    }
}

export { Post as default };