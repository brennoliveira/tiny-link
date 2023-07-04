import axios from 'axios'

export const shortenLink = async (originalUrl: string) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/link/shorten`, { originalUrl });
  if (res.status === 200){
    return res.data.shortenedUrl;
  } else {
    throw new Error('API request failed.');
  }
}

export const redirectService = async (shortenedURL: string) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/${shortenedURL}`);
    return await res.data.originalUrl
  } catch (error) {
    console.error('Erro ao obter a URL de redirecionamento:', error);
  }
}