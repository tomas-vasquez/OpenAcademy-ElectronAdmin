import React, { Component } from "react";

import Footer from "components/common/Footer";
import Controller_Users from "fetchers/Users";
import { Button } from "reactstrap";

export default class Login extends Component {
  constructor() {
    super();
    this.users = new Controller_Users();
  }

  submitHandlerLogin = (e) => {
    e.preventDefault();
    this.users.login(e.target, (data) => {
      console.log(data);
    });
  };

  render() {
    return (
      <>
        <section
          className="p-0 m-0"
          style={{
            backgroundImage: ` url(${require("../../assets/img/bg.png")})`,
          }}
        >
          <div className="container">
            <div
              className="row pt-5 d-flex"
              style={{ minHeight: "100vh", zIndex: 1 }}
            >
              <div className="my-auto col-12 col-md-6 col-lg-5 mx-auto">
                <div className="shape-before card">
                  <form
                    action=""
                    method="post"
                    className="rounded p-4"
                    onSubmit={this.submitHandlerLogin}
                  >
                    <h3 className="h2 mb-4">Iniciar sesión:</h3>
                    <div className="form-group">
                      <label>Tu correo:</label>
                      <input
                        id="input-email"
                        type="text"
                        name="email"
                        className="form-control"
                        required
                      />
                    </div>
                    <label>Tu contrasena:</label>
                    <div className="form-group">
                      <input
                        id="input-password"
                        name="password"
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="d-none custom-control custom-checkbox my-3">
                      <input
                        className="custom-control-input"
                        name="remember_token"
                        id="customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label d-inline"
                        htmlFor="customCheckLogin"
                      >
                        Recordarme en este dispositivo
                      </label>
                    </div>
                    <div className="form-group text-center mt-4">
                      <Button type="submit" color="info">
                        Iniciar sesión
                        <i className="fa fa-sign-in ml-2" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
