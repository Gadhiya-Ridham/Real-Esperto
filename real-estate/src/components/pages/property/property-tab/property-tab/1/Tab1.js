import React, { useState } from "react";
import "./tab1.css";
import { HiOutlineUpload } from "react-icons/hi";
import * as Icon from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import * as Icons from "react-bootstrap-icons";

function Tab1(props) {
  const [isSaved, setIsSaved] = useState(false);
  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const { property } = props;

  const savedClass = isSaved ? "saved" : "";

  return (
    <>
      {property ? (
        <div className="property-box-1">
          <div className="prt-box-1-1">
            <div className="prt-badge">
              {property.propertyType}
            </div>
            <div className="prt-opt">
              <div className="share-1">
                <HiOutlineUpload className="prt-icon-1" />
                <p>Share</p>
              </div>
              <div className={`save-1 ${savedClass}`} onClick={toggleSaved}>
                <Icon.FaHeart className={`prt-icon-1 ${savedClass}`} />
                <p className={`${savedClass}`}>Save</p>
              </div>
            </div>
          </div>
          <div className="prt-box-1-2">
            <h2>{property.propertyName}</h2>
          </div>
          <div className="prt-box-1-3">
            <div className="prt-review-1">
              <Icon.FaStar className="prt-icon-1 clr-1" />
              <h3>{property.rating}</h3>
            </div>
            <div className="prt-dot-1"></div>
            <div className="prt-city-1">
              <Icons.Geo className="prt-icon-1" />
              <p>{property.city}</p>
            </div>
          </div>
          <div className="prt-box-1-4">
            <div className="prt-host-img-1">
              <div className="verified-1">
                <Icons.PatchCheckFill className="icon-verfies-1" />
                <Icons.PatchCheck className="icon-verfies-2" />
              </div>
              <img
                src={`data:image/jpeg;base64,${property.hostImage}`}
                alt="Host"
                className="prt_host_img"
              />
            </div>
            <div className="prt-name-1">
              <p>
                Hosted by <span>{property.hostName}</span>
              </p>
            </div>
          </div>
          <div className="prt-line-1"></div>
          <div className="prt-box-1-5">
            <div className="pri-facility-box-1">
              <IoBedOutline className="prt-facility-icon" />
              <h2>{property.beds}</h2>
              <p>beds</p>
            </div>
            <div className="pri-facility-box-1">
              <PiBathtub className="prt-facility-icon" />
              <h2>{property.baths}</h2>
              <p>baths</p>
            </div>
            <div className="pri-facility-box-1">
              <LiaExpandArrowsAltSolid className="prt-facility-icon" />
              <h2>{property.area}</h2>
              <p>Sq. Fit</p>
            </div>
            <div className="pri-facility-box-1">
              <Icons.PCircle className="prt-facility-icon-park" />
              <p>Parking : </p>
              <span>{property.parking ? "Available" : "Not Available"}</span>
            </div>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Tab1;
