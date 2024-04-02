const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // trim off "Bearer" from the token string
    token = req.headers.authorization ? token.split(' ').pop().trim() : token;
    console.log('trimmed token:', token);

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      // Decode the token to get the expiration time
      const decodedToken = jwt.decode(token);
      console.log('Decoded token:', decodedToken);
      console.log('Token expiration:', decodedToken.exp);
      console.log('Current timestamp:', Math.floor(Date.now() / 1000));
      console.log('Token expired?', decodedToken.exp < Math.floor(Date.now() / 1000));
      req.user = data;
    } catch (err) {
      console.log('Invalid token', err.message);
      throw new Error('Invalid token!');
    }

    // return the request object to the resolver as `context`
    return req;
  },
  signToken: function ({ username, email, _id }) {
    // create a payload object to be used in the jwt.sign function
    try {
      if (!username || !email || !_id) {
        throw new Error('Missing required fields for token payload');
      }
      const payload = { username, email, _id };

      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    } catch (err) {
      console.log('Error signing token:', err.message);
      throw err;
    }
  },
};
