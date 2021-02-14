import React, { useState } from "react";
import { CardHeader, CardTitle, CardBody, Card, Button } from "reactstrap";
import ReactDragListView from "react-drag-listview";

// import uuidv4 from "uuidv4";
import SingleQuestion from "./SingleQuestion";
// import Loader from "react-loader-spinner";
import SmallLoading from "components/auth/SmallLoading";

export default function TestEditor({ item }) {
  const [questions, setQuestions] = useState(null);
  // const [test, setTest] = useState(null);

  const onDragEnd = (fromIndex, toIndex) => {
    const _questions = [...questions];
    const item = _questions.splice(fromIndex, 1)[0];
    _questions.splice(toIndex, 0, item);
    setQuestions(_questions);
  };

  const uploadTest = () => {
    // uploadTest(item._id, test, (data) => {
    //   this.props.handleItemChanged({
    //     ...item,
    //     ...data,
    //   });
    // });
  };

  const handleAddQuestion = () => {
    let questions = [...questions];
    questions.push({
      // key: uuidv4(),
      content: "",
      options: [],
    });
    setQuestions(questions);
  };

  return (
    <Card className="my-3">
      <CardHeader>
        <CardTitle tag="h4" className="mb-0 d-flex">
          <i className="fa fa-home mr-3" />
          questions:
          <i className="ml-auto fa fa-pus" />
        </CardTitle>
      </CardHeader>
      <CardBody>
        {questions ? (
          <ReactDragListView
            onDragEnd={onDragEnd}
            nodeSelector="section"
            handleSelector="span"
          >
            {questions.map((question) => (
              <SingleQuestion
                question={question}
                questions={questions}
                key={question.key}
                handleChangeQuestions={this.handleChangeQuestions}
              />
            ))}
          </ReactDragListView>
        ) : (
          <SmallLoading text="loading questions..." />
        )}

        <div className="d-flex w-100">
          <Button type="buttom" className="mt-3" onClick={handleAddQuestion}>
            <i className="fa fa-save mr-2" />
            Add question
          </Button>

          <Button
            type="submit"
            color="success"
            className="mt-3 ml-auto"
            onClick={uploadTest}
          >
            <i className="fa fa-save mr-2" />
            Save
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

// export default class Test extends Component {
//   constructor() {
//     super();
//     this.state = {
//       questions: null,
//     };
//   }

//   componentDidMount() {
//     this.loadTest(this.props);
//   }

//   UNSAFE_componentWillReceiveProps(props) {
//     this.loadTest(props);
//   }

//   loadTest(props) {
//     loadTest(
//       props.item.item_tree_url,
//       (data) => {
//         this.setState(data);
//       },
//       () => {
//         this.setState({
//           questions: [],
//         });
//       }
//     );
//   }

//   uploadTest = () => {
//     uploadTest(this.props.item._id, this.state.test, (data) => {
//       this.props.handleItemChanged({
//         ...this.props.item,
//         ...data,
//       });
//     });
//   };

//   handleAddQuestion = () => {
//     let questions = this.state.questions;

//     questions.push({
//       key: uuidv4(),
//       content: "",
//       options: [],
//     });

//     this.setState({
//       questions,
//     });
//   };

//   handleChangeQuestions = (questions) => {
//     this.setState({
//       questions,
//     });
//   };

//   render() {
//     return (

//     );
//   }
// }
