import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

import ToolBar from "./ToolBar";
import ListItems from "./ListItems";
import SeparatorText from "./separator/SeparatorText";

import VideoInformation from "./video/VideoInformation";
import Description from "./video/Description";
import TestEditor from "./tests/TestEditor";
import { getItems } from "fetchers/items";
import { getAllCourses } from "fetchers/courses";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      items: null,
      targetItem: null,
    };
  }

  handleItemChanged = (item, setATargetItem = true) => {
    let index = this.state.items.findIndex((_item) => {
      return item._id === _item._id;
    });

    let newItems = [...this.state.items];

    if (index !== -1) {
      newItems[index] = item;
    } else {
      newItems.push(item);
    }

    this.setState({
      items: newItems,
    });

    setATargetItem &&
      this.setState({
        targetItem: item,
      });
  };

  handleItemTargetChanged = (item) => {
    this.setState({
      targetItem: item,
    });
  };

  componentDidMount() {
    const courseName = document.location.pathname.split("/")[2];
    getAllCourses((data) => {
      this.setState({
        course: data.courses.find((course) => {
          return course.course_short_link === courseName;
        }),
      });
      getItems(courseName, (data) => {
        this.setState({
          items: data.items,
        });
      });
    });
  }

  render() {
    return (
      <>
        <ToolBar setCurrentView={this.props.setCurrentView} />
        <Container fluid>
          <Row>
            <Col xs="8">
              {this.state.targetItem ? (
                this.state.targetItem.item_type === "video" ? (
                  <>
                    <VideoInformation
                      handleItemChanged={this.handleItemChanged}
                      item={this.state.targetItem}
                    />
                    <Description
                      handleItemChanged={this.handleItemChanged}
                      item={this.state.targetItem}
                    />
                  </>
                ) : this.state.targetItem.item_type === "test" ? (
                  <>
                    <SeparatorText
                      handleItemChanged={this.handleItemChanged}
                      item={this.state.targetItem}
                    />
                    <TestEditor
                      handleItemChanged={this.handleItemChanged}
                      item={this.state.targetItem}
                    />
                  </>
                ) : this.state.targetItem.item_type === "separator" ? (
                  <SeparatorText
                    handleItemChanged={this.handleItemChanged}
                    item={this.state.targetItem}
                  />
                ) : null
              ) : null}
            </Col>

            <Col xs="4">
              <ListItems
                course={this.state.course}
                handleItemTargetChanged={this.handleItemTargetChanged}
                handleItemChanged={this.handleItemChanged}
                items={this.state.items}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
