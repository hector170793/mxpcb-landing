import { Capabilities } from "./_components/capabilities";
import { Cta } from "./_components/cta";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Marquee } from "./_components/marquee";
import { Process } from "./_components/process";
import { Proof } from "./_components/proof";
import { Services } from "./_components/services";
import { Why } from "./_components/why";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <Hero />
      <Marquee />
      <Proof />
      <Services />
      <Why />
      <Capabilities />
      <Process />
      <Cta />
      <Footer />
    </div>
  );
}
