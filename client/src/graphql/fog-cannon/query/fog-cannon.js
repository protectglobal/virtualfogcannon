import gql from 'graphql-tag';
import fogCannonFragment from '../fragment/fog-cannon';

const fogCannonQuery = gql`
  query fogCannon($cannonId: String!) {
    fogCannon(cannonId: $cannonId) {
      ...fogCannonFragment
    }
  }
  ${fogCannonFragment}
`;

export default fogCannonQuery;
