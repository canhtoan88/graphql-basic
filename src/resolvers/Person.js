const Person = {
    posts(parent, arg, { db }, info) {
        return db.posts.filter(post => post.author === parent.id);
    }
}

export { Person as default };