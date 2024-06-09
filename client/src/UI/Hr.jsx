import React from "react";
import styled from "styled-components";

const HorizontalLineContainer = styled.div`
  position: relative;
  margin: 20px 0;
  text-align: center;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 2px solid black;
`;

const OrText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0 10px;
`;

export default function Hr() {
  return (
    <HorizontalLineContainer>
      <HorizontalLine />
      <OrText>or</OrText>
    </HorizontalLineContainer>
  );
}
