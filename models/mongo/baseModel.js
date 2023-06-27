const uuid = require("uuid");

const baseSchema = {
        _id: {
            type: String,
            required: [true, "_id is required"],
            default: () => uuid.v4()
        },
        _deleted: { type: Date, default: null },
        _updated: { type: Date, default: () => Date.now() },
        _created: { type: Date, default: () => Date.now() },
        _updater: { type: String, default: null }
    };

module.exports = baseSchema;