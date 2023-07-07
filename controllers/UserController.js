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

      if (!user.confirmed) {
        return res
          .status(400)
          .send({ message: 'You should confirm your mail' });
      }
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
      //TODO: DIFF req.user. check how it works
      const userOrdersProducts = await User.findByPk(req.user.id, {
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
};

module.exports = UserController;

/* URL when click the mail link
all:
<a href="http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhZmVyemEuZGV2b3BzQGdtYWlsLmNvbSIsImlhdCI6MTY4ODc1MTg3OCwiZXhwIjoxNjg4OTI0Njc4fQ.fP2kAvUewRrgPpW7Plk5n8oEItMkyTwQUEQsfJTyGJ0" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhZmVyemEuZGV2b3BzQGdtYWlsLmNvbSIsImlhdCI6MTY4ODc1MTg3OCwiZXhwIjoxNjg4OTI0Njc4fQ.fP2kAvUewRrgPpW7Plk5n8oEItMkyTwQUEQsfJTyGJ0&amp;source=gmail&amp;ust=1688838356459000&amp;usg=AOvVaw1rT2lE2tNmsUErMdRCiCG1">Click to confirm</a>

part 1:
http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhZmVyemEuZGV2b3BzQGdtYWlsLmNvbSIsImlhdCI6MTY4ODc1MTg3OCwiZXhwIjoxNjg4OTI0Njc4fQ.fP2kAvUewRrgPpW7Plk5n8oEItMkyTwQUEQsfJTyGJ0

part 2:
http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhZmVyemEuZGV2b3BzQGdtYWlsLmNvbSIsImlhdCI6MTY4ODc1MTg3OCwiZXhwIjoxNjg4OTI0Njc4fQ.fP2kAvUewRrgPpW7Plk5n8oEItMkyTwQUEQsfJTyGJ0&amp;source=gmail&amp;ust=1688838356459000&amp;usg=AOvVaw1rT2lE2tNmsUErMdRCiCG1

-----
all:
https://www.google.com/url?q=http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoicGFmZXJ6YS5kZXZvcHNAZ21haWwuY29tIiwiaWF0IjoxNjg4NzUzNjA5LCJleHAiOjE2ODg5MjY0MDl9.xEPO5jnyX_Pnk29uuriMlC07sz031ZE1sf5SHT0GuaE&source=gmail&ust=1688840039674000&usg=AOvVaw2aEQ8Kz_5hQ-316N3KKNNp

http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoicGFmZXJ6YS5kZXZvcHNAZ21haWwuY29tIiwiaWF0IjoxNjg4NzUzNjA5LCJleHAiOjE2ODg5MjY0MDl9.xEPO5jnyX_Pnk29uuriMlC07sz031ZE1sf5SHT0GuaE&source=gmail&ust=1688840039674000&usg=AOvVaw2aEQ8Kz_5hQ-316N3KKNNp

http://localhost:3000/users/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoicGFmZXJ6YS5kZXZvcHNAZ21haWwuY29tIiwiaWF0IjoxNjg4NzUzNjA5LCJleHAiOjE2ODg5MjY0MDl9.xEPO5jnyX_Pnk29uuriMlC07sz031ZE1sf5SHT0GuaE
*/
