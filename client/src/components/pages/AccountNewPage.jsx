import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function AccountNewPage({ signUpHandler }) {
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="text-center">Регистрация</h3>
        <Form onSubmit={signUpHandler}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control name="firstName" type="text" placeholder="Введите имя" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Введите фамилия" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fatherName">
            <Form.Label>Отчество</Form.Label>
            <Form.Control name="fatherName" type="text" placeholder="Введите Отчество" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registration">
            <Form.Label>Регистрация</Form.Label>
            <Form.Select aria-label="Default select example" name="registration" type="text">
      <option>Выберете регистрацию</option>
      <option value="1">Федеральный</option>
      <option value="2">Муниципальный</option>
      <option value="3">Региональный</option>
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
