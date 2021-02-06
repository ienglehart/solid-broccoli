const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        me: async (parent, args, context) =>{
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password');
                    // .populate('Books');
                return userData;
            }
        }
    },
    
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, {authors, description, title, bookId, image, link}, context) =>{
            if (context.user) {
                const savedBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookId}},
                    { new: true}
                ).populate('savedBooks');

                return(savedBook);
            }

        }
    }


}

module.exports = resolvers;