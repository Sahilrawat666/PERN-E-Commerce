import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import WhyLuxe from "../components/WhyLuxe";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedCollections />
        <FeaturedProducts />
        <PromoBanner />
        <WhyLuxe />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default App;
