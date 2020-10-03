import React from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  CardHeader,
  CardTitle,
} from "reactstrap";
import SingleOption from "./SingleOption";
import uuidv4 from "uuid/v4";

const handleDelete = (question, questions, handleChangeQuestions) => {
  let newQuestions = [...questions].filter((_question) => {
    return _question.key !== question.key;
  });
  handleChangeQuestions(newQuestions);
};

const handleEditContent = (
  newContent,
  question,
  questions,
  handleChangeQuestions
) => {
  let newQuestions = [...questions].map((_question) => {
    if (_question.key === question.key) {
      _question.content = newContent;
    }
    return _question;
  });

  handleChangeQuestions(newQuestions);
};

const handleAddOption = (question, questions, handleChangeQuestions) => {
  const key = `${uuidv4()}`;
  let newQuestions = [...questions].map((_question) => {
    if (_question.key === question.key) {
      _question.options.push({
        key,
        content: "",
      });
    }
    return _question;
  });

  handleChangeQuestions(newQuestions);
};

const handleSetCorrectOption = (
  question,
  questions,
  option,
  handleChangeQuestions
) => {
  let newQuestions = [...questions].map((_question) => {
    if (_question.key === question.key) {
    }
    return _question;
  });

  handleChangeQuestions(newQuestions);
};

export default function SingleQuestion({
  question,
  questions,
  handleChangeQuestions,
}) {
  return (
    <section>
      <Card
        className="mb-4"
        style={{
          border: "1px solid #e14eca7a",
        }}
      >
        <CardHeader className="d-flex">
          <Input
            className="mr-3"
            value={question.content}
            onChange={(e) => {
              handleEditContent(
                e.target.value,
                question,
                questions,
                handleChangeQuestions
              );
            }}
            name="item_title"
            placeholder='Que significa "ALU"?'
            required
          />
          <CardTitle tag="h6" className="d-flex mb-0">
            <i
              className="ml-auto p-2 text-white fa fa-trash"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleDelete(question, questions, handleChangeQuestions)
              }
            />
            <span className="p-2" href="#" style={{ cursor: "move" }}>
              <i className="text-white fa fa-arrows" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody>
          {question.options.map((option, index) => (
            <SingleOption
              key={index}
              option={option}
              question={question}
              questions={questions}
              handleChangeQuestions={handleChangeQuestions}
              handleSetCorrectOption={handleSetCorrectOption}
            />
          ))}

          <hr />
          <Button
            onClick={() => {
              handleAddOption(question, questions, handleChangeQuestions);
            }}
          >
            <i className="fa fa-plus mr-2" />
            anadir opcion
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}
