import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileWhatsAppCTA from '@/components/MobileWhatsAppCTA';
import Hero from '@/sections/Hero';
import ProductFocus from '@/sections/ProductFocus';
import SupportJourney from '@/sections/SupportJourney';
import Solutions from '@/sections/Solutions';
import FAQ from '@/sections/FAQ';
import FinalCTA from '@/sections/FinalCTA';
import Equipment from '@/sections/Equipment';
import Support from '@/sections/Support';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductFocus />
        <Equipment />
        <Solutions />
        <Support />
        <SupportJourney />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileWhatsAppCTA />
    </>
  );
}

export default App;
