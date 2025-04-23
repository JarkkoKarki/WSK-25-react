import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <header>
        <h1 className="mb-4 text-4xl">My App</h1>
        <nav>
          <ul className="mb-2 flex list-none justify-end rounded-lg bg-stone-700 p-2 shadow-lg">
            <li>
              <Link
                className="block rounded-lg p-4 text-center text-white transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block rounded-lg p-4 text-center text-white transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block rounded-lg p-4 text-center text-white transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block rounded-lg p-4 text-center text-white transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block rounded-lg p-4 text-center text-white transition-all duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
