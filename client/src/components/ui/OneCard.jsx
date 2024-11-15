import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CardUpdateForm from './CardUpdateForm';
import { Pencil, Trash, ArrowRight } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
export default function CardCard({ card, user, deleteHandler, updateHandler }) {
  const [show, setShow] = useState(false);
  return (
    <Col className="d-flex justify-content-center">
      <Card
        style={{
          width: '18rem',
          display: 'flex',
          flexDirection: 'center',
          margin: '10px',
        }}
      >
        <Card.Img
          variant="top"
          src={`http://localhost:3000/${card.imagesUrl}`}
        />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Link to={`/initiatives/user/${card.userId}`}>
            <Card.Text>Автор: {card?.User?.id}</Card.Text>
          </Link>
          {
            <ButtonGroup size="sm">
              {user?.status === 'logged' && user?.data.id === card.userId && (
                <>
                  <Button
                    onClick={() => deleteHandler(card.id)}
                    variant="light"
                  >
                    <Icon.Trash />
                  </Button>
                </>
              )}
            </ButtonGroup>
          }
          {show && <CardUpdateForm card={card} updateHandler={updateHandler} />}
        </Card.Body>
      </Card>
    </Col>
  );
}
