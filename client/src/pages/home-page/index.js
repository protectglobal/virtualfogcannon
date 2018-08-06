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
import EventsList from '../../components/events-list';
import ClearEventsBtn from '../../components/clear-events-btn';

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

  handleEventPost = async (event) => {
    const { postEvent } = this.props;

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

  handleFogCannonInputChange = ({ cannonId = '1', inputName, value }) => {
    const event = {
      cannonId,
      eventType: 'cannonInput',
      eventValue: `${inputName} - ${value.toString()}`,
    };
    this.handleEventPost(event);
  }

  handleFaultCodeClick = ({ cannonId = '1', faultCode }) => {
    const event = {
      cannonId,
      eventType: 'faultCode',
      eventValue: faultCode,
    };
    this.handleEventPost(event);
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
        <Title>VFC (Virtual Fog Cannon)</Title>
        <div className="flex">
          <Half>
            <FogCannon
              onChange={this.handleFogCannonInputChange}
            />
            <div className="mb2" />
            <h3>Outcomming HTTP requests</h3>
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
            <div className="mb2" />
            <h3>Incomming HTTP requests - <ClearEventsBtn /></h3>
            <EventsList />
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
