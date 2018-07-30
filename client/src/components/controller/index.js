import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/*
Input 1 (ARM): Arms/disarms the fog cannon. Controlled by PWA and/or alarm system.
Input 2 (Primary): Break-in sensor / alarm system
Input 3 (Secondary): Verifying sensor (room sensor / door switch)
Input 4 (Disable): Disables the fog cannon. Controlled by PWA and/or alarm system.
Input 5 (Fire): Fire sensor. Disables the fog cannon in case of fire.
*/
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FIELDS = {
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
    Object.keys(FIELDS).forEach((field) => {
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
        <FormGroup column>
          {Object.keys(FIELDS).map(key => (
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
              label={FIELDS[key]}
            />
          ))}
        </FormGroup>
      </Container>
    );
  }
}

export default Controller;
