import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  return (
    <div className="rounded-lg bg-stone-700 p-6 text-white shadow-lg">
      <h2 className="mb-4 text-3xl font-bold">Profile</h2>
      {user ? (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Username:</span>{' '}
            {user.user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.user.email}
          </p>
          <p>
            <span className="font-semibold">Register date:</span>{' '}
            {new Date(user.user.created_at).toLocaleString('fi-FI')}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
