import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </div>
  );
}

export default App;
