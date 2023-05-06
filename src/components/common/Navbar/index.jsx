import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavLink,
  Nav,
  NavItem,
} from "reactstrap";
import Icons from "components/common/Icons";
import SignOut from "context/singout";
import Alerts from "helpers/Alerts";
import { connect } from "react-redux";

function AdminNavbar(props) {
  const { user, brandText, sidebarOpened, toggleSidebar } = props;

  return (
    <>
      <Navbar className={"navbar-absolute navbar-transparent"} expand="lg">
        <Container className="d-flex">
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>

            <NavbarBrand href="#">{brandText}</NavbarBrand>
          </div>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                color="default"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <div className="d-flex">
                  <div className="photo">
                    <img src={user.user_pic} alt="logo" />
                  </div>
                  <b className="caret d-none d-md-inline" />
                  <p className="my-auto ml-1 mr-3 d-none d-md-inline">
                    {user.user_name}
                  </p>
                </div>
              </DropdownToggle>

              <SignOut.Consumer>
                {(signOut) => (
                  <DropdownMenu className="dropdown-navbar" end tag="ul">
                    <NavLink tag="li">
                      <DropdownItem
                        className="nav-item"
                        onClick={() => {
                          Alerts.showToast("Good Bay");
                          signOut();
                        }}
                      >
                        <Icons icon="sign-out" className="mr-2" />
                        Sign out
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                )}
              </SignOut.Consumer>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(AdminNavbar);
