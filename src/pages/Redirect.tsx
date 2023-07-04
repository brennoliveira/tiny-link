import { Navigate, useParams } from 'react-router-dom'
import { redirectService } from '../Service';
import { useEffect, useState } from 'react';


const Redirect = () => {
  const { shortenedURL } = useParams<{ shortenedURL: string }>();
  const [redirectURL, setRedirectURL] = useState<string>('');

  useEffect(() => {
    const fetchRedirectURL = async () => {
      const originalURL = await redirectService(shortenedURL as string)
      setRedirectURL(originalURL)
    };
    fetchRedirectURL();
  }, [shortenedURL]);

  if (redirectURL) window.location.href = redirectURL

  return (
    <div>Carregando...</div>
  )
}

export default Redirect;