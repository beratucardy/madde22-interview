import React from "react";
import { Spinner } from "react-bootstrap";
import logo from "../../assets/img/Exclude.png";
import "./loading-page.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Spinner animation="border" variant="secondary" />
      <img src={logo} alt="Loading..." />
    </div>
  );
};

export default LoadingPage;
