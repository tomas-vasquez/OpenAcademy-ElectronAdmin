import React, { Component } from "react";

import { Card, CardBody, Button, Spinner } from "reactstrap";

import { addItem } from "fetchers/items";
import { saveItemSord } from "fetchers/items";
import ArrowIndicator from "./ArrowIndicator";
import AddItem from "./AddItem";
import DragList from "./DragList";
import SingleItem from "./SingleItem";

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      item: props.item,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ items: props.items, item: props.item });
  }

  handleAddItem = (type) => {
    let newItem = {
      item_title: "no name",
      item_course_id: this.props.course._id,
      item_author_id: this.props.course.course_author_id,
      item_type: type,
      item_sort: this.state.items.length,
    };
    addItem(newItem, (data) => {
      this.props.handleItemChanged(data);
    });
  };

  handleSaveItemSord = () => {
    let data = this.state.items.map((item) => ({
      _id: item._id,
      item_sort: item.item_sort,
    }));
    saveItemSord(data);
  };

  render() {
    return (
      <>
        <Card>
          <CardBody>
            {this.state.items ? (
              <DragList
                handleItemChanged={this.props.handleItemChanged}
                items={this.state.items}
              >
                {this.state.items
                  .sort((a, b) => a.item_sort - b.item_sort)
                  .map((item) => (
                    <SingleItem
                      key={item._id}
                      item={item}
                      currentItem={this.state.item}
                      handleItemTargetChanged={
                        this.props.handleItemTargetChanged
                      }
                    />
                  ))}
              </DragList>
            ) : (
              <div className="d-flex">
                <Spinner className="mx-auto my-5" />
              </div>
            )}

            <div className="d-flex">
              <Button
                color="success"
                type="submit"
                className="mt-3 ml-auto"
                onClick={this.handleSaveItemSord}
              >
                <i className="fa fa-save mr-2" />
                Save sort
              </Button>
            </div>
          </CardBody>
        </Card>
        <AddItem handleAddItem={this.handleAddItem} />
      </>
    );
  }
}
