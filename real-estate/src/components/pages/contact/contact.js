import React, { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-icons/fa6";
import img_1 from "./contact-img.jpg";
import "./contact.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (data) => {
    try {
      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong.", "danger");
    } finally {
      reset();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="container-contact">
      <div className="content-contact">
        <div className="title-contact">Contact</div>
        <div className="form-box-contact">
          <div className="details-contact">
            <div className="photo-contact box-1-contact">
              <img src={img_1} alt="" className="contact-img"/>
            </div>
            <div className="address-contact box-1-contact">
              <h2>address:</h2>
              <p>The Twin Tower, Kalawad Road, Rajkot</p>
            </div>
            <div className="email-phone-contact box-1-contact">
              <div className="e-p-contact">
                <h3>Email:</h3>
                <p>real.esperto@gmail.com</p>
              </div>
              <div className="e-p-contact">
                <h3>Phone No:</h3>
                <p>+123 456 7890</p>
              </div>
            </div>
            <div className="link-contact box-1-contact">
              <h3>Socials</h3>
              <div className="icon-contact">

              <div className="icon-box-contact"><a href="/">
                    <Icon.FaFacebookF className="icon-ft" />
                  </a></div>
              <div className="icon-box-contact"><a href="/">
                    <Icon.FaInstagram className="icon-ft" />
                  </a></div>
              <div className="icon-box-contact"><a href="/">
                    <Icon.FaLinkedinIn className="icon-ft" />
                  </a></div>
              <div className="icon-box-contact"><a href="/">
                    <Icon.FaXTwitter className="icon-ft" />
                  </a></div>
              </div>
            </div>
          </div>
          <div className="form-contact">
            <form
              id="contact-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="form-group">
                <div className="form-name">
                  <label htmlFor="fname" className="contact-label">
                    First Name
                  </label>
                  <br></br>
                  <input
                    type="text"
                    placeholder="Enter your First Name"
                    id="fname"
                    name="fname"
                    className="input-contact"
                    {...register("fname", {
                      required: {
                        value: true,
                        message: "Please enter your name",
                      },
                      maxLength: {
                        value: 30,
                        message: "Please use 30 characters or less",
                      },
                    })}
                  />
                  <br></br>
                </div>
                <div className="form-name">
                  <label htmlFor="lname" className="contact-label">
                    Last Name
                  </label>
                  <br></br>
                  <input
                    type="text"
                    placeholder="Enter your Last Name"
                    id="lname"
                    name="lname"
                    className="input-contact"
                    {...register("lname", {
                      required: {
                        value: true,
                        message: "Please enter your name",
                      },
                      maxLength: {
                        value: 30,
                        message: "Please use 30 characters or less",
                      },
                    })}
                  />
                  <br></br>
                </div>
              </div>

              <div className="form-group-1">
                <label htmlFor="email" className="contact-label">
                  Email
                </label>
                <br></br>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-control-em"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                />
                <br></br>
              </div>
              <div className="form-group-1">
                <label htmlFor="message" className="contact-label">
                  Message
                </label>
                <br></br>
                <textarea
                  placeholder="Type your message..."
                  className="form-control-msg"
                  id="message"
                  name="message"
                  rows="5"
                  {...register("message", {
                    required: true,
                  })}
                ></textarea>
                <br></br>
              </div>
              <button type="submit" className="btn-contact">
                Submit
              </button>
              {alertInfo.display && (
                <div
                  className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
                  role="alert"
                >
                  {alertInfo.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
