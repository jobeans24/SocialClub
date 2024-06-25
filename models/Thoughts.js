const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat').default;

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 200
        },
        username: {
            type: String,
            required: true,
        },
        CreatedAt: {
            type: Date,
            default: Date.now,
            get: creatAtVal => dateFormat(creatAtVal)
        }
},
{
    toJSON: {
        virtuals: true
    },
    id: false,
}
);

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_lenght: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
}
);

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

module.exports = Thoughts;