import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Button,
  Spinner,
} from "reactstrap";
import ReactDragListView from "react-drag-listview";

import uuidv4 from "uuidv4";
import SingleQuestion from "./SingleQuestion";
import { loadTest } from "fetchers/tests";
import { uploadTest } from "fetchers/tests";

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      questions: null,
    };
  }

  componentDidMount() {
    this.loadTest(this.props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.loadTest(props);
  }

  loadTest(props) {
    loadTest(
      props.item.item_tree_url,
      (data) => {
        this.setState(data);
      },
      () => {
        this.setState({
          questions: [],
        });
      }
    );
  }

  uploadTest = () => {
    uploadTest(this.props.item._id, this.state.test, (data) => {
      this.props.handleItemChanged({
        ...this.props.item,
        ...data,
      });
    });
  };

  handleAddQuestion = () => {
    let questions = this.state.questions;

    questions.push({
      key: uuidv4(),
      content: "",
      options: [],
    });

    this.setState({
      questions,
    });
  };

  handleChangeQuestions = (questions) => {
    this.setState({
      questions,
    });
  };

  onDragEnd = (fromIndex, toIndex) => {
    const questions = [...this.state.questions];
    const item = questions.splice(fromIndex, 1)[0];
    questions.splice(toIndex, 0, item);
    this.setState({ questions });
  };

  render() {
    return (
      <Card className="my-3">
        <CardHeader>
          <CardTitle tag="h4" className="mb-0 d-flex">
            <i className="fa fa-home mr-3" />
            preguntas:
            <i className="ml-auto fa fa-pus" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          {this.state.questions ? (
            <ReactDragListView
              onDragEnd={this.onDragEnd}
              nodeSelector="section"
              handleSelector="span"
            >
              {this.state.questions.map((question) => (
                <SingleQuestion
                  question={question}
                  questions={this.state.questions}
                  key={question.key}
                  handleChangeQuestions={this.handleChangeQuestions}
                />
              ))}
            </ReactDragListView>
          ) : (
            <div className="d-flex">
              <Spinner className="mx-auto my-5" />
            </div>
          )}

          <div className="d-flex w-100">
            <Button
              type="buttom"
              className="mt-3"
              onClick={this.handleAddQuestion}
            >
              <i className="fa fa-save mr-2" />
              Add pregunta
            </Button>

            <Button
              type="submit"
              color="success"
              className="mt-3 ml-auto"
              onClick={this.uploadTest}
            >
              <i className="fa fa-save mr-2" />
              Save
            </Button>
          </div>
          {/* {JSON.stringify(this.state.questions)} */}
        </CardBody>
      </Card>
    );
  }
}
