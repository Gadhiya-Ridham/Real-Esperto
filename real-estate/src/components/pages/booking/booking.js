import React, { useEffect, useState } from "react";
import {  useParams } from "react-router";
import "./booking.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingTab from "./bookingTab";
import axios from "axios";

function Booking() {
  const { id, activeState } = useParams();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <ToastContainer position="bottom-right" className="custome_toast" />
          <BookingTab property={property} id={id} activeState={activeState} />
        </>
      )}
    </>
  );
}

export default Booking;
