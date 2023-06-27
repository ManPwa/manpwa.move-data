module.exports = {
    _id: {
        type: 'string',
        primary: true,
        index: true,
    },
    title: {
        type: 'string',
    },
    description: {
        type: 'string',
    },
    year: {
        type: 'number',
    },
    status: {
        type: 'string',
    },
    demographic: {
        type: 'string',
    },
    author: {
        type: 'string',
    },
    tags: {
        type: 'array',
    },
    original_language: {
        type: 'string'
    }
};