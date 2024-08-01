import React, {useRef} from "react";
import "./page7.css";
import img_t_l_1 from "./img/t-l-1.png";

import img_t_r_1 from "./img/t-r-1.png";
import img_m_l_1 from "./img/m-l-1.png";
import img_m_r_1 from "./img/m-r-1.png";
import img_b_l_1 from "./img/b-l-1.png";
import img_b_r_1 from "./img/b-r-1.png";
import img_quote_1 from "./img/quote-1.png";
import img_quote_2 from "./img/quote-2.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Comment from "./review";

function Page7() {
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  

  return (
    <div className="container-7">
      <div className="content-7">
        <div className="heading-7">
          <h2>Good news from far away</h2>
          <span>Lets's see what people think of Real Esperto</span>
        </div>
        <img src={img_t_l_1} alt="" className="img-top-left-7-1    img-7" />
        <img src={img_t_r_1} alt="" className="img-top-right-7-1   img-7" />
        <img src={img_m_l_1} alt="" className="img-middle-left-7-1 img-7" />
        <img src={img_m_r_1} alt="" className="img-middle-right-7-1 img-7" />
        <img src={img_b_l_1} alt="" className="img-bottom-left-7-1 img-7" />
        <img src={img_b_r_1} alt="" className="img-bottom-right-7-1 img-7" />
        <img src={img_quote_1} alt="" className="img-quote-7-1     img-7" />
        <img src={img_quote_2} alt="" className="img-quote-7-2     img-7" />

        {/* <div className="box-cmt-7">{Comment}</div> */}
        <div className="box-cmt-7">
          
        <Slider {...settings} ref={sliderRef} className="slick-slider">
          {Comment}
        </Slider>
        </div>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

export default Page7;
