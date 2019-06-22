const { verify } = require('../api/auth/auth');
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization || '';
    const user = await verify(token);
    req.user = user;
  } catch (e) {
    req.user = null;
  }
  next ();
}

module.exports = authMiddleware;