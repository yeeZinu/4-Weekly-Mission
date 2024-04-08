import '../../styles/global.css';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getUser } from '../../util/api';
import Header from './header/Header';
import Footer from './footer/Footer';
import { User } from '../../types/types';

function Layout() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const handleUserLoad = async () => {
      try {
        const user = await getUser();

        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    handleUserLoad();
  }, []);

  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
