import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const clickHandler = () => {
    setFormToggle(!formToggle);
  };

  return (
    <>
      {formToggle ? <LoginForm /> : <RegisterForm />}
      <button
        className="m-4 rounded-2xl border-gray-400 bg-gray-600 p-5"
        onClick={clickHandler}
      >
        {formToggle ? 'or Register' : 'or Login'}
      </button>
    </>
  );
};

export default Login;
