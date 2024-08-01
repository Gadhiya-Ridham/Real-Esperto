import React from "react";
import "./tab2.css";

function Tab2(props) {
  const { property } = props;
  return (
    <>
      {property ? (
        <div className="property-box-2">
          <div className="prt-box-2-1">Property information</div>
          <div className="prt-line-2"></div>
          <div className="prt-box-2-2">
            <p>{property.propertyInformation}</p>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Tab2;
