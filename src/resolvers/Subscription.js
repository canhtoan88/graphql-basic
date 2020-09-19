const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0;

            // setInterval(() => {
            //     count++;
            //     pubsub.publish('count', {
            //         count
            //     });
            // }, 1000);

            return pubsub.asyncIterator('count');
        }
    },
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.some(post => post.id === postId);
            console.log(post);
            if (!post) {
                throw Error('Post not found');
            }
            return pubsub.asyncIterator(`comment ${postId}`);
        }
    },
    post: {
        subscribe(parent, arg, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        }
    }
}

export { Subscription as default };