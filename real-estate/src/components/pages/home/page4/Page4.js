import React, { useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Page4.css";
// import gallary from "../images/img";
import newYork from "../../images/newYourk.jpg";
import singapore from "../../images/singapore.jpeg";
import paris from "../../images/paris.jpg";
import london from "../../images/london.jpg";
import tokyo from "../../images/tokyo.jpeg";
import lakshadweep from "../../images/lakshadweep.jpeg";

function Page4() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const gallery = img.map((i) => {
    return (
      <div className="card-4" key={i.id}>
        <div className="box-4">
          <div className="imgages-4">
            <img src={i.image} alt={i.name} className="img-4" />
          </div>
          <div className="desc-4">
            <div className="title-4">
              <p>{i.name}</p>
            </div>
            <div className="sub-title-4">
              <span>{i.number} Properties</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="container-4">
      <div className="heading-box-4">
        <div className="heading-4">
          <h2>Heading of sections</h2>
          <span>Descriptions for sections</span>
        </div>
        <div className="nextPrev-4">
          <button className="prev-4" onClick={goToPrevSlide}>
            <Icon.ChevronLeft className="home-icon-4" />
          </button>
          <button className="next-4" onClick={goToNextSlide}>
            <Icon.ChevronRight className="home-icon-4" />
          </button>
        </div>
      </div>
      <div className="gallary-4">
        <Slider {...settings} ref={sliderRef}>
          {gallery}
        </Slider>
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

const img = [
  {
    id: "1",
    image: newYork,
    name: "New York",
    number: "188,288",
  },
  {
    id: "2",
    image: singapore,
    name: "Singapore",
    number: "18,288",
  },
  {
    id: "3",
    image: paris,
    name: "Paris",
    number: "298,288",
  },
  {
    id: "4",
    image: london,
    name: "London",
    number: "688,288",
  },
  {
    id: "5",
    image: tokyo,
    name: "Tokyo",
    number: "18,208",
  },
  {
    id: "6",
    image: lakshadweep,
    name: "Lakshadweep",
    number: "8,288",
  },
];

export default Page4;
