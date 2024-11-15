'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Initiatives',
      [
        {
          title: 'Безопасные дороги - счастливые семьи',
          description: 'Инвестиции в ремонт дорог, повышение безопасности пешеходных переходов и строительство новых велодорожек.',
          imagesUrl: 'server/public/img/image_1.png',
          count: 97,
          discount: 3,
          levelPriority: 'Муниципальный',
          userId: 1,
        },
        {
          title: 'Культура - это наше наследие',
          description: 'Поддержка музеев, театров, библиотек, организация доступных культурных мероприятий для всех слоев населения.',
          imagesUrl: 'server/public/img/image_2.png',
          count: 60,
          discount: 40,
          levelPriority: 'Региональный',
          userId: 2,
        },
        {
          title: 'Образование для всех!',
          description: 'Введение бесплатного дошкольного образования для всех детей, расширение доступности высшего образования и повышение зарплат учителям.',
          imagesUrl: 'server/public/img/image_3.jpg',
          count: 80,
          discount: 20,
          levelPriority: 'Федеральный',
          userId: 3,
        },
        {
          title: 'Чистый город - счастливый город',
          description: 'Программа по внедрению раздельного сбора мусора, развитию альтернативной энергетики и озеленению городских пространств.',
          imagesUrl: 'server/public/img/image_4.jpg',
          count: 91,
          discount: 9,
          levelPriority: 'Муниципальный',
          userId: 1,
        },
        {
          title: 'Здоровая нация - сильная нация',
          description: 'Программа по улучшению медицинского обслуживания, доступности лекарств и продвижению здорового образа жизни.',
          imagesUrl: 'server/public/img/image_5.jpg',
          count: 75,
          discount: 25,
          levelPriority: 'Федеральный',
          userId: 2,
        },
        {
          title: 'Больше денег для военных!',
          description: 'Увеличение военного бюджета за счет сокращения финансирования образования, здравоохранения и культуры.',
          imagesUrl: 'server/public/img/image_6.jpg',
          count: 10,
          discount: 90,
          levelPriority: 'Федеральный',
          userId: 3,
        },
        {
          title: 'Вернем советские ценности!',
          description: 'Введение жесткой цензуры, ограничение свободы слова и преследования политических оппонентов.',
          imagesUrl: 'server/public/img/image_7.jpg',
          count: 15,
          discount: 85,
          levelPriority: 'Региональный',
          userId: 1,
        },
        {
          title: 'Запретим все иностранные товары!',
          description: 'Введение протекционистских мер, которые приведут к росту цен на товары и ограничению выбора для потребителей.',
          imagesUrl: 'server/public/img/image_8.jpg',
          count: 3,
          discount: 97,
          levelPriority: 'Региональный',
          userId: 2,
        },
        {
          title: 'Все должны быть одинаковыми!',
          description: 'Отмена свободного выбора, навязывание единых стандартов и ограничение индивидуальности.',
          imagesUrl: 'server/public/img/image_9.jpg',
          count: 12,
          discount: 88,
          levelPriority: 'Федеральный',
          userId: 3,
        },
        {
          title: 'Наш город - наш замок',
          description: 'Введение жесткого контроля над передвижением людей, ограничение свободы перемещения и усиление полицейского надзора.',
          imagesUrl: 'server/public/img/image_10.png',
          count: 6,
          discount: 94,
          levelPriority: 'Федеральный',
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
