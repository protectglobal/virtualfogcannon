import gql from 'graphql-tag';

const fogCannonFragment = gql`
  fragment fogCannonFragment on FogCannon {
    _id
    cannonId
    state
  }
`;

export default fogCannonFragment;
