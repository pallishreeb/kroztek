/** @format */

import React from "react";
import "../css/herosection.css"; // Import your CSS file
import hero from "../img/hero2.svg";
const Hero = () => {
  const scrollToAllStories = () => {
    const element = document.getElementById("all-stories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section id="hero">
      <div className="hero flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2 text-conetnt">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            Powering Your World with Innovative Electrical Solutions!
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
            At Kroztek Integrated Solutions, we lead the charge in delivering
            cutting-edge electrical solutions for your industrial needs. Our
            commitment to excellence, safety, and efficiency powers industries,
            illuminates spaces, and empowers progress. Explore our expertise,
            experience the difference, and energize your success with us.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              onClick={() => scrollToAllStories()}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="md:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
