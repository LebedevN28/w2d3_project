import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

export default function AddCard() {
  const navigate = useNavigate();

  const addHandler = async (event) => {
    event.preventDefault();
    console.log('Форма отправлена'); // Лог для проверки

    try {
      const formData = new FormData(event.target);

      // Извлекаем данные из формы
      const title = formData.get('title');
      const description = formData.get('description');
      const imageFile = formData.get('file'); // Изменено с imagesUrl на file

      console.log('Поля формы:', { title, description, imageFile }); // Проверка полей

      // Проверка на заполнение всех полей
      if (!title || !description || !imageFile) {
        alert('Не все поля заполнены');
        return;
      }

      // Отправляем данные на сервер
      const dataForApi = new FormData();
      dataForApi.append('title', title);
      dataForApi.append('description', description);
      dataForApi.append('file', imageFile); // Поле `file` должно совпадать с ожиданием сервера

      console.log('Данные для API:', dataForApi);
      await axiosInstance.post('/initiatives', dataForApi);

      // После успешной отправки
      alert('Данные успешно отправлены');
      navigate('/');
      event.target.reset();
    } catch (error) {
      console.error('Ошибка в addHandler:', error);
      alert('Ошибка отправки данных');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form onSubmit={addHandler} className="d-flex flex-column">
        <Form.Control
          name="title"
          type="text"
          placeholder="Название"
          className="mb-3"
        />
        <Form.Control
          name="description"
          type="text"
          placeholder="Описание"
          className="mb-3"
        />
        <Form.Control
          name="file" // Изменено на `file` для соответствия серверу
          type="file" // Изменено с text на file
          accept="image/*" // Ограничиваем выбор файлов изображениями
          className="mb-3"
        />

        <Button type="submit" variant="light" className="mb-3">
          <Icon.Save />
        </Button>
      </Form>
    </Container>
  );
}
