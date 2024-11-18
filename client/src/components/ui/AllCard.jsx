import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CardUpdateForm from './CardUpdateForm';
import { Pencil, Trash, ArrowRight } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function AllCard({ card, user, deleteHandler, updateHandler }) {
  const [show, setShow] = useState(false);
  console.log('AllCard', { user, card });

  // Стиль для фона карточки
  const cardStyle = {
    backgroundColor: '#918981', // Цвет фона карточки
    color: '#EDEDED', // Цвет текста внутри карточки
  };

  // Стиль для кнопок и иконок
  const buttonStyle = {
    color: '#918981', // Цвет текста для кнопок
    borderColor: '#918981', // Цвет границы кнопок
  };

  return (
    <Col className="d-flex justify-content-center">
      <Card
        style={{
          ...cardStyle,
          width: '18rem',
          display: 'flex',
          flexDirection: 'center',
          margin: '10px',
        }}
      >
        <Card.Img
          variant="top"
          src={card.imagesUrl ? `/img/${card.imagesUrl}` : '/img/default.jpg'}
          alt={card.title}
          style={{
            height: '250px',
            objectFit: 'cover',
            filter: 'brightness(95%)',
          }}
        />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Link to={`/initiatives/user/${card.userId}`}>
            <Card.Text>
              Автор: {card?.User?.firstName + ' ' + card?.User?.lastName}
            </Card.Text>
          </Link>

          <ButtonGroup size="sm">
            {user?.status === 'logged' && user?.data.id === card.userId && (
              <>
                <Button
                  onClick={() => deleteHandler(card.id)}
                  variant="light"
                  style={buttonStyle} // Применяем цвет к кнопке удаления
                >
                  <Icon.Trash />
                </Button>
              </>
            )}
            <Link to={`/initiatives/${card.id}`}>
              <Button variant="light" style={buttonStyle}>
                {' '}
                {/* Применяем цвет к кнопке перехода */}
                <Icon.ArrowRight />
              </Button>
            </Link>
          </ButtonGroup>

          {show && <CardUpdateForm card={card} updateHandler={updateHandler} />}
        </Card.Body>
      </Card>
    </Col>
  );
}
