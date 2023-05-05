import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading({ texto, style }) {
  return (
    <div
      className="container my-3 d-flex"
      style={{
        width: "100%",
        height: "90vh",
        ...style,
      }}
    >
      <div className="m-auto text-center">
        <ThreeDots type="ThreeDots" color="#6950df" height={100} width={100} />
        <p>{texto}</p>
      </div>
    </div>
  );
}
