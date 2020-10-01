import React, { Component } from "react";
import ToolBar from "./ToolBar";
import ElectroLogo from "./App";
import AllCourses from "./AllCourses";
import EditCourse from "./EditCourse";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: "none",
      target: null,
    };
  }

  setCurrentView = (view, itemTarget) => {
    this.setState({ currentView: view, target: itemTarget });
  };

  render() {
    return (
      <>
        {this.state.currentView === "none" ? (
          <>
            <ToolBar setCurrentView={this.setCurrentView} />
            <ElectroLogo />
          </>
        ) : this.state.currentView === "courses" ? (
          <>
            <ToolBar setCurrentView={this.setCurrentView} />
            <AllCourses setCurrentView={this.setCurrentView} />
          </>
        ) : this.state.currentView === "edititems" ? (
          <EditCourse
            setCurrentView={this.setCurrentView}
            course={this.state.target}
          />
        ) : null}
      </>
    );
  }
}

export default App;
