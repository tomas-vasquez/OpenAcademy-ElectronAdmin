import React, {Component} from "react";

import Navbar from "../theme/Navbar";
import Footer from "../theme/Footer";
import Sidebar from "../theme/Sidebar";

import routes from "routes.js";
import logo from "assets/img/react-logo.png";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
  }

  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({sidebarOpened: !this.state.sidebarOpened});
  };

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path === path) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor="blue"
          logo={{
            outterLink: "/",
            text: "Open Academy",
            imgSrc: logo,
          }}
          toggleSidebar={this.toggleSidebar}
        />
        <div className="main-panel" data={"blue"}>
          <Navbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            toggleSidebar={this.toggleSidebar}
            sidebarOpened={this.state.sidebarOpened}
          />
          {this.props.children}
          <Footer />
        </div>
      </>
    );
  }
}
