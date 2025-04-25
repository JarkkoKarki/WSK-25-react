import PropTypes from 'prop-types';
import Likes from './Likes';

const SingleView = ({item, setSelectedItem}) => {
  if (!item) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <img
        src={item.thumbnail}
        alt={item.title}
        className="mt-4 rounded-lg shadow-lg"
      />
      <Likes mediaId={item.media_id} />
      <button
        onClick={() => setSelectedItem(null)}
        className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white"
      >
        Close
      </button>
    </div>
  );
};

export default SingleView;
