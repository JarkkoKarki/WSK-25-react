import React, {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks';

const Likes = ({mediaId, token}) => {
  const {getLikes, getLikesByUser, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState(false);

  const fetchLikes = async () => {
    try {
      const allLikes = await getLikes();
      if (Array.isArray(allLikes)) {
        const filteredLikes = allLikes.filter(
          (like) => like.media_id === mediaId,
        );
        setLikes(filteredLikes);
      } else {
        console.error('Likes data is not an array:', allLikes);
      }

      if (token) {
        const userLikesData = await getLikesByUser(token);
        const hasLiked = userLikesData.some((like) => like.file_id === mediaId);
        setUserLikes(hasLiked);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    console.log('Button clicked');
    try {
      if (userLikes) {
        await deleteLike(mediaId, token);
      } else {
        await postLike(mediaId, token);
      }
      fetchLikes(); // Fetch the updated likes after the like/unlike action
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  useEffect(() => {
    console.log('Fetching likes:', mediaId, token);
    fetchLikes();
  }, [mediaId, token]);

  return (
    <div>
      <button
        onClick={() => {
          console.log('Button clicked');
          handleLike();
        }}
        className={`rounded-md px-4 py-2 ${
          userLikes ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
        }`}
        disabled={!token}
      >
        {userLikes ? 'Unlike ❤️' : 'Like 🤍'}
      </button>

      <p>
        <span className="text-gray-500">
          {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </span>
      </p>
    </div>
  );
};

export default Likes;
