import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(mediaApiUrl + '/media');
      const newData = await Promise.all(
        mediaData.map(async (item) => {
          const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);

          return {...item, username: data.username};
        }),
      );
      console.log(newData);
      setMediaArray(newData);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

export default useMedia;
