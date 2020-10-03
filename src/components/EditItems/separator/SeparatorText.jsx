import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Input,
  Button,
} from "reactstrap";
import Axios from "axios";
import { addItemUrl } from "config";
import Alerts from "helpers/Alerts";

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

    Alerts.showLoading();
    Axios.put(`${addItemUrl}/${this.props.item._id}`, this.state)
      .then((response) => {
        Alerts.showSuccess("");
        this.props.handleItemChanged(response.data);
      })
      .catch((error) => {
        Alerts.showErrorUnknow();
        console.error(error);
      });
  };

  render() {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0 d-flex">
            <i className="fa fa-tag mr-3" />
            {this.props.item.item_title}
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
                Guardar
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}
