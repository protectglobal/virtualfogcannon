import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/*
Cannon states:
Input 1 (ARM): Arms/disarms the fog cannon. Controlled by PWA and/or alarm system.
Input 2 (Primary): Break-in sensor / alarm system
Input 3 (Secondary): Verifying sensor (room sensor / door switch)
Input 4 (Disable): Disables the fog cannon. Controlled by PWA and/or alarm system.
Input 5 (Fire): Fire sensor. Disables the fog cannon in case of fire.

Fault codes:
H: Heating. The system is in the heating phase and has not reached operating temperature.
r: The system has reached normal operating temperature and is ready to produce fog.
d: ”Disable” input activated and system blocked, as the alarm is not connected (heating has not been disconnected).
Hd: ”Heat Disable”.  ”Disable” input activated and system blocked, as the alarm is not connected. Heating is also disconnected, as dipswitch 1 is in the ON position.
bt: “Blocking timer active”. System blocked from fog triggering internally (timer-controlled). This occurs after the fog has been triggered or in connection with system start-up after loss of mains voltage.
A: “ARM” input activated.
P: “Primary Trig” input activated.
S: “Secondary Trig” input activated.
bAt: A battery is (or has been) mounted.
C: The battery is currently being charged.
E1: Mains voltage failure.
E2: Low fluid level.
E3: Fire alarm input activated.
E4: Low battery voltage.
E5: Failed attempts to charge the battery for 24 hours.
E6: Battery failed load test.
E7: PCB temperature too high.
E8: PCB temperature too low.
E9: Thermo-sensor temperature too high (or connection lost).
E10: Thermo-sensor temperature too low (after preliminary heating).
E12: Pump timeout. The pump has been running for too long. Lack of fluid, etc.
E13: External 12 supply shut down due to overload.
E14: Error in “load test circuit”.
*/
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const CANNON_STATES = {
  checkedARM: 'ARM',
  checkedPrimary: 'Primary',
  checkedSecondary: 'Secondary',
  checkedDisable: 'Disable',
  checkedFire: 'Fire',
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  border: 1px solid black;
  background-color: #808080;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(CANNON_STATES).forEach((field) => {
      this.state[field] = true;
    });
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    this.setState({ [name]: checked });
  }

  render() {
    return (
      <Container className="p1">
        <FormGroup>
          {Object.keys(CANNON_STATES).map(key => (
            <FormControlLabel
              key={key}
              control={
                <Switch
                  name={key}
                  checked={this.state[key]} // eslint-disable-line
                  onChange={this.handleChange}
                  value={key}
                />
              }
              label={CANNON_STATES[key]}
            />
          ))}
        </FormGroup>
      </Container>
    );
  }
}

export default Controller;
