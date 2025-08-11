
import AnimateHeaderSection from "../components/AnimateHeaderSection";
function Hero (params) {
    const text = `Passionate Information System student specializing in web 
optimization and digital solutions for businesses and SMEs`;
    return(
        <section id='home' className="flex flex-col justify-end min-h-screen">
            <AnimateHeaderSection 
            subtitle={"404 bugs Not Found"}
            title={"Arthur Tirtajaya Jehuda"}
            text={text}
            texColor={"text-black"}></AnimateHeaderSection>
        </section>
    )
    
}
export default Hero;