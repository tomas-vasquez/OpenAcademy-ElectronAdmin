import React from "react";

export default function ArrowIndicator({ item, currentItem }) {
  return (
    <div
      style={{
        position: "absolute",
        left: -17,
        paddingTop: 6,
      }}
      className={
        item && currentItem && item._id === currentItem._id ? "" : "d-none"
      }
    >
      <i
        style={{ fontSize: "x-large" }}
        className="fa fa-arrow-left text-white"
      />
    </div>
  );
}
