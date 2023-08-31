'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  // Validations:
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please, insert your name.',
          },
        },
      },

      bday: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please, insert your birthday.',
          },
          isDate: {
            msg: 'Please, insert a correct date.',
          },
        },
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please, insert your gender.',
          },
          isIn: {
            args: [['F', 'M', 'none']],
            msg: 'Please, insert a genre F/ M / none.',
          },
        },
      },

      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please, insert your mail.',
          },
          isEmail: {
            msg: 'Please, insert a correct mail.',
          },
        },
      },

      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please, insert a role.',
          },
          isIn: {
            args: [['user', 'guest', 'kid', 'admin']],
            msg: 'Please, insert a role user / guest / kid.',
          },
        },
      },
    },

    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
