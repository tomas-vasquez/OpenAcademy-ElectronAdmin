import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  CardHeader,
  CardTitle,
} from "reactstrap";
import SingleOption from "./SingleOption";
// import uuidv4 from "uuidv4";

export default class SingleQuestion extends Component {
  handleEditContent = (newContent) => {
    const { question, questions, handleChangeQuestions } = this.props;
    let newQuestions = [...questions].map((_question) => {
      if (_question.key === question.key) {
        _question.content = newContent;
      }
      return _question;
    });
    handleChangeQuestions(newQuestions);
  };

  handleDelete = () => {
    const { question, questions, handleChangeQuestions } = this.props;
    let newQuestions = [...questions].filter((_question) => {
      return _question.key !== question.key;
    });
    handleChangeQuestions(newQuestions);
  };

  handleAddOption = () => {
    const { question, questions, handleChangeQuestions } = this.props;
    let newQuestions = [...questions].map((_question) => {
      if (_question.key === question.key) {
        _question.options.push({
          // key: uuidv4(),
          content: "",
          isCorrect: false,
        });
      }
      return _question;
    });
    handleChangeQuestions(newQuestions);
  };

  render() {
    const { question } = this.props;
    return (
      <section>
        <Card
          className="my-2"
          style={{
            border: "1px solid #e14eca7a",
          }}
        >
          <CardHeader className="d-flex">
            <Input
              className="mr-3"
              value={question.content}
              onChange={(e) => {
                this.handleEditContent(e.target.value);
              }}
              name="item_title"
              placeholder='Que significa "ALU"?'
              required
            />
            <CardTitle tag="h6" className="d-flex mb-0">
              <i
                className="ml-auto p-2 text-white fa fa-trash"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleDelete()}
              />
              <span className="p-2" href="#" style={{ cursor: "move" }}>
                <i className="text-white fa fa-arrows" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardBody>
            {question.options.map((option, index) => (
              <SingleOption key={index} option={option} {...this.props} />
            ))}
            <Button
              onClick={() => {
                this.handleAddOption();
              }}
            >
              <i className="fa fa-plus mr-2" />
              add option
            </Button>
          </CardBody>
        </Card>
      </section>
    );
  }
}
