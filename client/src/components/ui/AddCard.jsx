import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../api/axiosInstance';


export default function AddCard() {
  const navigate = useNavigate();

  const addHandler = async (event) => {
    event.preventDefault();
    console.log('Форма отправлена'); // Лог для проверки

    try {
      const dataFromForm = event.target;
      const newDataFromForm = new FormData(dataFromForm);
      const dataForApi = Object.fromEntries(newDataFromForm);
      if (
        !dataForApi.title ||
        !dataForApi.description ||
        !dataForApi.imagesUrl
      ) {
        alert('Не все поля заполнены');
        return;
      }
      console.log(dataForApi);

      const dataFile = new FormData();
      dataFile.append('title', dataForApi.title);
      dataFile.append('description', dataForApi.description);
      dataFile.append('imagesUrl', dataForApi.imagesUrl);
      console.log(dataFile);

      await axiosInstance.post('/initiatives', dataFile);
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
          name="imagesUrl"
          type="text"
          placeholder="Загрузите изображение"
          className="mb-3"
        />
      
        <Button type="submit" variant="light" className="mb-3 center ">
          <Icon.Save />
        </Button>
      </Form>
    </Container>
  );
}
