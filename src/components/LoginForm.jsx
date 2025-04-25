import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    console.log('login funktiota kutsuttu');
    console.log(inputs);
    await postLogin(inputs);
    navigate('/');
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);
  return (
    <>
      <div className="flex w-full justify-around rounded-2xl border-b border-gray-600 bg-gray-800 p-15.5 transition-colors duration-200">
        <h1 className="flex justify-center align-middle text-2xl font-bold">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-baseline rounded-2xl border-b border-gray-600 bg-gray-800 p-15.5 transition-colors duration-200"
        >
          <div className="p-10">
            <label htmlFor="loginuser">Username</label>
            <input
              className="rounded-2xl border-gray-500 bg-gray-700"
              onChange={handleInputChange}
              autoComplete="username"
              type="text"
              id="loginuser"
              name="username"
            />
          </div>
          <div className="p-10">
            <label htmlFor="loginpassword">Password</label>
            <input
              className="rounded-2xl border-gray-500 bg-gray-700"
              name="password"
              type="password"
              id="loginpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className="rounded-2xl border-gray-500 bg-gray-700 p-5"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
