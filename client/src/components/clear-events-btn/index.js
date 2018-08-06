import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Button from '@material-ui/core/Button';
import clearEventsMutation from '../../graphql/event/mutation/clear-events';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ClearEventsBtn extends React.PureComponent {
  handleClick = async () => {
    const { clearEvents } = this.props;

    // Clear events list
    try {
      await clearEvents({});
    } catch (exc) {
      console.log('exc', exc);
    }
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >
        Clear events
      </Button>
    );
  }
}

ClearEventsBtn.propTypes = {
  clearEvents: PropTypes.func.isRequired,
};

// Apollo integration
const withMutation = graphql(clearEventsMutation, { name: 'clearEvents' });

export default withMutation(ClearEventsBtn);
