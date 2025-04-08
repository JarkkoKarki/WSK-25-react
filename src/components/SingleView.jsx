import {PropTypes} from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  const handleClick = () => {
    setSelectedItem(null);
  };
  return (
    <>
      {item && (
        <dialog open>
          <button className="exit-button" onClick={handleClick}>
            &#10005;
          </button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls></video>
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setMediaItem: PropTypes.func.isRequired,
};

export default SingleView;
