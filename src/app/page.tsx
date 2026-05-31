import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Statement from "@/components/Statement";
import BuildAnimation from "@/components/BuildAnimation";
import ProcessStrip from "@/components/ProcessStrip";
import Models from "@/components/Models";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Statement />
        <BuildAnimation />
        <ProcessStrip />
        <Models />
        <Portfolio />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
