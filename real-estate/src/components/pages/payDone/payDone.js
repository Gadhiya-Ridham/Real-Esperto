import React, { useEffect, useState } from "react";
import "./payDone.css";
import "../booking/booking.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";

function PayDone() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const moreProperties = () => {
    navigate("/Properties");
  };

  useEffect(() => {
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

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const date = queryParam.get("date");
  const activeState = queryParam.get("activeState");
  const price = queryParam.get("price");
  const Active = queryParam.get("active");
  const randome = queryParam.get("bookingCode");

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
        <>
          {property && (
            <div className="container-paydone">
              <div className="box-pd">
                <div className="box-1-pd">
                  <h1>Congratulations 🎉 </h1>
                </div>
                <div className="line-1-pd"></div>
                <div className="box-2-pd">
                  <h3>Your Booking</h3>
                  <div className="box-2-1-pd">
                    <div className="image-pd">
                      <img
                        src={`data:image/jpeg;base64,${property.mainImage}`}
                        alt={`${property.propertyName} main`}
                        className="img-pd"
                      />
                    </div>
                    <div className="desc-pd">
                      <div className="pd-card-rg-1">
                        Hotel room in {property.city}
                      </div>
                      <div className="pd-card-rg-2">
                        {property.propertyName}
                      </div>
                      <div className="bkg-card-rg-3">
                        {property.beds} beds <div className="bkg-dot"></div>{" "}
                        {property.baths} baths
                      </div>
                      <div className="bkg-line-rg-1"></div>
                      <div className="bkg-card-rg-4">
                        <Icon.StarFill className="icon-rev-5" />
                        {property.rating}
                      </div>
                    </div>
                  </div>
                  <div className="pd-box-inn">
                    <div className="pd-box_1">
                      <Icon.Calendar2 className="icon-pd-1" />
                      <div className="pd-container-1">
                        <span>Date</span>
                        <p>{date}</p>
                      </div>
                    </div>
                    <div className="pd-box_1">
                      <Icon.House className="icon-pd-1" />
                      <div className="pd-container-1">
                        <span>Rent / Buy</span>
                        <p>{activeState}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-3-pd">
                  <h3>Booking Details</h3>
                  <div className="box-pd_left_right">
                    <div className="left-pd">
                      <div className="left-text-pd">Booking code</div>
                      <div className="left-text-pd">Date</div>
                      <div className="left-text-pd">Total</div>
                      <div className="left-text-pd">Payment method</div>
                    </div>
                    <div className="right-pd">
                      <div className="right-text-pd">#{randome}</div>
                      <div className="right-text-pd">{date}</div>
                      <div className="right-text-pd">${price}</div>
                      <div className="right-text-pd">{Active}</div>
                    </div>
                  </div>
                </div>
                <div className="box-4-pd">
                  <div className="btn-1-pd" onClick={moreProperties}>
                    Explore more properties
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PayDone;
