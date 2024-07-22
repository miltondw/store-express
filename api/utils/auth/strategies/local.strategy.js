const { Strategy } = require('passport-local');
const UsersService = require('@components/user/user.service');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = new UsersService();

const LocalStrategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await UserService.getByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
        done(Boom.unauthorized(), false);
      }
      delete user.dataValues.password
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
