const User = require('./user.model');
const Rpod = require('../rpod/rpod.model');
const { signIn } = require('../../api/auth/auth');

const loginUser = async (root, { input }) => {
  const { email, password } = input;
  const user = await User.findOne({ email }).exec();
  const errMsg = 'Invalid email or password';

  if (!user) throw new Error(errMsg);

  if (user.comparePassword(password)) {
    user.token = signIn({ id: user._id, email: user.email });
    return user;
  } else {
    throw new Error(errMsg);
  }
};

const createUser = async (root, { input }) => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) throw new Error('User with this email already exist');
  const user  = new User(input);
  const createdUser = await user.save();
  if (!createdUser) throw new Error('Error occurred when registering a new user. Please try again!')
  createdUser.token = signIn({ id: createUser._id, email: createdUser.email })
  return createdUser;
}

const me = (root, args, { user }, info) => {
  if (!user) throw new Error('You are not authenticated');
  return User.findById(user.id).exec();
}

const userResolvers = {
  Query: {
    me
  },

  Mutation: {
    createUser, 
    loginUser
  },

  User: {
    rpods (user) {
      return Rpod.find({ userId: user._id }).exec()
    }
  }
}

module.exports = userResolvers;