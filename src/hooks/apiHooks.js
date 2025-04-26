import {useCallback, useEffect, useState} from 'react';

import {fetchData} from '../utils/fetchData';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(`${mediaApiUrl}/media`);

      const userData = await Promise.all(
        mediaData.map((item) =>
          fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );

      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return await fetchData(`${mediaApiUrl}/media`, fetchOptions);
  };

  const modifyMedia = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(`${mediaApiUrl}/media/${inputs.id}`, fetchOptions);
  };

  const deleteMedia = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return await fetchData(`${mediaApiUrl}/media/${id}`, fetchOptions);
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

const tokenExistsInLocalstorage = () => Boolean(localStorage.getItem('token'));

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(tokenExistsInLocalstorage());

  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    console.log('loginResult', loginResult.token);

    window.localStorage.setItem('token', loginResult.token);

    setIsLoggedIn(tokenExistsInLocalstorage());

    return loginResult;
  };

  return {postLogin, isLoggedIn};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
  }, []);

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };

  return {postFile};
};

export const useLike = () => {
  const getLikes = async () => {
    const response = await fetch(`${mediaApiUrl}/likes`);
    const json = await response.json();
    return json || [];
  };

  const getLikesByUser = async (token) => {
    const response = await fetch(`${mediaApiUrl}/likes/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json || [];
  };

  const postLike = async (file_id, token) => {
    const response = await fetch(`${mediaApiUrl}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({file_id}),
    });
    const json = await response.json();
    return json;
  };

  const deleteLike = async (file_id, token) => {
    const response = await fetch(`${mediaApiUrl}/likes/file/${file_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json;
  };

  return {getLikes, getLikesByUser, postLike, deleteLike};
};

export {useMedia, useAuthentication, useUser, useFile};
