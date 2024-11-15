import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import OneCard from '../ui/OneCard';
import Container from 'react-bootstrap/esm/Container';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

export default function CardPage({ user }) {
  const { id } = useParams();
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axiosInstance.get(`/initiatives/${id}`);
        setCurrentCard(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, [id]);

  // const deleteHandler = async (id) => {
  //   try {
  //     const res = await axiosInstance.delete(`/initiatives/${id}`);
  //     if (res.status === 200) {
  //       setCurrentCraft((prev) => prev.filter((el) => el.id !== id));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert('Что-то пошло не так');
  //   }
  // };

  // const updateHandler = async (event, craftId) => {
  //   try {
  //     event.preventDefault();
  //     const dataFromForm = event.target;
  //     const newDataFromForm = new FormData(dataFromForm);
  //     const dataForApi = Object.fromEntries(newDataFromForm);
  //     if (!dataForApi.title || !dataForApi.desc || !dataForApi.url) {
  //       alert('Необходимо заполнить все поля!');
  //       return;
  //     }
  //     const response = await axiosInstance.put(
  //       `/initiatives/${craftId}`,
  //       dataForApi
  //     );
  //     const newCraft = await response.data;
  //     console.log(newCraft, craftId);
  //     setCurrentCraft((prev) =>
  //       prev.map((el) => (el.id === craftId ? newCraft : el))
  //     );
  //     event.target.reset();
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response.status === 400) {
  //       alert('Необходимо заполнить все поля!');
  //     }
  //   }
  // };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Row>
          <OneCard
            card={currentCard}
            user={user}
            // updateHandler={updateHandler}
            // deleteHandler={deleteHandler}
          />
        </Row>
      </Container>
    </>
  );
}
