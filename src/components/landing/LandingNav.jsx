import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border-b border-white/20  shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/webkype-logo11.png" alt="Webkype" className="h-10 w-auto" />
        </div>
        <Button onClick={() => navigate('/auth')} size="md">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default LandingNav;
