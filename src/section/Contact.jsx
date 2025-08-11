import { div } from "three/tsl"
import AnimateHeaderSection from "../components/AnimateHeaderSection"
import { socials } from "../constants"
function Contact(){
const text = "Ini adalah Subtitle"
return(
    <div id="contact" className="min-h-screen overflow-hidden bg-black rounded-t-3xl flex flex-col gap-10 ">

        <AnimateHeaderSection 
        subTitle="Let's Work Together"
        title="Contact"
        text="Let's Connect"
        textColor="text-white"
        withScrollTrigger="true"
        />
        {socials.map((medsos,medsosIndex)=>(
            <div className="mb-5" key={medsosIndex}>
                <h1 className="text-white text-4xl font-light px-10">{medsos.name}</h1>
                <div className="w-full h-1 bg-white "/>


                <a className="flex items-center mt-3 px-10" href={medsos.href}>
                <img className="mr-10" src={medsos.gambar} alt="" />
                <h3 className="text-white text-2xl font-light">{medsos.title}</h3>
                </a>

            </div>
        ))}
    </div>
)
}export default Contact