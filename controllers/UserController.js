const { User, Product } = require('../models/index');

const UserController = {
  create(req, res) {
    User.create(req.body)
      .then(user =>
        res.status(201).send({ message: 'User created successfully!', user })
      )
      .catch(console.error);
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
};

module.exports = UserController;
