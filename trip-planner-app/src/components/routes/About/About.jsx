import React from "react";
import "../About/about.scss";
const About = () => {
  return (
    <div className="awrap">
      
    <div id="bg"></div>
        <div className="logo">
        <h1 className="be">About Us</h1>
          {/* <h1>BeTrippin</h1> */}
          {/* <img src="https://res.cloudinary.com/twin2052000/image/upload/v1595270820/car_fast_hvh4xr.png"></img> */}
          </div>
        <section className="first">
          <p>
            BeTrippin is a new and improve roadtrip planner that will put all of
            your travel preparation concerns at ease!
          </p>
        </section>
        <section className="second">
          <p>
            Have you ever heard that "Proper, Preparation, Prevents, Poor,
            Performance"? Well you've come to the right place. Our customizable
            trip planner gives users the ability to keep track of all aspects of there
            trip. Have you ever forgotten to pack your favorite pair of socks?
            Couldn't remember that one activity you wanted to do once you
            reached your destination? Simply input all of your travel
            requirements into BeTrippin input fields and worry nomore!
          </p>
        </section>
        <section className="third">
          <p>
            BeTrippin also allows users to track every stop they want to make along
            there way, aswell as flag there destinations on our virtual map
            so you can see where your headed along your route.
          </p>
        </section>
        <section className="forth">
          <p>
            With BeTrippin we will turn your next roadtrip into the time of your
            life!
          </p>
        </section>
        
      
    </div>
  );
};

export default About;
