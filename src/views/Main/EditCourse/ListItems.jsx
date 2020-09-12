import React, { Component } from "react";
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
import { addItemUrl, itemsOrderUrl } from "config";

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ items: props.items });
  }

  handleAddItem = (type) => {
    let newItem = {
      item_title: "no name",
      item_course_id: this.props.course._id,
      item_type: type,
      item_sort: this.state.items.length,
    };
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

  handleSaveItemSord = () => {
    let data = [];

    this.state.items.forEach((item) => {
      let aux = {};
      aux._id = item._id;
      aux.item_sort = item.item_sort;
      data.push(aux);
    });

    Axios.put(itemsOrderUrl, data)
      .then(() => {
        alert("OK");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  reordenedFieldItemSord = (fromIndex, toIndex) => {
    let data = this.state.items.sort((a, b) => a.item_sort - b.item_sort);
    let newItems = null;
    let targetItem = data[fromIndex];

    if (fromIndex < toIndex) {
      let array1 = data.slice(0, toIndex + 1).filter((item) => {
        return item._id !== targetItem._id;
      });
      let array2 = data.slice(toIndex + 1);
      newItems = [...array1, targetItem, ...array2];
    } else {
      let array1 = data.slice(0, toIndex);

      let array2 = data.slice(toIndex).filter((item) => {
        return item._id !== targetItem._id;
      });
      newItems = [...array1, targetItem, ...array2];
    }

    newItems.forEach((item, key) => {
      let newItem = { ...item };
      newItem.item_sort = `${key + 1}`;
      this.props.handleItemChanged(newItem);
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            Items del curso
          </CardTitle>
        </CardHeader>

        <CardBody>
          {this.state.items ? (
            <ReactDragListView
              onDragEnd={this.reordenedFieldItemSord}
              nodeSelector="section"
              handleSelector="span"
            >
              {this.state.items
                .sort((a, b) => a.item_sort - b.item_sort)
                .map((item, index) => (
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

                          {`${item.item_title}`}
                        </p>
                        <span
                          className="ml-auto p-2"
                          href="#"
                          style={{ cursor: "move" }}
                        >
                          <i className="text-white fa fa-arrows" />
                        </span>
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

          <div className="d-flex">
            <Button
              type="submit"
              className="mt-3 ml-auto"
              onClick={this.handleSaveItemSord}
            >
              <i className="fa fa-save mr-2" />
              Guardar ordenamiento
            </Button>
          </div>

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
