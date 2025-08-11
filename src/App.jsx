import React from 'react';
import Navbar from './section/Navbar';
import Hero from './section/hero';
import ServiceSum from './section/ServiceSum';
import Services from './section/services';
import About from './section/About';
import ReactLenis from 'lenis/react';
import Works from './section/Works';
import Contact from './section/Contact';
import AI from './section/AI';

function App() {
    return (
    <div className=" w-screen min-h-screen overflow-x-auto">
        <Navbar/>
        <Hero/>
        <ServiceSum/>
        <Services/>
        <About/>
        <Works/>
        <Contact/>
        <AI/>
    </div> 
        // ,<section className='h-1000'></section>
    )
}

export default App;