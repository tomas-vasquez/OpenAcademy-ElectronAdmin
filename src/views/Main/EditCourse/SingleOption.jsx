import React from "react";
import Input from "reactstrap/lib/Input";

const handleEditOption = (
  newContent,
  option,
  question,
  questions,
  handleChangeQuestions
) => {
  let newQuestions = [...questions].map((_question) => {
    if (_question.key === question.key) {
      _question.options.map((_option) => {
        if (_option.key === option.key) {
          _option.content = newContent;
        }
        return _option;
      });
    }
    return _question;
  });

  handleChangeQuestions(newQuestions);
};

const handleDeleteOption = (
  option,
  question,
  questions,
  handleChangeQuestions,
  handleSetCorrectOption
) => {
  let newQuestions = [...questions].map((_question) => {
    if (_question.key === question.key) {
      _question.options = _question.options.filter((_option) => {
        return _option.key !== option.key;
      });
    }
    return _question;
  });

  handleChangeQuestions(newQuestions);
};

export default function SingleOption({
  option,
  question,
  questions,
  handleChangeQuestions,
  handleSetCorrectOption,
}) {
  return (
    <section className="d-flex">
      <Input
        type="text"
        value={option.content}
        placeholder="unidad logica aritmetica"
        onChange={(e) => {
          handleEditOption(
            e.target.value,
            option,
            question,
            questions,
            handleChangeQuestions
          );
        }}
      />
      <div className="d-flex ml-2">
        <span
          className="text-white ml-auto p-2 d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleSetCorrectOption(
              question,
              questions,
              option,
              handleChangeQuestions
            );
          }}
        >
          correct
          <i className="ml-2 pt-1 fa fa-square" />
        </span>

        <span
          className="text-white ml-auto p-2 d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleDeleteOption(
              option,
              question,
              questions,
              handleChangeQuestions
            );
          }}
        >
          <i className="ml-2 pt-1 fa fa-trash" />
        </span>
      </div>
    </section>
  );
}
