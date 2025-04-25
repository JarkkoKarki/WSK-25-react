import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    const loginResult = await postLogin(credentials);
    localStorage.setItem('token', loginResult.token);
    setUser(loginResult.user);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        setUser(userResponse.user);
        navigate(location.pathname);
      }
    } catch (e) {
      handleLogout();
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
