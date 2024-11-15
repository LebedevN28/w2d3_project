import React, { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateWithDelay = async () => {
      try {
        const timer = setTimeout(() => {
          navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Ошибка при навигации:', error);
      }
    };

    navigateWithDelay();
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div>
        <Image
          // src="../../../../public/img/photo_2024-11-15_16-17-45 (2).jpg"
          src="/img/photo_2024-11-15_16-17-45 (2).jpg"
          style={{ height: '750px' }}
        />
      </div>
    </Container>
  );
}
