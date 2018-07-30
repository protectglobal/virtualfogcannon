import React from 'react';
import styled from 'styled-components';
import Controller from '../../components/controller';

// Styled-components example usage
const Title = styled.h3`
  color: tomato;
`;

class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Title>Controller App</Title>
        <Controller />
      </div>
    );
  }
}

export default HomePage;
