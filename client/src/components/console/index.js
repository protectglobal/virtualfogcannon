import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Terminal = styled.div`
  background-color: black;
  color: green;
  font-size: 16px;
  line-height: 30px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Console = ({ faultCode, httpRes }) => (
  <Terminal className="p1">
    {`>> faultCode: ${faultCode}`}
    <br />
    {`>> httpRes: ${(httpRes && !isEmpty(httpRes) && JSON.stringify(httpRes, { indent: true })) || ''}`}
  </Terminal>
);

Console.propTypes = {
  faultCode: PropTypes.string,
  httpRes: PropTypes.shape({
    status: PropTypes.string,
  }),
};

Console.defaultProps = {
  faultCode: '',
  httpRes: {},
};

export default Console;
