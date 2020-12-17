import React, {Component} from "react";
import Input from "reactstrap/lib/Input";

export default class SingleOption extends Component {
  handleEditOption = (newContent) => {
    const {option, question, questions, handleChangeQuestions} = this.props;
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

  handleSetCorrectOption = (option) => {
    const {question, questions, handleChangeQuestions} = this.props;
    let newQuestions = [...questions].map((_question) => {
      if (_question.key === question.key) {
        _question.options.map((_option) => {
          if (_option.key === option.key) {
            _option.isCorrect = !_option.isCorrect;
          }
          return _option;
        });
      }
      return _question;
    });
    handleChangeQuestions(newQuestions);
  };

  handleDeleteOption = () => {
    const {option, question, questions, handleChangeQuestions} = this.props;
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

  render() {
    //const { option, question } = this.props;
    const {option} = this.props;
    return (
      <section className="d-flex mb-1">
        <Input
          type="text"
          value={option.content}
          placeholder="unidad logica aritmetica"
          onChange={(e) => {
            this.handleEditOption(e.target.value);
          }}
        />
        <div className="d-flex ml-2">
          <span
            className="text-white ml-auto p-2 d-flex"
            style={{cursor: "pointer"}}
            onClick={() => {
              this.handleSetCorrectOption(option);
            }}
          >
            correct
            {option.isCorrect ? (
              <i className="ml-2 pt-1 fa fa-check-square" />
            ) : (
                <i className="ml-2 pt-1 fa fa-square" />
              )}
          </span>

          <span
            className="text-white ml-auto p-2 d-flex"
            style={{cursor: "pointer"}}
            onClick={() => {
              this.handleDeleteOption();
            }}
          >
            <i className="ml-2 pt-1 fa fa-trash" />
          </span>
        </div>
      </section>
    );
  }
}
