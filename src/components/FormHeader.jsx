import React from "react";

const FormHeader = props => {
  return (
    <div className="Form-header">
      {props.hl ? <h2 className="Form-header__hl">{props.hl}</h2> : null}

      {props.subhl ? (
        <h3 className="Form-header__subhl">{props.subhl}</h3>
      ) : null}
    </div>
  );
};

export default FormHeader;
