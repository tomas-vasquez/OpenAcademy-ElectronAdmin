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

export default class VideoInformation extends Component {
  constructor(props) {
    super();
    this.state = {
      item_title: props.item.item_title,
      item_video_url: props.item.item_video_url,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      item_title: props.item.item_title,
      item_video_url: props.item.item_video_url,
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();

    Axios.put(`${addItemUrl}/${this.props.item._id}`, this.state)
      .then((response) => {
        alert("ok");
        this.props.handleItemChanged(response.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

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
          <Container>
            <Row>
              <Col xs="5">
                <label className="m-0 mt-1 mb-3">previsualizacion:</label>
                <div className="d-flex">
                  <video
                    controls
                    className="mx-auto"
                    style={{ width: "100%" }}
                    src={this.state.item_video_url}
                  ></video>
                </div>
              </Col>
              <Col xs="7">
                <form onSubmit={this.onHandleSubmit}>
                  <label className="m-0 mt-1">titulo:</label>
                  <Input
                    value={this.state.item_title}
                    onChange={(e) => {
                      this.setState({ item_title: e.target.value });
                    }}
                    name="item_title"
                    required
                  />

                  <label className="m-0 mt-1">video url:</label>
                  <Input
                    value={this.state.item_video_url}
                    onChange={(e) => {
                      this.setState({ item_video_url: e.target.value });
                    }}
                    type="textarea"
                    name="item_video_url"
                    required
                  />

                  <hr />

                  <div className="d-flex">
                    <Button type="submit" className="mt-3 ml-auto">
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