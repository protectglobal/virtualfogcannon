import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import pick from 'lodash/pick';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import postEventMutation from '../../graphql/event/mutation/post-event';
import FogCannon from '../../components/fog-cannon';
import FaultCodes from '../../components/fault-codes';
import Console from '../../components/console';

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
// CONSTANTS:
//------------------------------------------------------------------------------
const INIT_STATE = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = Object.assign({}, INIT_STATE);

  handleFaultCodeClick = async ({ cannonId = '1', faultCode }) => {
    const { postEvent } = this.props;

    const event = {
      cannonId,
      eventType: 'faultCode',
      eventValue: faultCode,
    };

    // Display fault code on console
    this.setState(pick(event, ['cannonId', 'eventType', 'eventValue']));

    // Fire POST request to PWA and wait for response
    try {
      const res = await postEvent({
        variables: { event },
      });
      console.log('res', res);
      this.setState({ httpRes: res });
    } catch (exc) {
      console.log('exc', exc);
      this.setState({ httpRes: exc });
    }
  }

  handleClearConsoleClick = () => {
    this.setState(Object.assign({}, INIT_STATE));
  }

  render() {
    const {
      cannonId,
      eventType,
      eventValue,
      httpRes,
    } = this.state;

    return (
      <div>
        <Title>Controller App</Title>
        <div className="flex">
          <Half>
            <FogCannon
              onChange={() => {}} // TODO
            />
            <div className="mb2" />
            <Console
              cannonId={cannonId}
              eventType={eventType}
              eventValue={eventValue}
              httpRes={httpRes}
            />
            <div className="mb2" />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClearConsoleClick}
            >
              Clear console
            </Button>
          </Half>
          <Spacer />
          <Half>
            <FaultCodes
              onClick={this.handleFaultCodeClick}
            />
          </Half>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  postEvent: PropTypes.func.isRequired,
};

// Apollo integration
const withMutation = graphql(postEventMutation, { name: 'postEvent' });

export default withMutation(HomePage);
