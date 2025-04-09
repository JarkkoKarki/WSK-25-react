/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;

  const handleClick = () => {
    setSelectedItem(item);
  };

  return (
    <>
      <tr key={item.media_id}>
        <td>
          <img src={item.thumbnail} alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.username}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
        <td>
          {/*<button onClick={handleClick}>View</button>*/}
          <Link to="/single" state={{item}}>
            View
          </Link>
        </td>
      </tr>
    </>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default MediaRow;
