import React from "react";
import "./Page6.css";
import img_6 from "../../images/img-6.png";

function Page6() {
  return (
    <div className="container-6">
      <div className="images-6">
        <img src={img_6} alt="" className="img-6" />
      </div>
      <div className="description-6">
        <span>bennefits</span>
        <h2>Happening cites</h2>

        <div className="box-6">
          <div className="box-6-1">
            <div className="badge-6 bg-1">
              <p>Advertising</p>
            </div>
            <h3 className="heading-6">Cost-effective advertising</h3>
            <span className="sub-heading-6">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </div>
          <div className="box-6-2">
            <div className="badge-6 bg-2">
              <p>Exposure</p>
            </div>
            <h3 className="heading-6">Reach millions with Chisfis</h3>
            <span className="sub-heading-6">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </div>
          <div className="box-6-3">
            <div className="badge-6 bg-3">
              <p>Secure</p>
            </div>
            <h3 className="heading-6">Secure and simple</h3>
            <span className="sub-heading-6">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page6;
