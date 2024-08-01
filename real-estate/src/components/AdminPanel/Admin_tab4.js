import React, { useState, useEffect } from "react";
import "./admin-css.css";
import axios from "axios";

function Admin_tab4() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [UserDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setCurrentTime(new Date());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4040/getPaymentData");
        setUserDetails(response.data);
        setIsLoading(false);
        calculateTotalPayment(response.data);
      } catch (err) {
        console.log(err);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const calculateTotalPayment = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += parseFloat(item.paymentValue);
    });
    setTotalPayment(total);
  };

  if (error) {
    return <div className="p-erroe-1">{error}</div>;
  }

  return (
    <>
      <div className="admin-1-conatiner">
        <div className="admin-1-box-1">
          <div className="admin-user-count">No. of Payment : {UserDetails.length}</div>
          <div className="admin-user-count">
            Total Payment : $ {totalPayment}
          </div>
          <div className="admin-current-time">
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="admin-main-box-table">
          <div className="admin-1-box-2">
            <div className="admin-tabel-user userId-tabel">Id</div>
            <div className="admin-tabel-user userJoinDate-tabel">Booking Code</div>
            <div className="admin-tabel-user userEmail-tabel">Property Name</div>
            <div className="admin-tabel-user userEmail-tabel">User Email</div>
            <div className="admin-tabel-user userGender-tabel">Payment Mode</div>
            <div className="admin-tabel-user userAddress-tabel">Payment Value</div>
            <div className="admin-tabel-user userDOB-tabel">Payment Type</div>
            <div className="admin-tabel-user userPHNumber-tabel">Upi Id</div>
            <div className="admin-tabel-user userDataUpdate-tabel">Time of Payment</div>
          </div>
          {isLoading ? (
            <div className="loding-screen">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <>
              {UserDetails.map((e, index) => (
                <div className="admin-1-box-3" key={index}>
                  <div className="admin-tabel-user userId-tabel">{index + 1}</div>
                  <div className="admin-tabel-user userJoinDate-tabel">{e.bookingCode}</div>
                  <div className="admin-tabel-user userEmail-tabel">{e.propertyName}</div>
                  <div className="admin-tabel-user userEmail-tabel">{e.email}</div>
                  <div className="admin-tabel-user userGender-tabel">{e.paymentMode}</div>
                  <div className="admin-tabel-user userAddress-tabel">{e.paymentValue}</div>
                  <div className="admin-tabel-user userDOB-tabel">{e.propertyType}</div>
                  <div className="admin-tabel-user userPHNumber-tabel">{e.upiId}</div>
                  <div className="admin-tabel-user userDataUpdate-tabel">{e.createAt.slice(0, 10)}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin_tab4;
