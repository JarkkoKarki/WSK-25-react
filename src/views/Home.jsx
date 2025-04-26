import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';
import {useState} from 'react';

const Home = () => {
  const {mediaArray} = useMedia();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <h2 className="my-4 text-center text-2xl font-bold">My Media</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-4 text-left">Thumbnail</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Type</th>
              <th className="hidden p-4 text-left sm:block">Operations</th>
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
      </div>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
