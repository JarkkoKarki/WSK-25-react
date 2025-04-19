import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  handleLogout();
  return <p>Logout page</p>;
};

export default Logout;
