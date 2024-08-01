import React from "react";
import "../../../property/property-tab/property-tab/4/tab4.css";
import * as Icons from "react-bootstrap-icons";

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function Tab4Preview() {
  const property = Property_Details();
  const hostImage = sessionStorage.getItem("profileImage");
  const hostInformation = sessionStorage.getItem("about");
  const hostResponseRate = 100;
  const hostFastResponse = "within few hours";

  return (
    <>
      {property ? (
        <div className="property-box-4">
          <div className="prt-box-4-1">
            <h2>Host information</h2>
          </div>
          <div className="prt-line-4-1"></div>
          <div className="prt-box-4-2">
            <div className="prt-host-img-4">
              <div className="verified-4">
                <Icons.PatchCheckFill className="icon-verfies-4" />
                <Icons.PatchCheck className="icon-verfies-4-1" />
              </div>
              <img
                src={`data:image/jpeg;base64,${hostImage}`}
                alt="Host"
                className="prt_host_img"
              />
            </div>
            <div className="prt-name-4">
              <span>{property.hostName}</span>
            </div>
          </div>
          <div className="prt-box-4-3">
            <p>{hostInformation}</p>
          </div>
          <div className="prt-box-4-4">
            <div className="join-4">
              <Icons.Calendar2 className="icon-4" />
              <p>Joined in {property.hostJoinDate}</p>
            </div>
            <div className="res-rate-4">
              <Icons.ChatLeftText className="icon-4" />
              <p>Response rate - {hostResponseRate}%</p>
            </div>
            <div className="res-time-4">
              <Icons.Clock className="icon-4" />
              <p>Fast response - {hostFastResponse}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Tab4Preview;
