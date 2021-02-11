import React, { useEffect, useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardBody,
  Card,
  Input,
  Button,
  Row,
} from "reactstrap";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import YouTube from "react-youtube";
import Vimeo from "@u-wave/react-vimeo";
import Alerts from "helpers/Alerts";
import { useFirestore } from "reactfire";

export default function VideoInformation({ item }) {
  const firestore = useFirestore();

  const [item_id, setItem_id] = useState(item.id);
  const [item_title, setItem_title] = useState(item.item_title);
  const [item_video_url, setItem_video_url] = useState(item.item_video_url);
  const [item_author_id, setItem_author_id] = useState(item.item_author_id);

  useEffect(() => {
    if (item.id !== item_id) {
      setItem_title(item.item_title);
      setItem_video_url(item.item_video_url);
      setItem_author_id(item.item_author_id);
      setItem_id(item.id);
    }
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      ...item,
      item_title,
      item_video_url,
      item_author_id,
    };

    firestore
      .collection("course_items")
      .doc(item.id)
      .update(newData)
      .then(() => {
        Alerts.showSuccess();
      });
    Alerts.showLoading();
  };

  const src = item_video_url || "";
  let id = "";
  if (src.startsWith("https://www.youtube.com/watch")) {
    id = new URL(src).searchParams.get("v");
  } else if (src.startsWith("https://www.youtube.com/embed/")) {
    id = new URL(src).pathname.slice(7);
  } else if (src.startsWith("https://youtu.be/")) {
    id = new URL(src).pathname;
  }

  if (src.startsWith("https://vimeo.com/")) {
    id = new URL(src).pathname.slice(1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="mb-0 d-flex">
          <i className="fa fa-film mr-3" />
          {item_title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Container fluid>
          <Row>
            <Col xs="6">
              <div className="d-flex">
                <>
                  <div className="video-container shadow">
                    {(src.startsWith("https://www.youtube") ||
                      src.startsWith("https://youtu.be")) && (
                      <YouTube videoId={id} />
                    )}
                    {src.includes("vimeo") && <Vimeo video={id} autoplay />}
                  </div>
                </>
              </div>
            </Col>
            <Col xs="6">
              <form onSubmit={onHandleSubmit}>
                <p className="m-0 mt-1">titulo:</p>
                <Input
                  value={item_title || ""}
                  onChange={(e) => {
                    setItem_title(e.target.value);
                  }}
                  name="item_title"
                  required
                />

                <p className="m-0 mt-1">author id:</p>
                <Input
                  id="imput"
                  value={item_author_id || ""}
                  onChange={(e) => {
                    setItem_author_id(e.target.value);
                  }}
                  type="text"
                  name="item_author_id"
                  required
                />

                <p className="m-0 mt-1">video url:</p>
                <Input
                  value={item_video_url || ""}
                  onChange={(e) => {
                    setItem_video_url(e.target.value);
                  }}
                  type="textarea"
                  name="item_video_url"
                  required
                />

                <div className="d-flex">
                  <Button
                    type="submit"
                    color="success"
                    className="mt-3 ml-auto"
                  >
                    <i className="fa fa-save mr-2" />
                    Save
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
}

// export default class VideoInformation extends Component {
//   constructor(props) {
//     super();
//     state = {
//       item_title: props.item.item_title,
//       item_video_url: props.item.item_video_url,
//       item_author_id: props.item.item_author_id,
//     };
//   }

//   UNSAFE_componentWillReceiveProps(props) {
//     setState({
//       item_title: props.item.item_title,
//       item_video_url: props.item.item_video_url,
//       item_author_id: props.item.item_author_id,
//     });
//   }

//   onHandleSubmit = (e) => {
//     e.preventDefault();
//     editItem(props.item._id, state, (data) => {
//       props.handleItemChanged(data);
//     });
//   };

//   componentDidUpdate() {
//     setTimeout(() => {
//       //validation input AuthorId
//       let inputId = document.getElementById("imput");
//       if (inputId)
//         inputId.addEventListener("input", (e) => {
//           if (!mongose.Types.ObjectId.isValid(inputId.value)) {
//             inputId.setCustomValidity("!invalid");
//           } else {
//             inputId.setCustomValidity("");
//           }
//         });
//     }, 500);
//   }

//   render() {
//     );
//   }
// }
