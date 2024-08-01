import React, { useEffect, useState } from 'react';
import "./container1.css";
import img_1 from "../images/img-1.png";
import img_2 from "../images/img-2.png";
import CountUp from "react-countup";

function Container1() {
  const [showImageBox, setShowImageBox] = useState(false);

  useEffect(() => {
    setShowImageBox(true);
  }, []);


  return (
    <div className="a-container-1">
      <div className="a-content-1">
        <div className={`a-desc-1 ${showImageBox ? 'active' : ''}`}>
          <h3>About US</h3>
          <h2>Strategy-led design in every detail</h2>
          <p>
            We draw inspiration from art and design to refine living spaces,
            ensuring functionality and aesthetic appeal. Our theme centers on
            curating spaces that enhance life through their beauty and
            practicality.
          </p>
          <p>
            Design seamless, functional spaces. Goal: create visually appealing
            environments promoting comfort, well-being.
          </p>
          <div className="a-name-1">
            <h3>Ridham Gadhiya</h3>
            <p>Founder</p>
          </div>
        </div>
        <div className="a-img-container-1">
          <div className={`a-counter-box-1 ${showImageBox ? 'active' : ''}`}>
            <div className="a-counter-1">
              <h5>
                <CountUp start={0} end={105} duration={10} />
              </h5>
              <p className="a-cnt-p-1">
                Years of <br></br> Experience
              </p>
            </div>
            <div className="a-counter-1">
              <h5>
                <CountUp start={0} end={436} duration={10} />
                <span>+</span>
              </h5>
              <p className="a-cnt-p-1">
                Projects<br></br> Completed
              </p>
            </div>
            <div className="a-counter-1">
              <h5>
                <CountUp start={0} end={180} duration={10} />
                <span>+</span>
              </h5>
              <p className="a-cnt-p-1">
                Awards<br></br> Winning
              </p>
            </div>
          </div>
          <div className={`a-img-box-1 ${showImageBox ? 'active' : ''}`}>
            <img src={img_1} alt="" className="a-img-1"/>
            <img src={img_2} alt="" className="a-img-2"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Container1;
