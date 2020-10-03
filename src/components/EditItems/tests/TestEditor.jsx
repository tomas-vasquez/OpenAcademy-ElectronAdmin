import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Button,
  Spinner,
} from "reactstrap";

import Axios from "axios";
import { courseItemsTestsUrl, courseItemsTestsUrl2 } from "config";
import Alerts from "helpers/Alerts";

import uuidv4 from "uuid/v4";
import ReactDragListView from "react-drag-listview";
import SingleQuestion from "./SingleQuestion";

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
    Axios.get(`${courseItemsTestsUrl}/${props.item.item_tree_url}`)
      .then((response) => {
        this.setState({
          tree: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          questions: [],
          correctAnswers: [],
        });
      });
  }

  uploadTest = () => {
    Alerts.showLoading();
    Axios.post(
      `${courseItemsTestsUrl2}/${this.props.item._id}`,
      this.state.test
    )
      .then((response) => {
        Alerts.showSuccess();
        // this.props.handleItemChanged({
        //   ...this.props.item,
        //   ...response.data,
        // });
      })
      .catch((error) => {
        Alerts.showLoading(false);
        console.log(error);
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

  onDragEnd = (fromIndex, toIndex) => {
    const questions = [...this.state.questions];
    const item = questions.splice(fromIndex, 1)[0];
    questions.splice(toIndex, 0, item);
    this.setState({ questions });
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
          <CardTitle tag="h5" className="mb-0 d-flex">
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
              {this.state.questions.map((question, index) => (
                <SingleQuestion
                  question={question}
                  questions={this.state.questions}
                  correctAnswers={this.state.correctAnswers}
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
