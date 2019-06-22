const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || "rpod-token-secret";
const expiresIn = process.env.EXPIRES_IN || '7d';

const signIn = payload => jsonwebtoken.sign(payload, secret, { expiresIn })

const verify = token => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, {}, (err, payload) => {
      if (err) return reject(error);
      return resolve(payload);
    })
  }) 
}

const throwErrorIfNotAuthenticated = user => {
  if (!user) throw new Error('You are not authenticated')
}

module.exports = {
  signIn,
  verify,
  throwErrorIfNotAuthenticated
}