'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Twix',
        description: 'caramel and chocolate mixed with cookie or peanuts',
        favourite: 'ddeliciosoel',
        price: 1,
        category_id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  //TODO: what to put in category_id? shouldn't it be autocomplete?

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
