import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import * as Icon from 'react-bootstrap-icons';
import CardUpdateForm from './CardUpdateForm';
import { Link } from 'react-router-dom';
export default function CardCard({ card, user }) {
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
        <Card.Img variant="top" src={`/img/${card.url}`} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>Author: {card?.User?.name}</Card.Text>
          <ButtonGroup size="sm">
            {user.status === 'logged' && user.data.id === card.userId && (
              <>
                <Button
                  onClick={() => setShow((prev) => !prev)}
                  variant="light"
                >
                  {show ? <Icon.X /> : <Icon.Pencil />}
                </Button>
                <Button onClick={() => deleteHandler(card.id)} variant="light">
                  <Icon.Trash />
                </Button>
                <Button onClick={() => updateHandler(card.id)} variant="light">
                  <Icon.Pencil />
                </Button>
              </>
            )}

            <Button variant="light">
              <Link to={`/onecard/${card.id}`}>
                <Icon.ArrowRight />
              </Link>
            </Button>
          </ButtonGroup>
          {show && <CardUpdateForm card={card} updateHandler={updateHandler} />}
        </Card.Body>
      </Card>
    </Col>
  );
}
