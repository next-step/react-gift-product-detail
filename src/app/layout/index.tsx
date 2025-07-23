import { Outlet } from 'react-router-dom';
import { Navigation } from '@/widgets/navigation';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout; 