import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Button, Container, Row } from 'react-bootstrap';
import AllCard from '../ui/AllCard';
import { useParams } from 'react-router-dom';

export default function AllCardOneUser({ user }) {
  const [cards, setcards] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axiosInstance.get(`/initiatives/usercards/${userId}`);
        setcards(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, [userId]);

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

  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Row className="mt-3">
          {cards.map((card) => (
            <AllCard
              key={card.id}
              card={card}
              deleteHandler={deleteHandler}
              user={user}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
