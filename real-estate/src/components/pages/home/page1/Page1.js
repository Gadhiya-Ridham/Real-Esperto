import React, { useEffect, useState } from 'react';
import "./Page1.css";
import "../Home.css";
import img1 from "../../images/img-1.png";

function Page1() {
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    setShowBox(true);
  }, []);
  return (
    <div className="container-1">
      <div className="content-1">
        <div className={`description-1 ${showBox ? "trans-1" : ""}`}>
          <h1 className="heading-1">Find Your Best Smart Real Estate</h1>
          <p className="sub-heading-1">
            Accompanying us, you have a trip full of experiences. With Chisfis,
            booking accommodation, resort villas, hotels
          </p>
          <div className="btn-1">
            <a href="/">Start your search</a>
          </div>
        </div>

        <div className={`imageBox-1 ${showBox ? "trans-1" : ""}`}>
          <img src={img1} alt="1" className="ig" />
        </div>
        <div className={`searchForm-1 ${showBox ? "trans-1" : ""}`}>
        </div>
      </div>
    </div>
  );
}

export default Page1;
