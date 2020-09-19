const { v4 } = require('uuid');

const users = [
    {
        id: v4(),
        name: 'Hào',
        age: 18
    },
    {
        id: v4(),
        name: 'Nhón',
        age: 20
    }
];

const posts = [
    {
        id: v4(),
        title: 'Đây là một bài hát vui',
        content: 'Đây là một bài hát không buồn',
        like: 50,
        status: true,
        author: users[0].id,
        createdAt: '20/02/2020'
    },
    {
        id: v4(),
        title: 'Anh không đòi quà',
        content: 'Chia tay anh không đòi lại quà',
        like: 500,
        status: true,
        author: users[1].id,
        createdAt: '14/08/2020'
    },
    {
        id: v4(),
        title: 'Mùa đông không lạnh',
        content: 'Lại một đêm lại một đêm nữa',
        like: 5,
        status: false,
        author: users[0].id,
        createdAt: '4/12/2020'
    }
];

const comments = [
    {
        id: v4(),
        content: 'hay lắm bạn ơi',
        author: users[1].id,
        post: posts[0].id
    },
    {
        id: v4(),
        content: 'Nghe cũng được đó',
        author: users[0].id,
        post: posts[1].id
    },
    {
        id: v4(),
        content: 'Good song',
        author: users[1].id,
        post: posts[2].id
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default };