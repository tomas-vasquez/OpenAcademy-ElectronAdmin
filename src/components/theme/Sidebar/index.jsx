import React from "react";
import { NavLink, Link } from "react-router-dom";
// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";

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
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={this.props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={this.props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }

    return (
      <div className="sidebar" data={"blue"}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
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
