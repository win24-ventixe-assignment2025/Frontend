import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/App.css';
import MobileNav from '../components/MobileNav';

export default function PortalLayout() {
  return (
    <div className="portal-wrapper">
      <Nav />
      <MobileNav/>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
