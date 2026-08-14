import React from "react";

import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import WhyLuxe from "../components/WhyLuxe";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <PromoBanner />
      <WhyLuxe />
      <Newsletter />
    </>
  );
}

export default Home;
