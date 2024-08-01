import React, { useEffect } from "react";
import Page1 from "./page1/Page1";
import Page2 from "./page2/Page2";
import Page3 from "./page3/Page3";
import Page4 from "./page4/Page4";
import Page5 from "./page5/page5";
import Page6 from "./page6/Page6";
import Page7 from "./page7/page7";
import NewsLetter from "../newsletter/newsletter";


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <NewsLetter />
    </>
  );
}

export default Home;
