import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { redirectService } from '../Service';
import { useEffect, useState } from 'react';


const RedirectRoute = () => {
  const { shortenedURL } = useParams<{ shortenedURL: string }>();
  const [redirectURL, setRedirectURL] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRedirectURL = async () => {
      const originalURL = await redirectService(shortenedURL as string)
      setRedirectURL(originalURL)
    };
    fetchRedirectURL();
  }, [shortenedURL]);

  if (!redirectURL.startsWith('http')) navigate('/')
  else window.location.href = redirectURL

  return (
    <div>Carregando...</div>
  )
}

export default RedirectRoute;