import React, { useEffect } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";

const StyledThankYou = styled.div``;

const StyledThankYouHeadline = styled.h2``;

const StyledThankYouDesc = styled.p``;

const StyledThankYouButton = styled.button`
  a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const ThankYouPage = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const returnToForm = () => {
    props.setShowThankYou(false);
  };

  return (
    <StyledThankYou className="styled_thank_you_page">
      <Row>
        <StyledThankYouHeadline className="styled_thank_you_headline">
          Twój formularz został przesłany
        </StyledThankYouHeadline>
      </Row>
      <Row>
        <StyledThankYouDesc className="styled_thank_you_desc">
          Dziękujemy za wypełnienie formularza.
        </StyledThankYouDesc>
      </Row>
      <Row>
        <StyledThankYouButton
          type="button"
          onClick={returnToForm}
          className="styled_thank_you_button"
        >
          <a href="https://www.mymusic.pl/">WRÓĆ DO mymusic.pl</a>
        </StyledThankYouButton>
      </Row>
    </StyledThankYou>
  );
};

export default ThankYouPage;
