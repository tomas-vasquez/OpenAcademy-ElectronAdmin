import React from "react";
import { NavLink, Link } from "react-router-dom";
// reactstrap components
import { Nav } from "reactstrap";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return document.location.pathname === routeName ? "active" : "";
  }

  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  render() {
    const { routes, logo } = this.props;

    return (
      <div className="sidebar" data={"blue"}>
        <div className="sidebar-wrapper" ref="sidebar">
          <div className="logo">
            <Link
              to={"/"}
              className="simple-text logo-mini"
              onClick={this.props.toggleSidebar}
            >
              <div className="logo-img">
                <img src={"/icon.png"} alt="" style={{ borderRadius: "0px" }} />
              </div>
            </Link>
            <Link
              to={"/"}
              className="simple-text logo-normal"
              onClick={this.props.toggleSidebar}
            >
              Your Academy
            </Link>
          </div>
          <Nav>
            {routes
              .filter((prop) => {
                return !prop.hide;
              })
              .map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <NavLink to={prop.path} activeClassName="active">
                      <i className={prop.icon} />
                      {prop.name}
                    </NavLink>
                  </li>
                );
              })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
