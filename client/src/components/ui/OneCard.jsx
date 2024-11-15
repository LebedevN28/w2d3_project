import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons'; // Используем Trash напрямую
import { Link } from 'react-router-dom';

export default function OneCard({ card, user, deleteHandler }) {
  return (
    <Col className="d-flex justify-content-center my-3">
      <Card
        className="shadow-sm border-0"
        style={{
          width: '20rem',
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
            height: '200px',
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
              Автор: {card?.User?.id || 'Неизвестно'}
            </Link>
          </Card.Subtitle>
          <Card.Text style={{ fontSize: '0.95rem', color: '#555' }}>
            {card.description}
          </Card.Text>
          

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
