import React from "react";
import { MoveUpRight } from "lucide-react";
import HomePagePhoto from "../assets/Homepage-Photo.jpg";

const About = () => {
  return (
    <div className="w-full bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black">
      
      {/* Top Text */}
      <h1 className="text-[3.5vw] leading-[4vw] font-light px-20 pt-20 tracking-tight">
        We craft category-defining presentations, brand identities, and digital
        experiences that <span className="underline">drive funding</span>,{" "}
        <span className="underline">sales</span>, and{" "}
        <span className="underline">market leadership</span>.
      </h1>

      {/* Middle Section */}
      <div className="mt-16 border-t border-b border-zinc-400 flex px-20 py-12">
        
        <h2 className="w-[20%]">What you can expect:</h2>

        <div className="w-[40%] ml-[15vw] font-light space-y-6">
          <p>
            We don't just make slides. We shape strategy, storytelling, design
            scalable brand systems, and build presentations that make people say:
            “I want in!”
          </p>
          <p>
            Our clients make the world go round – from deep tech, aerospace and
            robotics to music festivals and Michelin-starred restaurants.
          </p>
          <p>
            Since 2019, we've been the go-to partner for Yahoo, Medallia, Uber,
            Lexus, Salience Labs, Trawa and AllThingsGo.
          </p>
        </div>

        <div className="underline flex flex-col ml-[10vw] space-y-2">
          <a href="">Instagram</a>
          <a href="">Behance</a>
          <a href="">Facebook</a>
          <a href="">LinkedIn</a>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex items-center px-20 py-16">
        
        <div>
          <h1 className="text-6xl font-normal tracking-tighter">
            How we can help:
          </h1>
          <button className="mt-6 px-10 py-5 rounded-full bg-black text-white uppercase flex items-center gap-4">
            read more <MoveUpRight className="rotate-6" />
          </button>
        </div>

        <div className="ml-[12vw]">
          <img
            className="h-[34vw] w-[44vw] rounded-2xl object-cover"
            src={HomePagePhoto}
            alt="About"
          />
        </div>

      </div>
    </div>
  );
};

export default About;