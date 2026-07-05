import './App.css';

import Badge from './components/Badge/Badge';

import Header from './components/header/Header';

import myPhoto from './assets/salom.jpg';

import { Element } from 'react-scroll';



function App() {

  return (

    <div className="w-full">

      {/* Navbar doim ustda turadi */}

      <Header />


          <Badge photoSrc={myPhoto} />

      {/* Scroll qilinadigan bo'limlar */}

      <Element name="about" className="h-screen w-full flex items-center justify-center">About me</Element>

      <Element name="contact" className="h-screen w-full flex items-center justify-center">Contact us</Element>

      <Element name="projects" className="h-screen w-full flex items-center justify-center">Projects</Element>

    </div>

  );

}



export default App;