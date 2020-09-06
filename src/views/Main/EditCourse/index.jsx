import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Container,
  ButtonGroup,
  Button,
} from "reactstrap";
import ToolBar from "./ToolBar";
import MainInformation from "./MainInformation";
import Axios from "axios";
import { courseItemsUrl } from "config";
import ListItems from "./ListItems";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      course: props.course,
      items: null,
    };
  }

  componentDidMount() {
    console.log(this.state.course.course_short_link);
    Axios.get(courseItemsUrl + "/" + this.state.course.course_short_link)
      .then(response => {
        this.setState({
          items: response.data.items,
        });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }

  render() {
    return (
      <>
        <ToolBar setCurrentView={this.props.setCurrentView} />
        <Container fluid>
          <Row>
            <Col xs="8">
              <MainInformation />
            </Col>

            <Col xs="4">
              <ListItems items={this.state.items} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
