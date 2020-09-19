const { v4 } = require('uuid');

const Mutation = {
    createUser(parent, arg, { db }, info) {
        const user = {id: v4(), name: arg.data.name, age: arg.data.age};
        db.users.push(user);
        return user;
    },
    deleteUser(parent, arg, { db }, info) {
        const userIndex = db.users.findIndex(user => user.id === arg.id);
        if (userIndex > -1) {
            db.users.splice(userIndex, 1);
            db.posts = db.posts.filter(post => post.author !== arg.id);
            db.comments = db.comments.filter(comment => comment.author !== arg.id);
            return 'Delete user successfully';
        }
        return 'User was not found';
    },
    createPost(parent, arg, { db, pubsub }, info) {
        const userExisted = db.users.find(user => user.id === arg.author);
        if (!userExisted) {
            throw Error('Author is not existing');
        }
        const post = {
            id: v4(),
            title: arg.title,
            content: arg.content,
            author: arg.author,
            status: false,
            createdAt: new Date()
        }
        db.posts.push(post);

        pubsub.publish('post', {post: { mutation: 'Created', data: post }});
        return post;
    },
    updatePost(parent, arg, { db, pubsub }, info) {
        const post = db.posts.find(post => post.id === arg.data.id && arg.data.author === post.author);
        if (post) {
            if (arg.data.title) {
                post.title = arg.data.title;
            }
            if (arg.data.content) {
                post.content = arg.data.content;
            }
            pubsub.publish('post', {post: { mutation: 'Updated', data: post }});
            return post;
        }
        
        throw Error('This post not found or you can\'t edit this post');
    },
    createComment(parent, arg, { db, pubsub }, info) {
        const userExisted = db.users.some(user =>  user.id === arg.author);
        if (!userExisted) {
            throw Error('Author is not existing');
        } 
        const postExisted = db.posts.some(post =>  post.id === arg.post);
        if (!postExisted) {
            throw Error('Post is not existing');
        } 
        const comment = {
            id: v4(),
            content: arg.content,
            author: arg.author,
            post: arg.post
        }
        db.comments.push(comment)

        pubsub.publish(`comment ${arg.post}`, { comment });
        return comment;
    }
}

export { Mutation as default };