import MediaRow from '../components/MediaRow';
import {useState, useEffect} from 'react';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetchData';

//(rafce)
const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log('selectedItem ', selectedItem);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaData = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        const authApiUrl = import.meta.env.VITE_AUTH_API;
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
    getMedia();
  }, []);
  console.log('mediaArray Pääohjelma: ', mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
