import {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({mediaId}) => {
  const {getLikesByMediaId, getLikesByUser, postLike, deleteLike} = useLike();
  const {user} = useUserContext();
  const [likes, setLikes] = useState([]);
  const [userLikeId, setUserLikeId] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const mediaLikes = await getLikesByMediaId(mediaId);
        setLikes(mediaLikes || []);

        if (user) {
          const userLike = await getLikesByUser(mediaId);
          if (userLike) {
            setUserLikeId(userLike.like_id);
          } else {
            setUserLikeId(null);
          }
        }
      } catch (error) {
        console.error('Error fetching likes:', error.message);
      }
    };

    fetchLikes();
  }, [mediaId, user, getLikesByMediaId, getLikesByUser]);

  const handleLike = async () => {
    try {
      if (userLikeId) {
        await deleteLike(userLikeId);
        setUserLikeId(null);
        setLikes((prev) => prev.filter((like) => like.like_id !== userLikeId));
      } else {
        const newLike = await postLike(mediaId);
        setUserLikeId(newLike.like_id);
        setLikes((prev) => [
          ...prev,
          {like_id: newLike.like_id, media_id: mediaId, user_id: user.user_id},
        ]);
      }
    } catch (error) {
      console.error('Error handling like:', error.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={!user}
        className={`rounded-full p-2 ${
          userLikeId ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {userLikeId ? '❤️ Liked' : '🤍 Like'}
      </button>
      <span>{likes.length} Likes</span>
    </div>
  );
};

export default Likes;
