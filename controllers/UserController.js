const { User, Product, Order, Token, Sequelize } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const { Op } = Sequelize;

const UserController = {
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ message: 'User created successfully!', user });
    } catch (err) {
      console.error(err);
      next(err);
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

  async login(req, res, next) {
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
      next(error);
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

  //Endpoint que nos traiga la información del usuario conectado junto a los pedidos que tiene y los productos que contiene cada pedido
  async getUserOrdersProducts(req, res) {
    try {
      const userOrdersProducts = await User.findByPk(req.params.id, {
        include: {
          model: Order,
          include: Product,
        },
        //include: [{ Order, attributes: ['name'], through: { attributes: [] } }], no funciona porque User no tiene Id con Products, por lo que hay que utilizar model
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
};

module.exports = UserController;
