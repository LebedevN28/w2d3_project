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
    try {
      const dataFromForm = event.target;
      const newDataFromForm = new FormData(dataFromForm);
      const dataForApi = Object.fromEntries(newDataFromForm);
      console.log(dataForApi);

      if (!dataForApi.title || !dataForApi.description || !dataForApi.file) {
        alert('Не все поля заполнены');
        return;
      }

      const dataFile = new FormData();
      dataFile.append('title', dataForApi.title);
      dataFile.append('description', dataForApi.description);
      dataFile.append('file', dataForApi.file);
      console.log(dataFile);

      await axiosInstance.post('/initiatives', dataFile);
      navigate('/');
      event.target.reset(); // очистка формы
    } catch (error) {
      console.log(error);
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
          name="file"
          type="file"
          placeholder="Загрузите изображение"
          className="mb-3"
        />
        <Button  type="submit" variant="light" className="mb-3 center">
          <Icon.Save />
        </Button>
      </Form>
    </Container>
  );
}
