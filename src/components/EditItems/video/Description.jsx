import React, {Component} from "react";
import {CardHeader, CardTitle, CardBody, Card, Button} from "reactstrap";

import "./highlight";

import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import "highlight.js/styles/monokai-sublime.css";

import {uploadDescription} from "fetchers/descriptions";

var toolbarOptions = [
  [{font: []}],
  [{header: [1, 2, 3, 4, 5, 6, false]}],
  [{align: []}],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{color: []}, {background: []}], // dropdown with defaults from theme

  [{list: "ordered"}, {list: "bullet"}],
  [{indent: "-1"}, {indent: "+1"}], // outdent/indent
  [{direction: "rtl"}], // text direction
  ["blockquote", "code-block"],

  ["clean"], // remove formatting button
];

export default class Description extends Component {
  constructor(props) {
    super();
    this.state = {
      content: props.item.item_description,
    };
  }

  componentDidUpdate(props) {
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({content: props.item.item_description})
  }

  uploadDescription = () => {
    uploadDescription(this.props.item._id, this.state.content, () => {
      this.props.handleItemChanged({
        ...this.props.item,
        item_description: this.state.content,
      });
    });
  };

  render() {
    return (
      <Card className="my-3">
        <CardHeader>
          <CardTitle tag="h4" className="mb-0 d-flex">
            <i className="fa fa-home mr-3" />
            Descripcion:
            <i className="ml-auto fa fa-pus" />
          </CardTitle>
        </CardHeader>
        <CardBody className="text-muted">
          <ReactQuill
            modules={{
              syntax: true,
              toolbar: toolbarOptions,
            }}
            className="bg-white"
            value={this.state.content}
            onChange={(c) => {
              this.setState({content: c});
            }}
          />
          <div className="d-flex">
            <Button
              type="submit"
              color="success"
              className="ml-auto mt-3"
              onClick={this.uploadDescription}
            >
              <i className="fa fa-save mr-2" />
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
