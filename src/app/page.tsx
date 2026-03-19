import Nav from '../../components/Nav';
import Ticker from '../../components/Ticker';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main style={{ paddingTop: 56 }}>
        <Hero />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
