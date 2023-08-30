const { User, Product, Order, Token, Sequelize } = require('../models/index');
const transporter = require('../config/nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;

const UserController = {
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        confirmed: false,
        role: 'user',
      });
      const mailToken = jwt.sign({ mail: req.body.mail }, jwt_secret, {
        expiresIn: '48h',
      });
      const url = 'http://localhost:3000/users/confirm/' + mailToken;
      await transporter.sendMail({
        to: req.body.mail,
        subject: 'Please, confirm your registration',
        html: `<h3>Hi, welcome to the candy e-shop</h3>
              <a href="${url}">Click to confirm</a>`,
      });
      res.status(201).send({
        message: 'User created successfully, please check your mail!',
        user,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          mail: req.body.mail,
        },
      });

      //Comented during development TODO: uncomment before release.
      // if (!user.confirmed) {
      //   return res
      //     .status(400)
      //     .send({ message: 'You should confirm your mail' });
      // }

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
      console.error(error);
      next(error);
    }
  },

  //TODO: adapt it to getUser
  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      res.send({
        message: 'User shown successfully!',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('There was a problem loading the user');
    }
  },

  async getUserOrdersProducts(req, res) {
    try {
      const userOrdersProducts = await User.findByPk(req.user.id, {
        include: {
          model: Order,
          include: Product,
        },
      });
      res.send({
        message:
          'Users, orders and products and categories shown successfully!',
        userOrdersProducts,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send('There was a problem loading user, orders or categories');
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.mailToken;
      console.log(token);
      console.log(req.params);
      const payload = jwt.verify(token, jwt_secret);
      await User.update(
        { confirmed: true },
        {
          where: {
            mail: payload.mail,
          },
        }
      );
      res.status(201).send('User confirm successfully!');
    } catch (error) {
      console.error(error);
    }
  },

  async updateUser(req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send('User successfully updated');
    } catch (err) {
      console.log(err);
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
        .send({ message: 'There was a problem trying to disconnect you' });
    }
  },
};

module.exports = UserController;
