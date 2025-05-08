import HeroSection from "../components/Hero";
import Navbar from "../components/Navbar";
import TrophiesSection from "../components/TrophiesSection";
import Gallery from "../components/Gallery";
import PartnersSection from "../components/PartnersSection";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Feedback from "../components/Feedback";


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
