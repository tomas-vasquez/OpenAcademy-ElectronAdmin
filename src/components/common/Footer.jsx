import React from "react";
import { Container } from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer fixed-bottom footer-bar">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()} made with
          <i className="fa fa-heart mx-2" />
          by
          <a
            className="badge badge-dark"
            rel="noopener"
            href="https://tomas-vasquez.vercel.app/"
            aria-label="My GitHub"
          >
            Tomas Vasquez
          </a>
        </div>
      </Container>
    </footer>
  );
}
