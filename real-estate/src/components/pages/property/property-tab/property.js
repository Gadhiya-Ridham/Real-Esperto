import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./property.css";
import NewsLetter from "../../newsletter/newsletter";
import RightTab1 from "./property-tab/right-tab/rightTab1";
import Tab1 from "./property-tab/1/Tab1";
import Tab2 from "./property-tab/2/Tab2";
import Tab3 from "./property-tab/3/Tab3";
import Tab4 from "./property-tab/4/Tab4";
import Tab5 from "./property-tab/5/Tab5";
import Tab6 from "./property-tab/6/Tab6";
import Imagetab from "./image_tab";
import axios from "axios";

function Property() {
  const { id } = useParams();
  const [currentSlide] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:4040/getPropertyDetails")
      .then((response) => {
        setPropertyDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      });
  };

  const property = propertyDetails.find((item) => item.id === parseInt(id));

  if (error) {
    return <div className="p-erroe-1">{error}</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="loding-screen-2">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="container-property">
          <Imagetab property={property} />
          <div className="property-box">
            <div className="property-box-left">
              <Tab1 property={property} currentSlide={currentSlide} />
              <Tab2 property={property} currentSlide={currentSlide} />
              <Tab3 property={property} currentSlide={currentSlide} />
              <Tab4 property={property} currentSlide={currentSlide} />
              <Tab5 />
              <Tab6 />
            </div>
            <div className="property-box-right">
              <RightTab1 property={property} />
            </div>
          </div>
          <NewsLetter />
        </div>
      )}
    </>
  );
}

export default Property;
