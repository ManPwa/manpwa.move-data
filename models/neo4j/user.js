module.exports = {
    _id: {
        type: 'string',
        primary: true,
        index: true,
    },
    username: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
    date_of_birth: {
        type: 'datetime',
    },
    gender: {
        type: 'string',
    },
};