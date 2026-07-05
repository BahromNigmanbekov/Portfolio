import './App.css';
import Badge from './components/Badge/Badge';
import Header from './components/header/Header';
import ScrollWaveline from './components/ScrollWaveline/ScrollWaveline';
import myPhoto from './assets/salom.jpg';
import { Element } from 'react-scroll';
import AboutSection from './components/AboutSection/AboutSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="relative w-full">
      <ScrollWaveline seedA={80} seedB={11} strokeWidth={15} debug={true} />

      <div className="relative z-10">
        <Header />
        <Badge photoSrc={myPhoto} />

        <Element name="about" className="w-full">
          <AboutSection />
        </Element>

        <Element name="projects" className="w-full">
          <ProjectsSection />
        </Element>

        <Element name="contact" className="w-full">
          <ContactSection />
        </Element>
        <Footer/>
      </div>
    </div>
  );
}

export default App;