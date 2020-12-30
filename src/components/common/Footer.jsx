import React from "react";

export default function Footer(litle) {
  return (
    <footer className="footer px-0 fixed-bottom footer-bar py-3">
      <div className="container text-center">
        <div>
          <p className="mb-0 text-center">
            © 2019-{new Date().getFullYear()} tu-academia.com. Made with{" "}
            <i className="fa fa-heart" /> by{" "}
            <a
              className="badge badge-dark"
              rel="noopener"
              href="https://tomas-dev.vercel.app/"
              aria-label="My GitHub"
            >
              Tomi
            </a>{" "}
            {/* using <Icons icon="react" /> */}
          </p>
        </div>
      </div>
    </footer>
  );
}
