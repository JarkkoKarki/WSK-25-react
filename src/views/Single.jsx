import {useLocation, useNavigate, useParams} from 'react-router';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {id} = useParams();
  const [item, setItem] = useState(state?.item || null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!item) {
        try {
          const fetchedItem = await fetchData(
            `https://media2.edu.metropolia.fi/media-api/api/v1/media/${id}`,
          );
          setItem(fetchedItem);
        } catch (error) {
          console.error('Error fetching item:', error);
          navigate(-1);
        }
      }
    };

    fetchItem();
  }, [id, item, navigate]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>
      {item.media_type.includes('video') ? (
        <video src={item.filename} controls />
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <h3>Title: {item.title}</h3>
      <p>{item.description}</p>
    </>
  );
};

export default Single;
