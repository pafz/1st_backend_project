const { User, Product, Token, Sequelize } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;

const UserController = {
  async create(req, res) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = User.create({ ...req.body, password });
      res.status(201).send({ message: 'User created successfully!', user });
    } catch (err) {
      console.error(err);
    }
  },

  getAll(req, res) {
    User.findAll()
      .then(users => res.send(users))
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send({ message: 'There was a problem loading products' });
      });
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          mail: req.body.mail,
        },
      });

      if (!user) {
        return res.status(400).send({ message: 'User or password incorrects' });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res.status(400).send({ message: 'User or password incorrects' });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ token, user });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).send({ message: 'Error during login' });
    }
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: 'Successfully logout!' });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'there was a problem trying to disconnect you' });
    }
  },
};

module.exports = UserController;
