import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { ProductCarousel, ArticleCarousel } from "../components/Carousel";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductCarousel />
      <ArticleCarousel />
      <Footer />
    </>
  );
};

export default Landing;
