import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <Home />
  );
};

export default NotFoundPage;
