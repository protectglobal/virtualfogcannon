import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FOG_CANNON_INPUTS = {
  ARM: 'Arms/disarms the fog cannon. Controlled by PWA and/or alarm system',
  Primary: 'Break-in sensor / alarm system',
  Secondary: 'Verifying sensor (room sensor / door switch)',
  Disable: 'Disables the fog cannon. Controlled by PWA and/or alarm system',
  Fire: 'Fire sensor. Disables the fog cannon in case of fire',
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
class FogCannon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(FOG_CANNON_INPUTS).forEach((key) => {
      this.state[`checked${key}`] = false;
    });
  }

  handleChange = ({ target }) => {
    const { onChange } = this.props;
    const { name, checked } = target;
    this.setState({ [`checked${name}`]: checked });
    // Pass event up to parent component
    // TODO probably pass prevState and nextState
    onChange({ inputName: name, value: checked });
  }

  render() {
    return (
      <Container className="p1">
        <FormGroup>
          {Object.keys(FOG_CANNON_INPUTS).map(key => (
            <FormControlLabel
              key={key}
              control={(
                <Switch
                  name={key}
                  checked={this.state[`checked${key}`]} // eslint-disable-line
                  onChange={this.handleChange}
                  value={key}
                />
              )}
              label={`[${key}] - ${FOG_CANNON_INPUTS[key]}`}
            />
          ))}
        </FormGroup>
      </Container>
    );
  }
}

FogCannon.propTypes = {
  onChange: PropTypes.func,
};

FogCannon.defaultProps = {
  onChange: () => {},
};

export default FogCannon;
