import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Loader from '../HOCs/Loader';

export default function Layout({ user, logoutHandler }) {
  // Стили для фона, текста и деталей
  const layoutStyles = {
    backgroundColor: '#3A3A3A', // Цвет фона
    color: '#EDEDED', // Цвет текста
    minHeight: '100vh', // Минимальная высота для покрытия всего экрана
  };

  const containerStyles = {
    backgroundColor: '#3A3A3A', // Тот же фон для контейнера
    color: '#EDEDED', // Тот же цвет текста
    paddingTop: '20px', // Отступ сверху для контейнера
  };

  // Стили для навигации в NavBar
  const navStyle = {
    color: '#918981', // Цвет для деталей в навигации
  };

  // NavBar компонент с цветом для деталей
  const NavBar = ({ user, logoutHandler }) => {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="me-auto">
          <Nav.Link href="#home" style={navStyle}>
            Home
          </Nav.Link>
          <Nav.Link href="#about" style={navStyle}>
            About
          </Nav.Link>
          <Nav.Link href="#contact" style={navStyle}>
            Contact
          </Nav.Link>
          <Nav.Link onClick={logoutHandler} style={navStyle}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  };

  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <div style={layoutStyles}>
        <Container style={containerStyles}>
          <NavBar user={user} logoutHandler={logoutHandler} />
          <Outlet />
        </Container>
      </div>
    </Loader>
  );
}
