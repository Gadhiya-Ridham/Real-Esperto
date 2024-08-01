import React, { useEffect } from 'react'; 
import Container1 from "./container1/container1";
import Container2 from "./container2/container2";
import Container3 from "./container3/container3";
import Container4 from "./container4/container4";
import NewsLetter from "../newsletter/newsletter";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Container1 />
      <Container2 />
      <Container4 />
      <Container3 />
      <NewsLetter />
    </>
  );
}

export default About;
