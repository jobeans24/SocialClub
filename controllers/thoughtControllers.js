const {Thought, User} = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find().sort({createdAt: -1});
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get thought by id
    async getThoughtById({params}, res) {
        try {
            const dbThoughtData = await Thought.findOne({_id: params.id});
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create thought
    async createThought({params, body}, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            const dbUserData = await User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            );
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought by id
    async updateThought({params, body}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({_id: params.id},
                body,
                {new: true, runValidators: true}
            );
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete thought
    async deleteThought({params}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({_id: params.id});
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction({params, body}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$push: {reactions: body}},
                {new: true, runValidators: true}
            );
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeReaction({params}, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: {reactionId: params.reactionId}}},
                {new: true}
            );
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};