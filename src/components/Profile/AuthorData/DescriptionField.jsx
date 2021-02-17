import React from "react";
import { Input, Collapse } from "reactstrap";
import SingleField from "./SingleField";

const DescriptionField = ({ defaultValue, defaultValue2, isEditing }) => (
  <Collapse isOpen={isEditing}>
    <hr className="my-4" />

    <h5 className="heading-small text-muted mb-4">Acerca de tí:</h5>

    <SingleField
      name="short_description"
      label="Cargo"
      defaultValue={defaultValue2}
      isEditing={isEditing}
      // onChange={nameChangedHandler}
    />

    <div className="form-group row showcase_row_area">
      <div className="col-md-4 text-right">
        <label className="h6" htmlFor="input20">
          Descripción:
        </label>
      </div>
      <div className="col-md-8 showcase_content_area">
        <Input
          className="mb-0"
          name="description"
          placeholder="Escribe algo acerca de tí..."
          rows="3"
          defaultValue={defaultValue}
          type="textarea"
          maxLength="160"
        />
      </div>
    </div>
  </Collapse>
);

export default DescriptionField;
