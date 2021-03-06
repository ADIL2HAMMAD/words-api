const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const wordModel = require('../data/words.data');
const userModel = require('../data/users.data');
const { wordType } = require('./words/word-type');
const { userType } = require('./users/user-type');

exports.queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'this is the query type',
  fields: {
    words: {
      type: new GraphQLList(wordType),
      description: 'this is the list of words returned',
      args: {
        top: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return wordModel.getAllWords(args.top);
      }
    },
    word: {
      type: wordType,
      description: 'this is single word return',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'this is the search id'
        }
      },
      resolve: (_, args) => {
        return wordModel.getWordById(args.id);
      }
    },
    users: {
      type: new GraphQLList(userType),
      description: 'this is all users in system',
      resolve: (_, args) => {
        return userModel.getAllUsers();
      }
    },
    userById: {
      type: userType,
      description: 'this is single user return',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'this is the search id'
        }
      },
      resolve: (_, args) => {
        return userModel.getUserById(args.id);
      }
    },
    userByUsername: {
      type: userType,
      description: 'this is single user return',
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'this is the search username'
        }
      },
      resolve: (_, args) => {
        return userModel.getUserByUsername(args.username);
      }
    }
  }
});
