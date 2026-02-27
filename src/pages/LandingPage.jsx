import LandingNav from '../components/landing/LandingNav';
import LandingHero from '../components/landing/LandingHero';
import LandingFeatures from '../components/landing/LandingFeatures';
import LandingPricing from '../components/landing/LandingPricing';
import LandingFooter from '../components/landing/LandingFooter';
import HeroSection from '../components/landing/HeroSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
       
      <LandingNav />
      <LandingHero />
      {/* <HeroSection /> */}
      {/* <LandingPricing /> */}
      {/* <LandingFooter /> */}
    </div>
  );
};

export default LandingPage;
