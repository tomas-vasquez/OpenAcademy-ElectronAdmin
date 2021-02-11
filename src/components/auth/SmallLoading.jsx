import React from "react";
import Loader from "react-loader-spinner";

export default function SmallLoading({ text }) {
  return (
    <div
      className="container my-3 d-flex"
      style={{
        width: "100%",
      }}
    >
      <div className="m-auto text-center">
        <Loader type="ThreeDots" color="#6950df" height={100} width={100} />
        <p>{text}</p>
      </div>
    </div>
  );
}
