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
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  console.log('user', user);
  return (
    <>
      <div className="w-full rounded-2xl border-b border-gray-600 bg-gray-800 p-5 p-8.5 transition-colors duration-200">
        <div className="rounded-2xl border-1 p-20">
          <h2 className="mb-4 rounded-2xl border-2 border-gray-700 p-3.5 text-3xl font-bold">
            Profile
          </h2>
          {user && (
            <>
              <p className="mb-4 p-3.5 text-3xl font-bold">
                Username: {user.username}
              </p>
              <p className="mb-4 p-3.5 text-3xl font-bold">
                Email: {user.email}
              </p>
              <p className="mb-4 p-3.5 text-3xl font-bold">
                Register Date:{' '}
                {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;
