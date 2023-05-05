import React from "react";
import AnoymousTemplate from "../../templates/anonymous-template";
import Spacer from "../../components/common/spacer/spacer";
import Home from "../../components/anonymous/home/home";

const HomePage = () => {
  return (
    <AnoymousTemplate>
      <Spacer height={40} />
      <Home />
      <Spacer height={20} />
    </AnoymousTemplate>
  );
};

export default HomePage;
