const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Walsh',
          fartherName: 'Isom',
          email: 'john@example.com',
          password: bcrypt.hashSync('123', 10),
          registration: 'Harlingen, 5517 Ashlee Heights',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Jane',
          lastName: 'Goldner',
          fartherName: 'Dean',
          email: 'jane@example.com',
          password: bcrypt.hashSync('123', 10),
          registration: 'Kirkland, 038 Laurine Fork',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
