const {ObjectId} = require('mongodb');
const {User, Thought} = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find();
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getUserById({params}, res) {
        try {
            const dbUserData = await User.findOne({_id: params.id});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser({body}, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser({params, body}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({_id: params.id}, req.body, {new: true, runValidators: true});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser({params}, res) {
        try {
            const dbUserData = await User.findOneAndDelete({_id: params.id});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
          const user = await User.findById(req.params.userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          const friendId = req.params.friendId;
          if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: "Friend already added" });
          }
    
          user.friends.push(friendId);
          await user.save();
    
          res.status(200).json(user);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message });
        }
      },
    
      async removeFriend(req, res) {
        try {
          const user = await User.findById(req.params.userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          const friendId = req.params.friendId;
          if (!user.friends.includes(friendId)) {
            return res
              .status(400)
              .json({ message: "Friend not found in the list" });
          }
    
          user.friends = user.friends.filter(
            (friend) => friend.toString() !== friendId
          );
          await user.save();
    
          res.status(200).json(user);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message });
        }
      },
    };