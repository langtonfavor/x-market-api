const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require('apollo-server');

const { validateRegisterInput,validateLoginInput
} = require('../../utils/validate.js');

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("user not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

/*      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }*/

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }


      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {userId: user.id, token: token, expiresIn: 1};
    },

    async register(
      _,
      { registerInput: { firstName, lastName, contact, email, password } },

    ) {
      const { errors, valid } = validateRegisterInput(firstName,lastName,contact,email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('email is taken', {
          errors: {
            email: 'This email is taken'
          }
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        firstName,
        lastName,
        contact,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
