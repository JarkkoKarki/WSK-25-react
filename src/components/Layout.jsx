import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="min-h-screen justify-center bg-gray-900 text-gray-200">
      <header className="bg-gray-800 shadow-md">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">My App</h1>
        </div>
        <nav className="bg-gray-700">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-2 px-4 py-3">
            <NavLink to="/" label="Home" />
            {user ? (
              <>
                <NavLink to="/profile" label="Profile" />
                <NavLink to="/upload" label="Upload" />
                <NavLink to="/logout" label="Logout" />
              </>
            ) : (
              <NavLink to="/login" label="Login" />
            )}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl justify-center px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

const NavLink = ({to, label}) => (
  <li>
    <Link
      to={to}
      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-600 hover:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      {label}
    </Link>
  </li>
);

export default Layout;
