import React from "react";
import classname from "classname";
import { Card, CardBody } from "reactstrap";
import ArrowIndicator from "./ArrowIndicator";

export default function SingleItem({ item, currentItem, setTargetItem }) {
  return (
    <section
      style={{
        marginTop: "0.3em",
        paddingBottom: "0.3em",
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <ArrowIndicator item={item} currentItem={currentItem} />
      <Card
        className={classname("m-0", {
          "bg-default": item.item_type === "video",
          "bg-primary": item.item_type === "test",
          "bg-warning": item.item_type === "separator",
        })}
      >
        <CardBody
          className="p-0 d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => setTargetItem(item)}
        >
          <p className="mb-0 p-2">
            <i
              className={classname("fa mr-2", {
                "fa-film": item.item_type === "video",
                "fa-pencil": item.item_type === "test",
                "fa-minus": item.item_type === "separator",
              })}
            />

            {`${item.item_title} - ${item.item_sort}`}
          </p>
          <span className="ml-auto p-2" href="#" style={{ cursor: "move" }}>
            <i className="text-white fa fa-arrows" />
          </span>
        </CardBody>
      </Card>
    </section>
  );
}
