import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Marquee } from "./_components/marquee";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <Hero />
      <Marquee />
    </div>
  );
}
