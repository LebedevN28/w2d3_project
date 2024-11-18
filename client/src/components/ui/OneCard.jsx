import React, { useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons'; // Используем Trash напрямую
import { Link } from 'react-router-dom';
import axios from 'axios'; // Для отправки запросов на сервер

export default function OneCard({ card, user, deleteHandler }) {
  // useEffect(() => {
  //   // Логируем состояние пользователя для диагностики
  //   console.log('User state:', user);
  // }, [user]);

  console.log('OneCard', { user, card });

  const handleVoteFor = async () => {
    try {
      await axios.put(
        `/api/initiatives/${card.id}/voteFor`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Добавляем токен для авторизации
          },
        }
      );
      alert('Вы проголосовали "за"');
    } catch (error) {
      console.error('Ошибка при голосовании за:', error);
      alert('Произошла ошибка при голосовании');
    }
  };

  const handleVoteAnti = async () => {
    try {
      await axios.put(
        `/api/initiatives/${card.id}/voteAnti`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Добавляем токен для авторизации
          },
        }
      );
      alert('Вы проголосовали "против"');
    } catch (error) {
      console.error('Ошибка при голосовании против:', error);
      alert('Произошла ошибка при голосовании');
    }
  };

  return (
    <Col className="d-flex justify-content-center my-3" xs={12} md={6} lg={4}>
      <Card
        className="shadow-sm border-0 w-100" // Установим ширину 100%
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          transition: 'transform 0.2s',
        }}
      >
        {/* Изображение карточки */}
        <Card.Img
          variant="top"
          src={card.imagesUrl ? `/img/${card.imagesUrl}` : '/img/default.jpg'}
          alt={card.title}
          style={{
            height: '300px', // Увеличиваем высоту для лучшего отображения
            objectFit: 'cover',
            filter: 'brightness(95%)',
          }}
        />

        {/* Содержимое карточки */}
        <Card.Body className="p-4">
          <Card.Title
            className="mb-2 text-truncate"
            style={{ fontSize: '1.25rem', fontWeight: '600' }}
          >
            {card.title}
          </Card.Title>
          <Card.Subtitle
            className="mb-3 text-muted"
            style={{ fontSize: '0.9rem' }}
          >
            <Link
              to={`/initiatives/user/${card.userId}`}
              className="text-decoration-none text-secondary"
              style={{ fontWeight: '500' }}
            >
              Автор:
              {user?.data?.firstName && user?.data?.lastName
                ? `${user.data.firstName} ${user.data.lastName}`
                : 'Неизвестно'}
            </Link>
          </Card.Subtitle>
          <Card.Text style={{ fontSize: '0.95rem', color: '#555' }}>
            {card.description}
          </Card.Text>

          {/* Кнопки для голосования */}
          {user?.status === 'logged' ? (
            <>
              <Button
                onClick={handleVoteFor}
                variant="success"
                className="me-2"
              >
                Голосовать "За"
              </Button>
              <Button onClick={handleVoteAnti} variant="danger">
                Голосовать "Против"
              </Button>
              <Card.Text style={{ fontSize: '0.95rem', color: '#555' }}>
                {(card.count / (card.count + card.discount)) * 100} %
                Проголосовали "За"
              </Card.Text>
            </>
          ) : (
            <p>Пожалуйста, войдите, чтобы проголосовать.</p>
          )}

          {/* Кнопка удаления (только если пользователь автор) */}
          {user?.status === 'logged' && user?.data.id === card.userId && (
            <Button
              onClick={() => deleteHandler(card.id)}
              variant="light"
              title="Удалить"
            >
              <Trash />
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
