import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function AddCardPage() {
  const [addCard, setAddCard] = useState([]);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.registration
    ) {
      return alert('Заполните все поля!');
    }

    try {
      const { data } = await axiosInstance.post('/account/register', formData);
      setAddCard({ status: 'logged', data: data.user });
      alert('Регистрация успешна!');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert(error.response?.data?.message || 'Произошла ошибка регистрации.');
    }
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="text-center">Регистрация</h3>
        <Form onSubmit={signUpHandler}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              placeholder="Введите имя"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              placeholder="Введите фамилию"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fartherName">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              name="fartherName"
              type="text"
              placeholder="Введите отчество"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registration">
            <Form.Label>Регистрация</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="registration"
              type="text"
            >
              <option value="">Выберите регистрацию</option>
              <option value="Федеральный">Федеральный</option>
              <option value="Муниципальный">Муниципальный</option>
              <option value="Региональный">Региональный</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Введите email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
