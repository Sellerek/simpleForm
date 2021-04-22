import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import FormHeader from "./FormHeader";
import InputText from "./InputText";

import ThankYouPage from "./ThankYouPage";
import PictureWall from "./PictureWall";

import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../src/style.css";

import { firstSchema } from "../../src/validationSchemas";
import { newForm } from "../../src/values";

const PageWrapper = styled.div``;

const StyledForm = styled.div``;

const Button = styled.button``;

const BlockWrapper = styled.div``;

const FormContainer = props => {
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {}, [props.showThankYou]);

  const handleOnSubmit = (values, { setSubmitting }) => {
    var bodyFormData = new FormData();
    bodyFormData.append("first_name", values.first_name);
    bodyFormData.append("last_name", values.last_name);
    bodyFormData.append("type_of_contact_nip", values.type_of_contact_nip);
    bodyFormData.append("type_of_contact_pesel", values.type_of_contact_pesel);
    bodyFormData.append("file_name", values.file_name);
    bodyFormData.append("file_content", values.file_content);

    axios({
      method: "post",
      url: "https://localhost:60001/Contractor/Save",
      data: bodyFormData
    })
      .then(data => {
        setTimeout(() => setSubmitting(false), 1000);
        setTimeout(() => setShowThankYou(true), 1000);
      })
      .catch(error => {
        setTimeout(() => setSubmitting(false), 1000);
        setTimeout(() => setShowThankYou(true), 1000);
      });
  };

  if (showThankYou) {
    return <ThankYouPage setShowThankYou={setShowThankYou} />;
  } else {
    return (
      <Formik
        initialValues={{ ...newForm.values }}
        onSubmit={handleOnSubmit}
        validationSchema={Yup.object().shape({ ...firstSchema })}
      >
        {props => {
          const { values, isSubmitting, handleSubmit } = props;

          return (
            <PageWrapper className="page__wrapper">
              <StyledForm className="styled__form" id="formularz">
                <div className="Form__wrapper">
                  <FormHeader
                    hl="Nowy kontrahent"
                    subhl={["Proszę uzupełnić dane"]}
                  />

                  <form className="Form__content" onSubmit={handleSubmit}>
                    <BlockWrapper className="block__wrapper">
                      <Row>
                        <Col xs={12} md={4} className="smaller-padding-right">
                          <InputText
                            inputLabel="Imię"
                            inputName="first_name"
                            inputId="first_name"
                            {...props}
                          />
                        </Col>
                        <Col xs={12} md={8} className="smaller-padding-left">
                          <InputText
                            inputLabel="Nazwisko"
                            inputName="last_name"
                            inputId="last_name"
                            {...props}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <div role="group" aria-labelledby="my-radio-group">
                            <label className="radio">
                              <Field type="radio" name="type" value="Osoba" />
                              Osoba
                            </label>
                            <label className="radio">
                              <Field type="radio" name="type" value="Firma" />
                              Firma
                            </label>
                            <div>
                              {values.type === "Osoba" ? (
                                <InputText
                                  inputLabel="PESEL"
                                  inputName="type_of_contact_pesel"
                                  inputId="type_of_contact_pesel"
                                  {...props}
                                />
                              ) : (
                                <InputText
                                  inputLabel="NIP"
                                  inputName="type_of_contact_nip"
                                  inputId="type_of_contact_nip"
                                  {...props}
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </BlockWrapper>

                    <BlockWrapper className="block__wrapper">
                      <Row>
                        <Col xs={12}>
                          <PictureWall
                            {...props}
                            inputName="file_name"
                            inputId="file_name"
                            inputLabel="Wgraj zdjęcie"
                          />
                        </Col>
                      </Row>
                    </BlockWrapper>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="form__submit__button"
                    >
                      <span>WYŚLIJ</span>
                    </Button>
                  </form>
                </div>
              </StyledForm>
            </PageWrapper>
          );
        }}
      </Formik>
    );
  }
};

export default FormContainer;
