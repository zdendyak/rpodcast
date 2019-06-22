const Rpod = require('./rpod.model');
const User = require('../user/user.model');
const { throwErrorIfNotAuthenticated } = require('../../api/auth/auth');

const createRpod = async (root, { input }, { user }) => {
  throwErrorIfNotAuthenticated(user);

  const { audioUrl, ...rpodData } = await input;

  rpodData.audio = audioUrl || '';
  rpodData.userId = user.id;
  return Rpod.create(rpodData);
}

const updateRpod = (root, { input }, { user }) => {
  throwErrorIfNotAuthenticated(user);
  const { id, ...data } = input;
  return Rpod.findByIdAndUpdate(id, data, { new: true }).exec();
}

const deleteRpod = (root, { id }, { user }) => {
  throwErrorIfNotAuthenticated(user);
  return Rpod.findByIdAndRemove(id).exec();
}

const getRpod = (root, { id }, { user }) => {
  throwErrorIfNotAuthenticated(user);
  return Rpod.findById(id);
}

const getRpodsByUser = (root, _, { user }) => {
  throwErrorIfNotAuthenticated(user);
  return Rpod.find({ userId: user.id }).exec();
}

const getAllRpods = (root, _, { user }) => {
  // throwErrorIfNotAuthenticated(user);
  return Rpod.find({}).exec();
}

module.exports = {
  Query: {
    Rpod: getRpod,
    Rpods: getAllRpods,
    UserRpods: getRpodsByUser
  },

  Mutation: {
    createRpod,
    updateRpod,
    deleteRpod
  },

  Rpod: {
    user: (root, args) => {
      return User.findOne({ id: root.user });
    }
  }
}