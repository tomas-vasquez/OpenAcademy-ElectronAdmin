import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Input,
  Button,
} from "reactstrap";

import { editItem } from "fetchers/items";

export default class SeparatorText extends Component {
  constructor(props) {
    super();
    this.state = {
      item_title: props.item.item_title,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      item_title: props.item.item_title,
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    editItem(this.props.item._id, this.state, (data) => {
      this.props.handleItemChanged(data);
    });
  };

  render() {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle tag="h4" className="mb-0 d-flex">
            <i className="fa fa-tag mr-3" />
            Title:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.onHandleSubmit}>
            <p className="m-0 mt-1">titulo:</p>
            <Input
              value={this.state.item_title}
              onChange={(e) => {
                this.setState({ item_title: e.target.value });
              }}
              name="item_title"
              required
            />
            <div className="d-flex">
              <Button type="submit" color="success" className="mt-3 ml-auto">
                <i className="fa fa-save mr-2" />
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}
