import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import fogCannonFragment from '../../graphql/fog-cannon/fragment/fog-cannon';
import fogCannonQuery from '../../graphql/fog-cannon/query/fog-cannon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FogCannon = ({ fogCannonData }) => {
  const { loading, error, fogCannon } = fogCannonData;

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!fogCannon || !fogCannon.state) {
    return <p>No fogCannon</p>;
  }

  const { state } = fogCannon;

  return (
    <Container>
      <img
        src={state === 'on' ? '/fog_cannon_on.jpg' : '/fog_cannon_off.jpg'}
        alt={state === 'on' ? 'cannon ON' : 'cannon OFF'}
        height={200}
      />
    </Container>
  );
};

FogCannon.propTypes = {
  cannonId: PropTypes.string.isRequired, // eslint-disable-line
  fogCannonData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    fogCannon: propType(fogCannonFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

const withData = graphql(fogCannonQuery, {
  name: 'fogCannonData',
  options: ({ cannonId }) => ({
    variables: {
      cannonId,
    },
    pollInterval: 1000,
  }),
});

export default withData(FogCannon);
