/* eslint-disable no-unused-vars */
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {useAuthentication} from '../hooks/apiHooks';

const MediaRow = ({item, setSelectedItem}) => {
  const {isLoggedIn} = useAuthentication();

  const handleClick = () => {
    setSelectedItem(item);
  };

  return (
    <tr className="w-full border-b border-gray-600 bg-gray-800 transition-colors duration-200 hover:bg-gray-700">
      <td className="p-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-40 w-full rounded-lg object-cover shadow-md"
        />
      </td>
      <td className="p-4">{item.title}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4 text-sm text-gray-400">{item.username}</td>
      <td className="p-4 text-sm text-gray-400">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="p-4">{item.filesize}</td>
      <td className="p-4">{item.media_type}</td>
      <td className="p-4">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/single"
            state={{item}}
            onClick={(event) => {
              event.preventDefault();
              setSelectedItem(item);
            }}
            className="rounded-md bg-amber-500 px-3 py-1 text-sm font-semibold text-gray-900 transition hover:bg-amber-400"
          >
            View
          </Link>
          {isLoggedIn && (
            <>
              <button
                type="button"
                className="rounded-md bg-sky-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-sky-400"
                onClick={() => console.log('edit button clicked')}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-500"
                onClick={() => console.log('delete button clicked')}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
