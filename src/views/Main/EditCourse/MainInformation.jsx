import React, { Component } from "react";
import { CardHeader, CardTitle, CardBody, Card, Collapse } from "reactstrap";

export default class MainInformation extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0 d-flex">
              <i className="fa fa-home mr-3" />
              Informaci'on principal:
              <i className="ml-auto fa fa-pus" />
            </CardTitle>
          </CardHeader>
          <Collapse isOpen={false}>
            <CardBody>cuerpo</CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}
