import React from "react";
import "../../../property/property-tab/property-tab/3/tab3.css";
import * as Icon from "react-icons/fa";

function Amenities({ id, name, icon }) {
  return (
    <div className="prt-amn-box" style={{ display: id ? "flex" : "none" }}>
      <div className="icon-box-amn">{id ? icon : ""}</div>
      <p>{id ? name : ""}</p>
    </div>
  );
}

const Property_Details = () => {
  return JSON.parse(localStorage.getItem("propertyDetails"));
};

function Tab3Preview() {
  const property = Property_Details();
  const amenities = property.amenities;

  return (
    <>
      {property ? (
        <div className="property-box-3">
          <div className="prt-box-3-1">
            <h2>Amenities</h2>
            <p>About the property's amenities and service</p>
          </div>
          <div className="prt-line-3-1"></div>
          <div className="prt-box-3-2">
            {amenities.key && (
              <Amenities
                id={amenities.key}
                name={"Key"}
                icon={<Icon.FaKey />}
              />
            )}
            {amenities.luggage && (
              <Amenities
                id={amenities.luggage}
                name={"Luggage"}
                icon={<Icon.FaSuitcase />}
              />
            )}
            {amenities.shower && (
              <Amenities
                id={amenities.shower}
                name={"Shower"}
                icon={<Icon.FaShower />}
              />
            )}
            {amenities.spa && (
              <Amenities
                id={amenities.spa}
                name={"Spa"}
                icon={<Icon.FaSpa />}
              />
            )}
            {amenities.swimmingPool && (
              <Amenities
                id={amenities.swimmingPool}
                name={"Swimming Pool"}
                icon={<Icon.FaSwimmingPool />}
              />
            )}
            {amenities.tv && (
              <Amenities id={amenities.tv} name={"TV"} icon={<Icon.FaTv />} />
            )}
            {amenities.utensils && (
              <Amenities
                id={amenities.utensils}
                name={"Utensils"}
                icon={<Icon.FaUtensils />}
              />
            )}
            {amenities.wifi && (
              <Amenities
                id={amenities.wifi}
                name={"WiFi"}
                icon={<Icon.FaWifi />}
              />
            )}
            {amenities.bath_a && (
              <Amenities
                id={amenities.bath_a}
                name={"Bath"}
                icon={<Icon.FaBath />}
              />
            )}
            {amenities.bed_a && (
              <Amenities
                id={amenities.bed_a}
                name={"Bed"}
                icon={<Icon.FaBed />}
              />
            )}
            {amenities.parking_a && (
              <Amenities
                id={amenities.parking_a}
                name={"Parking"}
                icon={<Icon.FaParking />}
              />
            )}
            {amenities.kitchen && (
              <Amenities
                id={amenities.kitchen}
                name={"Kitchen"}
                icon={<Icon.FaUtensils />}
              />
            )}
            {amenities.hotTube && (
              <Amenities
                id={amenities.hotTube}
                name={"Hot Tub"}
                icon={<Icon.FaHotTub />}
              />
            )}
            {amenities.jacuzzi && (
              <Amenities
                id={amenities.jacuzzi}
                name={"Jacuzzi"}
                icon={<Icon.FaHotTub />}
              />
            )}
            {amenities.security && (
              <Amenities
                id={amenities.security}
                name={"Security"}
                icon={<Icon.FaLock />}
              />
            )}
            {amenities.playArea && (
              <Amenities
                id={amenities.playArea}
                name={"Play Area"}
                icon={<Icon.FaGamepad />}
              />
            )}
            {amenities.cinemaHall && (
              <Amenities
                id={amenities.cinemaHall}
                name={"Cinema Hall"}
                icon={<Icon.FaFilm />}
              />
            )}
            {amenities.frontPorch && (
              <Amenities
                id={amenities.frontPorch}
                name={"Front Porch"}
                icon={<Icon.FaHome />}
              />
            )}
            {amenities.gym && (
              <Amenities
                id={amenities.gym}
                name={"Gym"}
                icon={<Icon.FaDumbbell />}
              />
            )}
            {amenities.airConditioning && (
              <Amenities
                id={amenities.airConditioning}
                name={"Air Conditioning"}
                icon={<Icon.FaSnowflake />}
              />
            )}
            {amenities.balcony && (
              <Amenities
                id={amenities.balcony}
                name={"Balcony"}
                icon={<Icon.FaSun />}
              />
            )}
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Tab3Preview;
