import React, { Component } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Button,
  Alert,
} from "reactstrap";

import Axios from "axios";
import {
  courseItemsDescriptionsUrl,
  courseItemsDescriptionsUrl2,
} from "config";

import "./highlight";

import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import "highlight.js/styles/monokai-sublime.css";

import Alerts from "helpers/Alerts";

var toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["blockquote", "code-block"],

  ["clean"], // remove formatting button
];

export default class Description extends Component {
  constructor(props) {
    super();
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    this.loadDescription(this.props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.loadDescription(props);
  }

  loadDescription(props) {
    Axios.get(`${courseItemsDescriptionsUrl}/${props.item.item_content_url}`)
      .then((response) => {
        this.setState({
          content: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          content: "",
        });
      });
  }

  uploadDescription = () => {
    Alerts.showLoading();
    Axios.post(`${courseItemsDescriptionsUrl2}/${this.props.item._id}`, {
      newHtml: this.state.content,
    })
      .then((response) => {
        Alerts.showSuccess();
        this.props.handleItemChanged({
          ...this.props.item,
          ...response.data,
        });
      })
      .catch((error) => {
        Alerts.showLoading(false);
        console.log(error);
        this.setState({
          content: "",
        });
      });
  };

  render() {
    return (
      <Card className="my-3">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0 d-flex">
            <i className="fa fa-home mr-3" />
            Descripcion:
            <i className="ml-auto fa fa-pus" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <ReactQuill
            modules={{
              syntax: true,
              toolbar: toolbarOptions,
            }}
            className="bg-white "
            value={this.state.content}
            onChange={(c) => {
              console.log(c);
              this.setState({ content: c });
            }}
          ></ReactQuill>

          <Button
            type="submit"
            className="mt-3"
            onClick={this.uploadDescription}
          >
            <i className="fa fa-save mr-2" />
            Guardar
          </Button>
        </CardBody>
      </Card>
    );
  }
}
