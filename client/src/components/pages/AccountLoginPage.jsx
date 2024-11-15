import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export default function AccountLoginPage({ signInHandler }) {

  const loginUrl = useRef('');
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="text-center">Войти в учетную запись</h3>
        <Form onSubmit={signInHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Введите email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control name="password" type="password" placeholder="Введите пароль" />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Войти
          </Button>
          <Card.Img src="https://hmr.mrgcdn.ru/mail/account/login/cdn/6177d32be39c24a2131aa14794422a76.svg" type="button" to="https://esia.gosuslugi.ru/login/" as={Link} style={{width: "210px", marginLeft: "175px"}}   />
        </Form>
      </Col>
    </Row>
  );
}