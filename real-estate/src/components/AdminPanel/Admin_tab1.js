import React, { useState, useEffect } from "react";
import "./admin-css.css";
import axios from "axios";

function Admin_tab1() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [UserDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const length = UserDetails.length;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setCurrentTime(new Date());
  }
  const fetchData = () => {
    axios
      .get("http://localhost:4040/getUserData")
      .then((response) => {
        setUserDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div className="p-erroe-1">{error}</div>;
  }
  return (
    <>
      <div className="admin-1-conatiner">
        <div className="admin-1-box-1">
          <div className="admin-user-count">No. of User : {length}</div>
          <div className="admin-current-time">
            {currentTime.toLocaleDateString()}{" "}
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="admin-main-box-table">
          <div className="admin-1-box-2">
            <div className="admin-tabel-user userId-tabel">Id</div>
            <div className="admin-tabel-user userImage-tabel">Image</div>
            <div className="admin-tabel-user userName-tabel">User Name</div>
            <div className="admin-tabel-user userEmail-tabel">User Email</div>
            <div className="admin-tabel-user userGender-tabel">User Gender</div>
            <div className="admin-tabel-user userAddress-tabel">
              User Address
            </div>
            <div className="admin-tabel-user userDOB-tabel">User DOB</div>
            <div className="admin-tabel-user userPHNumber-tabel">
              User Phone No.
            </div>
            <div className="admin-tabel-user admin-sp-1 userAbout-tabel">
              User Description
            </div>
            <div className="admin-tabel-user userJoinDate-tabel">
              User Join Date
            </div>
            <div className="admin-tabel-user userDataUpdate-tabel">
              User Update Data Date
            </div>
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
              {UserDetails.map((e, index) => {
                return (
                  <div className="admin-1-box-3" key={index}>
                    <div className="admin-tabel-user userId-tabel">
                      {index + 1}
                    </div>
                    <div className="admin-tabel-user userImage-tabel">
                      <img
                        src={`data:image/jpeg;base64,${e.profileImage}`}
                        alt="profile"
                        className="admin-table-image"
                      />
                    </div>
                    <div className="admin-tabel-user userName-tabel">
                      {e.firstName} {e.lastName}
                    </div>
                    <div className="admin-tabel-user userEmail-tabel">
                      {e.email}
                    </div>
                    <div className="admin-tabel-user userGender-tabel">
                      {e.gender}
                    </div>
                    <div className="admin-tabel-user userAddress-tabel">
                      {e.address}
                    </div>
                    <div className="admin-tabel-user userDOB-tabel">
                      {e.DOB ? e.DOB.slice(0, 10) : "Null"}
                    </div>
                    <div className="admin-tabel-user userPHNumber-tabel">
                      {e.phoneNumber}
                    </div>
                    <div className="admin-tabel-user userAbout-tabel">
                      {e.about}
                    </div>
                    <div className="admin-tabel-user userJoinDate-tabel">
                      {e.hostJoinTime ? e.hostJoinTime.slice(0, 10) : "Null"}
                    </div>
                    <div className="admin-tabel-user userDataUpdate-tabel">
                      {e.updatedAt ? e.updatedAt.slice(0, 10) : "Null"}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin_tab1;
