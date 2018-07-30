import React from 'react';
import styled from 'styled-components';
import Controller from '../../components/controller';
import FaultCodes from '../../components/fault-codes';

// Styled-components example usage
const Title = styled.h3`
  color: tomato;
`;

const HomePage = () => (
  <div>
    <Title>Controller App</Title>
    <Controller />
    <div className="mb1" />
    <FaultCodes />
  </div>
);

export default HomePage;
