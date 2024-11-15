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
          fatherName: 'Isom',
          email: 'john@example.com',
          password: bcrypt.hashSync('123', 10),
          registration: 'Федеральный',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Jane',
          lastName: 'Goldner',
          fatherName: 'Dean',
          email: 'jane@example.com',
          password: bcrypt.hashSync('123', 10),
          registration: 'Региональный',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Elnora',
          lastName: 'Ward',
          fatherName: 'Enoch',
          email: 'elnora@example.com',
          password: bcrypt.hashSync('123', 10),
          registration: 'Муниципальный',
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
