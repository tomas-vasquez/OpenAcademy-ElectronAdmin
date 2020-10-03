import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Input,
  Button,
  Row,
} from "reactstrap";
import Axios from "axios";
import { addItemUrl } from "config";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Alerts from "helpers/Alerts";
import mongose from "mongoose";

export default class VideoInformation extends Component {
  constructor(props) {
    super();
    this.state = {
      item_title: props.item.item_title,
      item_video_url: props.item.item_video_url,
      item_author_id: props.item.item_author_id,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      item_title: props.item.item_title,
      item_video_url: props.item.item_video_url,
      item_author_id: props.item.item_author_id,
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

  componentDidUpdate() {
    setTimeout(() => {
      //validation input AuthorId
      let inputId = document.getElementById("imput");
      if (inputId)
        inputId.addEventListener("input", (e) => {
          if (!mongose.Types.ObjectId.isValid(inputId.value)) {
            inputId.setCustomValidity("!invalid");
          } else {
            inputId.setCustomValidity("");
          }
        });
    }, 500);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0 d-flex">
            <i className="fa fa-film mr-3" />
            {this.state.item_title}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Container fluid>
            <Row>
              <Col xs="5">
                <p className="m-0 mt-1 mb-3">previsualizacion:</p>
                <div className="d-flex">
                  <video
                    id="video"
                    controls
                    className="mx-auto"
                    style={{ width: "100%" }}
                    src={this.state.item_video_url}
                  />
                </div>
              </Col>
              <Col xs="7">
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

                  <p className="m-0 mt-1">author id:</p>
                  <Input
                    id="imput"
                    value={this.state.item_author_id}
                    onChange={(e) => {
                      this.setState({ item_author_id: e.target.value });
                    }}
                    type="text"
                    name="item_author_id"
                    required
                  />

                  <p className="m-0 mt-1">video url:</p>
                  <Input
                    value={this.state.item_video_url}
                    onChange={(e) => {
                      this.setState({ item_video_url: e.target.value });
                    }}
                    type="textarea"
                    name="item_video_url"
                    required
                  />

                  <div className="d-flex">
                    <Button
                      type="submit"
                      color="success"
                      className="mt-3 ml-auto"
                    >
                      <i className="fa fa-save mr-2" />
                      Guardar
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}
