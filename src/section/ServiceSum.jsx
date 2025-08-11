import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { use } from "react";
gsap.registerPlugin(ScrollTrigger);

function ServiceSum() {
useGSAP( () => {
gsap.to("#title-service-1", {
    xPercent:10,
    scrollTrigger :{
        target : "#title-service-1",
        scrub : 1.5
    },
});  
gsap.to("#title-service-2", {
    xPercent:30,
    scrollTrigger :{
        target : "#title-service-2",
        scrub : 1.5,
    },
});
gsap.to("#title-service-3", {
    xPercent:-50,
    scrollTrigger :{
        target : "#title-service-3",
        scrub : 1.5,
    },
});

})
    return(
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive " >
        <div id="title-service-1">
            <p>Architecture</p>
        </div>
        <div id="title-service-2" className="flex items-center justify-center gap-3 translate-x-16">
            <p className="font-normal">Development</p>
            <div className=" w-10 h-1 md:w-32 bg-gold"/>
            <p>Deployment</p>
        </div>
        <div id="title-service-3" className="flex items-center justify-center gap-3 -translate-x-48">
            <p>
                APIS
            </p>
            <div className=" w-10 h-1 md:w-32 bg-gold"/>
            <p className="italic">Frontends</p>
            <div className=" w-10 h-1 md:w-32 bg-gold"/>
            <p className="italic">Security</p>
            
            
        </div>
    </section>
    );

};
export default ServiceSum;