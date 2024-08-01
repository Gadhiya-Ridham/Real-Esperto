import React from "react";
import "./container2.css";
import img_2_1 from "../images/img-a-2-1.png";
import img_2_2 from "../images/img-a-2-2.png";
// import { FaGears } from "react-icons/fa6";
// import { HiOutlinePuzzlePiece } from "react-icons/hi2";

function container2() {
  return (
    <div className="a-container-2">
      <div className="a-content-2">
        <div className="a-heading-2">
          <h3 className="a-title-2">MODERN TRENDS OF LIVING</h3>
          <h2 className="a-sub-title-2">
            We focused on modern <br></br> architecture and interior design
          </h2>
        </div>
        <div className="a-box-2">
          <div className="a-desc-2">
            <div className="a-desc-box-2-1">
              <div className="a-icon-2-1"></div>
              <div className="a-text-2-1">
                <h3 className="a-2-title-1">Design Approach</h3>
                <p className="a-2-sub-title-1">
                  We combine innovative design practises with traditional
                  manufacturing techniques.
                </p>
              </div>
            </div>
            <div className="a-desc-box-2-2">
              <div className="a-icon-2-2"></div>
              <div className="a-text-2-1">
                <h3 className="a-2-title-1">Innovative Solutions</h3>
                <p className="a-2-sub-title-1">
                  Our core business is all about aligning our clients brands and
                  businesses.
                </p>
              </div>
            </div>
            <div className="a-desc-box-2-3">
              <div className="a-icon-2-3"></div>
              <div className="a-text-2-1">
                <h3 className="a-2-title-1">Project Management</h3>
                <p className="a-2-sub-title-1">
                  As a full-service firm, Inteco is present on projects from
                  start to finish, ensuring the ideas conceived.
                </p>
              </div>
            </div>
          </div>
          <div className="a-img-box-2">
            <img src={img_2_1} alt="" className="a-img-2-1" />
            <img src={img_2_2} alt="" className="a-img-2-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default container2;
