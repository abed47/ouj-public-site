import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../assets/styles/App.scss";
function LoadingPage() {
  return (
    <div className="loading-screen">
      <CircularProgress color="secondary" />
    </div>
  );
}

export default LoadingPage;
