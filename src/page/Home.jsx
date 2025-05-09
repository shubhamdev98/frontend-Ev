import HeroSection from "../components/Home/Hero";
import Navbar from "../components/common/Navbar";
import TrophiesSection from "../components/Home/TrophiesSection";
import Gallery from "../components/Home/Gallery";
import PartnersSection from "../components/Home/PartnersSection";
import Footer from "../components/Home/Footer";
import FAQ from "../components/Home/FAQ";
import Feedback from "../components/Home/Feedback";


const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrophiesSection />
      <Gallery />
      <PartnersSection />
      <Feedback />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
