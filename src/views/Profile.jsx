import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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

  console.log(user);
  return (
    <>
      <h2>Profile</h2>
      {user && (
        <>
          <p>Username: {user.user.username}</p>
          <p>Email: {user.user.email}</p>
          <p>
            Register date:{' '}
            {new Date(user.user.created_at).toLocaleString('fi-FI')}
          </p>
        </>
      )}
    </>
  );
};
export default Profile;
