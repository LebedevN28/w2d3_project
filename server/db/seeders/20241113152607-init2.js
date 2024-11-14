/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Initiatives',
      [
        {
          title: 'течет крыша',
          description: 'крыша течет очень сильно',
          imagesUrl: 'server/img/img_krisha.jpg',
          count: 10,
          discount: 3,
          levelPriority: 'Федеральный',
          userId: 1,
        },
        {
          title: 'разрушили детскую площадку',
          description:
            'какие-то хуликаны уничтожили детскую площадку, подожгли качели',
          imagesUrl: 'server/img/img_ploshadka.jpg',
          count: 1,
          discount: 100,
          levelPriority: 'Региональный',
          userId: 2,
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
