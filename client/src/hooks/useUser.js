import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../components/api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function useUser() {
 const navigate = useNavigate
  const [user, setUser] = useState({ status: "logging" });
console.log(user);

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: 'logged', data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance
      .get('/account/logout')
      .then(() => setUser({ status: 'guest', data: null }));
    setAccessToken('');
  };

  // const signUpHandler = (e) => {
  //   e.preventDefault();
  //   const formData = Object.fromEntries(new FormData(e.target));
  //   if (!formData.email || !formData.password || !formData.name) {
  //     return alert('Missing required fields');
  //   }
  //   axiosInstance
  //     .post('/account/register', formData)
  //     .then(({ data }) => {
  //       setUser({ status: 'logged', data: data.user });
  //       setAccessToken(data.accessToken);
  //     })
  //     .catch((error) => alert(error));
  // };
  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.email || !formData.password || !formData.firstName) {
      return alert('Заполните все поля!');
    }
    axiosInstance
      .post('/account/register', formData)
      .then(({ data }) => {
        setUser({ status: 'logged', data: data.user });
        setAccessToken(data.accessToken);
        navigate('/');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert('Отсутствуют обязательные поля!');
    }
    axiosInstance
      .post('/account/login', formData)
      .then(({ data }) => {
        setUser({ status: 'logged', data: data.user });
        setAccessToken(data.accessToken);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    user,
    signInHandler,
    signUpHandler,
    logoutHandler,
  };
}
