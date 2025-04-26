import PropTypes from 'prop-types';
import Likes from './Likes';
const SingleView = ({item, setSelectedItem}) => {
  const handleClick = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {item && (
        <dialog
          open
          className="fixed top-10 left-1/2 z-50 w-[90%] max-w-2xl -translate-x-1/2 rounded-lg bg-gray-800 p-6 text-white shadow-lg backdrop:bg-black/50"
        >
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              &#10005;
            </button>
          </div>

          <div className="mt-4">
            {item.media_type.includes('video') ? (
              <video
                src={item.filename}
                controls
                className="w-full rounded-lg shadow-md"
              />
            ) : (
              <img
                src={item.filename}
                alt={item.title}
                className="w-full rounded-lg object-cover shadow-md"
              />
            )}
          </div>

          <div className="mt-6 space-y-2">
            <h3 className="text-2xl font-bold text-amber-400">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
            <p className="text-sm text-gray-400">Owner: {item.username}</p>
          </div>
          <Likes mediaId={item.media_id} />
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
