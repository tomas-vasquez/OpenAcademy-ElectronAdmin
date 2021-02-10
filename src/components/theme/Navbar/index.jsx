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
import { useUser } from "reactfire";
import Icons from "components/common/Icons";
import SignOut from "context/singout";
import Alerts from "helpers/Alerts";

export default function AdminNavbar({
  brandText,
  sidebarOpened,
  toggleSidebar,
}) {
  const { data: user } = useUser();

  return (
    <>
      <Navbar className={"navbar-absolute navbar-transparent"} expand="lg">
        <Container fluid>
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
                <NavItem className="d-flex">
                  <div className="photo">
                    <img src={user.photoURL} />
                  </div>
                  <b className="caret d-none d-md-inline" />
                  <p className="my-auto ml-1 mr-3 d-none d-md-inline">
                    {user.displayName}
                  </p>
                </NavItem>
              </DropdownToggle>

              <SignOut.Consumer>
                {(signOut) => (
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
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
