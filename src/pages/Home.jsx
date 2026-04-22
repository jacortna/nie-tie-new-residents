import React from "react";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Categories from "../components/landing/Categories";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Categories />
    </div>
  );
}