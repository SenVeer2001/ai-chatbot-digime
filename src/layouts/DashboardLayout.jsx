import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';
import { useApp } from '../hooks/useApp';
import Footer from '../pages/Footer';

const DashboardLayout = ({ children }) => {
  const { darkMode } = useApp();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <Sidebar />
        <TopNavbar />
        <main className="ml-64 mt-16 p-8">
          {children}
        </main>

        <Footer/>
      </div>
    </div>
  );
};

export default DashboardLayout;
