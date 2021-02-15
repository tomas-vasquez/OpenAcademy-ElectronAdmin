import React from "react";
import PerfectScrollbar from "perfect-scrollbar";

class PerfectScrollWraper extends React.Component {
  ps = null;

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(this.myRef.current, {
      suppressScrollX: true,
      suppressScrollY: false,
      swipeEasing: false,

      ...this.props.options,
    });

    window.addEventListener("resize", () => {
      this.ps.update();
    });
  }

  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.myRef.current.scrollTop = 0;
    this.ps.update();
  }

  render = () => {
    return (
      <div
        id="p"
        className="p-0 m-0"
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
        ref={this.myRef}
      >
        {this.props.children}
      </div>
    );
  };
}

export default PerfectScrollWraper;
