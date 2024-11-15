/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Initiatives',
      [
        {
          title: 'Безопасные дороги - счастливые семьи',
          description: 'Инвестиции в ремонт дорог, повышение безопасности пешеходных переходов и строительство новых велодорожек.',
          imagesUrl: 'image_1.webp',
          count: 97,
          discount: 3,
          levelPriority: 'Муниципальный',
          deadline: '2015-01-08',
          userId: 1,
        },
        {
          title: 'Культура - это наше наследие',
          description: 'Поддержка музеев, театров, библиотек, организация доступных культурных мероприятий для всех слоев населения.',
          imagesUrl: 'image_2.webp',
          count: 60,
          discount: 40,
          levelPriority: 'Региональный',
          deadline: '2019-07-11',
          userId: 2,
        },
        {
          title: 'Образование для всех!',
          description: 'Введение бесплатного дошкольного образования для всех детей, расширение доступности высшего образования и повышение зарплат учителям.',
          imagesUrl: 'image_3.webp',
          count: 80,
          discount: 20,
          levelPriority: 'Федеральный',
          deadline: '2022-03-29',
          userId: 3,
        },
        {
          title: 'Чистый город - счастливый город',
          description: 'Программа по внедрению раздельного сбора мусора, развитию альтернативной энергетики и озеленению городских пространств.',
          imagesUrl: 'image_4.webp',
          count: 91,
          discount: 9,
          levelPriority: 'Муниципальный',
          deadline: '2015-01-08',
          userId: 1,
        },
        {
          title: 'Здоровая нация - сильная нация',
          description: 'Программа по улучшению медицинского обслуживания, доступности лекарств и продвижению здорового образа жизни.',
          imagesUrl: 'image_5.webp',
          count: 75,
          discount: 25,
          levelPriority: 'Федеральный',
          deadline: '2019-07-11',
          userId: 2,
        },
        {
          title: 'Больше денег для военных!',
          description: 'Увеличение военного бюджета за счет сокращения финансирования образования, здравоохранения и культуры.',
          imagesUrl: 'image_6.webp',
          count: 10,
          discount: 90,
          levelPriority: 'Федеральный',
          deadline: '2022-03-29',
          userId: 3,
        },
        {
          title: 'Вернем советские ценности!',
          description: 'Введение жесткой цензуры, ограничение свободы слова и преследования политических оппонентов.',
          imagesUrl: 'image_7.webp',
          count: 15,
          discount: 85,
          levelPriority: 'Региональный',
          deadline: '2015-01-08',
          userId: 1,
        },
        {
          title: 'Запретим все иностранные товары!',
          description: 'Введение протекционистских мер, которые приведут к росту цен на товары и ограничению выбора для потребителей.',
          imagesUrl: 'image_8.webp',
          count: 3,
          discount: 97,
          levelPriority: 'Региональный',
          deadline: '2019-07-11',
          userId: 2,
        },
        {
          title: 'Все должны быть одинаковыми!',
          description: 'Отмена свободного выбора, навязывание единых стандартов и ограничение индивидуальности.',
          imagesUrl: 'image_9.webp',
          count: 12,
          discount: 88,
          levelPriority: 'Федеральный',
          deadline: '2022-03-29',
          userId: 3,
        },
        {
          title: 'Наш город - наш замок',
          description: 'Введение жесткого контроля над передвижением людей, ограничение свободы перемещения и усиление полицейского надзора.',
          imagesUrl: 'image_10.webp',
          count: 6,
          discount: 94,
          levelPriority: 'Федеральный',
          deadline: '2015-01-08',
          userId: 1,
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
