import Footer from "../components/home/Footer";
import Profile from "../components/home/Landing";
import Slider from "../components/home/Slider";
import TestimonialsSection from "../components/home/Testinomial";
import Navbar from "../components/shared/Navbar";

const LandingPage = () => {
  return (
    <div>
      <div className="fixed top-0 z-30 w-full">
        <Navbar />
      </div>
      {/* <Header/> */}
      <Profile />
      <Slider />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
