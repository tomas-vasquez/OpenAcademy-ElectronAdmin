import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Button,
  Spinner,
} from "reactstrap";

import uuidv4 from "uuid/v4";
import ReactDragListView from "react-drag-listview";
import SingleQuestion from "./SingleQuestion";
import { loadTest } from "fetchers/tests";
import { uploadTest } from "fetchers/tests";

export default class Test extends Component {
  constructor(props) {
    super();
    this.state = {};
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
        this.setState({
          tree: data,
        });
      },
      () => {
        this.setState({
          questions: [],
          correctAnswers: [],
        });
      }
    );
  }

  uploadTest = () => {
    uploadTest(this.props.item._id, this.state.test, () => {
      // this.props.handleItemChanged({
      //     ...this.props.item,
      //     ...response.data,
      // });
    });
  };

  handleAddQuestion = () => {
    let questions = this.state.questions;
    let correctAnswers = this.state.correctAnswers;
    const key = `${uuidv4()}`;

    questions.push({
      key,
      content: "",
      options: [],
    });

    correctAnswers.push({
      key,
      correct: null,
    });

    this.setState({
      questions,
      correctAnswers,
    });
  };

  handleChangeQuestions = (questions) => {
    this.setState({
      questions,
    });
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
            this.state.questions.map((question) => (
              <SingleQuestion
                question={question}
                questions={this.state.questions}
                correctAnswers={this.state.correctAnswers}
                key={question.key}
                handleChangeQuestions={this.handleChangeQuestions}
              />
            ))
          ) : (
            <div className="d-flex">
              <Spinner className="mx-auto my-5" />
            </div>
          )}

          <hr />
          <div className="d-flex w-100">
            <Button
              type="buttom"
              className="mt-3"
              onClick={this.handleAddQuestion}
            >
              <i className="fa fa-save mr-2" />
              Anadir pregunta
            </Button>

            <Button
              type="submit"
              color="success"
              className="mt-3 ml-auto"
              onClick={this.uploadTest}
            >
              <i className="fa fa-save mr-2" />
              Guardar
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
