import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Button, Container, Row } from 'react-bootstrap';
import AllCard from '../ui/AllCard';

export default function MainPage({ user }) {
  const [cards, setcards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axiosInstance.get('/initiatives');
        setcards(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/initiatives/${id}`);
      if (res.status === 200) {
        setcards((prev) => prev.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.log(error);
      alert('Что-то пошло не так');
    }
  };
  const updateHandler = async (id) => {
    try {
      const res = await axiosInstance.put(`/initiative/${id}`);
      if (res.status === 200) {
        setcards((prev) => prev.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.log(error);
      alert('Что-то пошло не так');
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Row className="mt-3">
          {cards.map((card) => (
            <AllCard
              key={card.id}
              card={card}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
              user={user}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
