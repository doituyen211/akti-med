import React from "react";
import Hero from "../components/ui/Hero";
import Features from "../components/ui/Features";
import Testimonials from "../components/ui/Testimonials";
import CallToAction from "../components/ui/CallToAction";

/**
 * The home page of MediScribeAI. This page introduces the product,
 * highlights key features and provides social proof from testimonials.
 * A call‑to‑action at the bottom encourages users to sign up or
 * continue to the documentation.
 */
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
