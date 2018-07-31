import gql from 'graphql-tag';

// TODO: probably return full response from POST request
const postFaultCodeMutation = gql`
  mutation postFaultCode($faultCode: String!) {
    postFaultCode(faultCode: $faultCode) {
      status
    }
  }
`;

export default postFaultCodeMutation;
