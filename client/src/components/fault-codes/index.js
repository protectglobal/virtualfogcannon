import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FAULT_CODES = {
  H: 'Heating. The system is in the heating phase and has not reached operating temperature.',
  r: 'The system has reached normal operating temperature and is ready to produce fog.',
  d: '\'Disable\' input activated and system blocked, as the alarm is not connected (heating has not been disconnected).',
  Hd: '\'Heat Disable\'.  \'Disable\' input activated and system blocked, as the alarm is not connected. Heating is also disconnected, as dipswitch 1 is in the ON position.',
  bt: '\'Blocking timer active\'. System blocked from fog triggering internally (timer-controlled). This occurs after the fog has been triggered or in connection with system start-up after loss of mains voltage.',
  A: '\'ARM\' input activated.',
  P: '\'Primary Trig\' input activated.',
  S: '\'Secondary Trig\' input activated.',
  bAt: 'A battery is (or has been) mounted.',
  C: 'The battery is currently being charged.',
  E1: 'Mains voltage failure.',
  E2: 'Low fluid level.',
  E3: 'Fire alarm input activated.',
  E4: 'Low battery voltage.',
  E5: 'Failed attempts to charge the battery for 24 hours.',
  E6: 'Battery failed load test.',
  E7: 'PCB temperature too high.',
  E8: 'PCB temperature too low.',
  E9: 'Thermo-sensor temperature too high (or connection lost).',
  E10: 'Thermo-sensor temperature too low (after preliminary heating).',
  E12: 'Pump timeout. The pump has been running for too long. Lack of fluid, etc.',
  E13: 'External 12 supply shut down due to overload.',
  E14: 'Error in \'load test circuit\'.',
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class FaultCodes extends React.Component {
  state = {
    activeFaultCode: '',
  }

  handleClick = ({ key }) => {
    const { onClick } = this.props;
    // Highlight fault code
    this.setState({ activeFaultCode: key });
    // Pass event up to parent component
    onClick({ faultCode: key });
  }

  render() {
    const { activeFaultCode } = this.state;

    return (
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fault code</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(FAULT_CODES).map(key => (
              <TableRow
                key={key}
                selected={key === activeFaultCode}
                onClick={() => { this.handleClick({ key }); }}
                className="pointer"
              >
                <TableCell>{key}</TableCell>
                <TableCell>{FAULT_CODES[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

FaultCodes.propTypes = {
  onClick: PropTypes.func,
};

FaultCodes.defaultProps = {
  onClick: () => {},
};

export default FaultCodes;
