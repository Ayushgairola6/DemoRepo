import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Welcome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await API.get('/welcome');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
        alert('You must log in to view this page.');
      }
    };
    fetchMessage();
  }, []);

  return <div>{message}</div>;
};

export default Welcome;
