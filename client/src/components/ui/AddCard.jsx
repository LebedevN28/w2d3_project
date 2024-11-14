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
      if (
        !dataForApi.tittle ||
        !dataForApi.description ||
        !dataForApi.imagesUrl ||
        !dataForApi.levelPriority
      ) {
        alert('Не все поля заполнены');
        return;
      }
      console.log(dataForApi);

      const dataFile = new FormData();
      dataFile.append('tittle', dataForApi.tittle);
      dataFile.append('description', dataForApi.description);
      dataFile.append('imagesUrl', dataForApi.imagesUrl);
      dataFile.append('levelPriority', dataForApi.levelPriority);
      console.log(dataFile);

      await axiosInstance.post('/initiatives', dataFile);
      navigate('/initiatives');
      event.target.reset(); // очистка формы
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form onSubmit={addHandler} className="d-flex flex-column">
        <Form.Control
          name="tittle"
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
        <Form.Control
          name="levelPriority"
          type="text"
          placeholder="Название"
          className="mb-3"
        />
        <Button type="submit" variant="light" className="mb-3 center ">
          <Icon.Save />
        </Button>
      </Form>
    </Container>
  );
}
