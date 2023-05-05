import React from "react";
import {
  Input,
  UncontrolledTooltip,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import _ from "lodash";
import Icons from "components/common/Icons";

const SingleSocialField = ({ name, defaultValue, isEditing }) => (
  <div className="form-group row showcase_row_area">
    <div className="col-md-4 text-md-right">
      <label className="h6">Enlace de {_.upperFirst(name)}:</label>
    </div>
    <div className="col-md-8 showcase_content_area">
      {isEditing ? (
        <InputGroup>
          <div className="input-group-append" addonType="prepend">
            <InputGroupText
              style={{ width: 40 }}
              className="text-muted bg-light"
            >
              <Icons icon={name} />
            </InputGroupText>
          </div>
          <Input
            id={`input-${name}`}
            name={`link_${name}`}
            defaultValue={defaultValue}
            type="text"
          />
          <div
            className="input-group-append"
            onClick={(e) => {
              window.open(
                document.getElementById(`input-${name}`).value,
                "blank"
              );
            }}
            addonType="append"
            style={{ cursor: "pointer" }}
          >
            <InputGroupText
              id={`tooltip-${name}`}
              className="text-muted bg-light"
            >
              <Icons icon="external-link" />
            </InputGroupText>
          </div>
          <UncontrolledTooltip delay={0} target={`tooltip-${name}`}>
            Provar enlace
          </UncontrolledTooltip>
        </InputGroup>
      ) : defaultValue && defaultValue !== "" ? (
        <a href={defaultValue}>{defaultValue}</a>
      ) : (
        <p>no definido</p>
      )}
    </div>
  </div>
);

export default SingleSocialField;
