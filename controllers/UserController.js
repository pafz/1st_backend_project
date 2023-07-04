const { User, Product } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

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
    User.findAll({ include: [Product] })
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
          email: req.body.email,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send({ message: 'Usuario o contraseña incorrectos' });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ message: 'Usuario o contraseña incorrectos' });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      res.send(user);
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).send({ message: 'Error during login' });
    }
  },
};

module.exports = UserController;
