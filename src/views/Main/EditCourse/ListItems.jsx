import React, { Component, useState } from "react";
import classname from "classname";
import ReactDragListView from "react-drag-listview";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ButtonGroup,
  Button,
  Spinner,
} from "reactstrap";
import Axios from "axios";
import { addItemUrl } from "config";

export default class ListItems extends Component {
  constructor(props) {
    super(props);

    const data = [];
    for (let i = 1, len = 7; i < len; i++) {
      data.push({
        title: `rows${i}`,
      });
    }
  }

  handleAddItem = (type) => {
    let newItem = {
      item_title: "no name",
      item_course_id: this.props.course._id,
      item_type: type,
    };

    console.log("......");

    Axios.post(addItemUrl, newItem)
      .then((response) => {
        alert("OK");
        const newItem = response.data;
        this.props.handleItemChanged(newItem);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  sortItems = (items) => {
    var aux = items;

    for (let y = 0; y <= items.length - 2; y++) {
      for (let i = 0; i <= items.length - 2; i++) {
        if (items[i].item_sort > items[i + 1].item_sort) {
          aux = items[i];
          items[i] = items[i + 1];
          items[i + 1] = aux;
        }
      }
    }
    return items;
  };

  render() {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const items = [...that.props.items];
        const item = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, item);
        that.setState({ items });
      },
      nodeSelector: "section",
      handleSelector: "a",
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            Items del curso
          </CardTitle>
        </CardHeader>

        <CardBody>
          {/* {JSON.stringify(this.props.items)} */}
          {this.props.items ? (
            <ReactDragListView {...dragProps}>
              {this.sortItems([...that.props.items]).map((item, index) => (
                <section key={index} className="py-2">
                  <Card
                    className={classname({
                      "bg-default": item.item_type === "video",
                      "bg-success": item.item_type === "test",
                      "bg-warning": item.item_type === "separator",
                    })}
                  >
                    <CardBody
                      className="p-0 text-white d-flex"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.props.handleItemTargetChanged(item)}
                    >
                      <p className="mb-0 p-2">
                        <i
                          className={classname("fa mr-2", {
                            "fa-film": item.item_type === "video",
                            "fa-pencil": item.item_type === "test",
                            "fa-minus": item.item_type === "separator",
                          })}
                        />

                        {`${index}. ${item.item_title}`}
                      </p>
                      <a
                        className="ml-auto p-2"
                        href="#"
                        style={{ cursor: "move" }}
                      >
                        <i className="text-white fa fa-plus" />
                      </a>
                    </CardBody>
                  </Card>
                </section>
              ))}
            </ReactDragListView>
          ) : (
            <div className="d-flex">
              <Spinner className="mx-auto my-5" />
            </div>
          )}

          <hr></hr>
          <label>
            <i className="fa fa-plus mr-1"></i>Anadir:
          </label>
          <div className="d-flex">
            <ButtonGroup className="mx-auto">
              <Button
                color="primary"
                onClick={() => {
                  this.handleAddItem("video");
                }}
              >
                clase de video
              </Button>
              <Button
                color="success"
                onClick={() => {
                  this.handleAddItem("test");
                }}
              >
                test o examen
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  this.handleAddItem("separator");
                }}
              >
                separador
              </Button>
            </ButtonGroup>
          </div>
        </CardBody>
      </Card>
    );
  }
}
