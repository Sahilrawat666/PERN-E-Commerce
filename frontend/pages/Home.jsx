import React from "react";

import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import WhyZenova from "../components/WhyZenova";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <PromoBanner />
      <WhyZenova />
      <Newsletter />
    </>
  );
}

export default Home;
