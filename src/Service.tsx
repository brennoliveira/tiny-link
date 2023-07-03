import axios from 'axios'

export const shortenLink = async (originalUrl: string) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/link/shorten`, { originalUrl });
  if (res.status === 200){
    return res.data.shortenedUrl;
  } else {
    throw new Error('API request failed.');
  }
}