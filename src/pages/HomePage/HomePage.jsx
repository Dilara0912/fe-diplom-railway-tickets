import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Reviews from '../../components/Reviews/Reviews';
import Footer from '../../components/Footer/Footer';

function HomePage() {
  return (
    <main className="home">
      <Header />
      <Hero />
      <About />
      <HowItWorks />
      <Reviews />
      <Footer />
    </main>
  );
}

export default HomePage;