'use strict';
//TODO: created but not -> sequelize db:seed:all
//TODO: what to put in category_id? shouldn't it be autocomplete?
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Twix',
        description: 'caramel and chocolate mixed with cookie or peanuts',
        favourite: 'delicious',
        price: 1,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'M&Ms',
        description: 'milk chocolate, dark chocolate and pretzel',
        favourite: 'ddeliciosoel',
        price: 0.99,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kit Kat',
        description: 'crunchy and creamy and so easy to share',
        favourite: 'crunchy',
        price: 1.2,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mars',
        description: 'a chocolate bar with malted milk and caramel',
        favourite: 'sweet',
        price: 1.1,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kinder',
        description:
          'two crispy wafer bars with a creamy milk and hazelnut filling and delicious milk chocolate',
        favourite: 'tasty',
        price: 1,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
