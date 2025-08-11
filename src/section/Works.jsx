import { div } from "three/tsl";
import AnimatedHeaderSection from "../components/AnimateHeaderSection"
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Works(){
    const text = "Lets take a look My Project"
    const previewRef = useRef(null)
    const[currentIndex,SetCurrentIndex] = useState(null);
    const moveX = useRef(null);
    const moveY = useRef(null);
    const mouse = useRef({x: 0, y: 0})


useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x",{
        duration: 1.5,
        ease: "power3.out"}),
    moveY.current = gsap.quickTo(previewRef.current, "y",{
        duration: 1.5,
        ease: "power3.out"});
       
        gsap.from("#projects", {
            opacity: 0,
            x:-100,
                
            })
        
        gsap.to("#projects", {
            opacity: 1,
            x:0,
            stagger:0.3,
            ease:"back.out",
            scrollTrigger: "#projects"
        
        })
});

    const handleMouseEnter = (index) => {
    if (window.innerWidth <768) return ;
    SetCurrentIndex(index);
    gsap.to(previewRef.current, {
        autoAlpha: 1,
        scale:1,
        duration:0.2,
        ease:"power2.out",
    })
};

    const handleMouseLeave = (index) => {
    if (window.innerWidth <768) return ;
    SetCurrentIndex(null);
    gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale:0.9,
        duration:0.2,
        ease:"power2.out",
    })
};

    const handleMouseMove = (e) => {
    if(window.innerWidth <768 ) return ;
        mouse.current.x = e.clientX +24 ;
        mouse.current.y = e.clientY +24 ;
        moveX.current(mouse.current.x);
        moveY.current(mouse.current.y);
};

    return (
        <section id="work" className="mb-10 mt-10"  >
        <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Work"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-light "  onMouseMove={handleMouseMove}>
        {projects.map((project, projectIndex) => (
            <div id="projects" className="relative flex flex-col cursor-pointer group md:gap-0" key={project.id}
            onMouseEnter={() => handleMouseEnter(projectIndex)}
            onMouseLeave={() => handleMouseLeave(projectIndex)}>
                <div className=" text-black transition-all duration-500 
                md:group-hover:px-15 md:group-hover:text-white md:group-hover:bg-black  ">
                    <div className=" w-screen h-1 bg-black"/>
                <div className="py-5">
                    
                    <h2 className="lg:text-[32px] text-[26px] leading-none">{project.name}</h2>
                    <div className="flex gap-5">
                   {project.frameworks.map((fm) => (
                    <div key={fm.id}> {fm.name}</div>
                ))}

                   </div>
                   
                </div>
                </div>
                {/* only mobile */}
                    <div className="relative flex items-center justify-center px-10 md:hidden "> 
                        <img className="object-cover rounded-md h--full w-full brightness-50" src={project.bgImage} alt="" />
                        <img src={project.image} alt="" className="absolute bg-center px-14 rounded-xl"/>
                    </div>
            </div>
        ))}
        <div ref={previewRef} className="fixed -top-0/2 left-0 z-50 overflow-hidden -translate-y-1/2 border-8 bordewr-black pointer-events-none w-[660px] md:block hidden opacity-0" >
            {currentIndex !== null && (
                <img src={projects[currentIndex].image} alt="" className="object-cover w-full h-full" />
            )}
        </div>
      </div>
        </section>
    )
}export default Works;