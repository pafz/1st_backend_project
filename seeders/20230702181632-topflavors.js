'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Twix',
        description: 'caramel and chocolate mixed with cookie or peanuts',
        favorite: 'delicious',
        price: 1.55,
        CategoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'M&Ms',
        description: 'milk chocolate, dark chocolate and pretzel',
        favorite: 'ddeliciosoel',
        price: 4,
        CategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kit Kat',
        description: 'crunchy and creamy and so easy to share',
        favorite: 'crunchy',
        price: 1.2,
        CategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mars',
        description: 'a chocolate bar with malted milk and caramel',
        favorite: 'sweet',
        price: 1.1,
        CategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kinder',
        description:
          'two crispy wafer bars with a creamy milk and hazelnut filling and delicious milk chocolate',
        favorite: 'tasty',
        price: 3,
        CategoryId: 2,
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
