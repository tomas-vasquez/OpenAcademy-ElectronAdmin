import React from "react";
import Icons from "./Icons";

export default function Logo() {
  return (
    <div className="fixed-top">
      <div className="container py-4">
        <span className="d-flex">
          <h2 className="m-0">
            <Icons icon="code" className="mr-2 text-info" />
            Your Academy{" "}
          </h2>
          <p className="pt-2 ml-2"> adminer</p>
        </span>
      </div>
    </div>
  );
}
