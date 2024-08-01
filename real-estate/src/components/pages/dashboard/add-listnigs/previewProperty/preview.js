import React from "react";
import "../../../property/property-tab/property.css";
import NewsLetter from "../../../newsletter/newsletter";
import Tab5 from "../../../property/property-tab/property-tab/5/Tab5";
import Tab6 from "../../../property/property-tab/property-tab/6/Tab6";
import Imagetabpreview from "./imageTabPreview";
import Tab1preview from "./Tab1Preview";
import Tab2preview from "./Tab2Preview";
import Tab3preview from "./Tab3Preview";
import Tab4preview from "./Tab4Preview";
import RightTab1Preview from "./rightTabPreview";

function Preview() {
  return (
    <>
      <div className="container-property">
        <Imagetabpreview />
        <div className="property-box">
          <div className="property-box-left">
            <Tab1preview />
            <Tab2preview />
            <Tab3preview />
            <Tab4preview />
            <Tab5 />
            <Tab6 />
          </div>
          <div className="property-box-right">
            <RightTab1Preview />
          </div>
        </div>
        <NewsLetter />
      </div>
    </>
  );
}

export default Preview;
