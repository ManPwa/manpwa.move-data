module.exports = {
    _id: {
        type: 'string',
        primary: true,
        index: true,
    },
    manga_id: {
        type: 'string',
    },
    user_id: {
        type: 'string',
    },
    rating: {
        type: 'number',
    },
};