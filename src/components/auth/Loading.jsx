import React from "react";
import Loader from "react-loader-spinner";

export default function Loading({ texto }) {
  return (
    <div
      className="container my-3 d-flex"
      style={{
        width: "100%",
        height: "90vh",
      }}
    >
      <div className="m-auto text-center">
        <Loader type="ThreeDots" color="#6950df" height={100} width={100} />
        <p>{texto}</p>
      </div>
    </div>
  );
}
