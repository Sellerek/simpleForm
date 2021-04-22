import React from "react";

import "../../src/inputs.css";

const InputText = props => {
  return (
    <div className="Form__input-wrapper">
      {props.inputLabel ? (
        <div className="Form__input-labelWrapper">
          <label
            htmlFor={props.inputId ? props.inputId : null}
            className="Form__input-label"
          >
            {props.inputLabel}
          </label>
        </div>
      ) : null}
      <input
        type="text"
        placeholder={props.inputPlaceholder ? props.inputPlaceholder : null}
        name={props.inputName ? props.inputName : null}
        id={props.inputId ? props.inputId : null}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        className={
          props.errors[props.inputName] && props.touched[props.inputName]
            ? "Form__text-input error"
            : !props.errors[props.inputName] && props.touched[props.inputName]
            ? "Form__text-input isOk"
            : "Form__text-input"
        }
        value={props.values ? props.values[props.inputName] : ""}
      />
      {props.errors && props.touched ? (
        <>
          {props.errors[props.inputName] && props.touched[props.inputName] && (
            <div className="feedback-container">
              <span className="form__input-text">
                {props.errors[props.inputName]}
              </span>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default InputText;
