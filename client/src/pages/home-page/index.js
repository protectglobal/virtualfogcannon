import React from 'react';
import styled from 'styled-components';
import FogCannon from '../../components/fog-cannon';
import FaultCodes from '../../components/fault-codes';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Half = styled.div`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Spacer = styled.div`
  width: 20px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  handleFaultCodeClick = ({ faultCode }) => {
    // TODO: fire a POST request to PWA and wait for response
  }

  render() {
    return (
      <div>
        <Title>Controller App</Title>
        <div className="flex">
          <Half>
            <FogCannon />
          </Half>
          <Spacer />
          <Half>
            <FaultCodes />
          </Half>
        </div>

      </div>
    );
  }
}

export default HomePage;
