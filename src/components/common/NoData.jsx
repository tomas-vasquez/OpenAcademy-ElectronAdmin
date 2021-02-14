import React from "react";
import svgUrl from "assets/svgs/undraw_not_found_60pq.svg";

export default function NoData() {
  return (
    <div className="text-center my-5 pb-md-5">
      <div className="d-flex">
        <img
          src={svgUrl}
          className="mx-auto"
          style={{
            maxWidth: 300,
          }}
          alt=""
        />
      </div>
      <h1 className="mt-4">I found nothing to show</h1>
    </div>
  );
}
