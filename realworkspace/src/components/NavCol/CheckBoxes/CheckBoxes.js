import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './CheckBoxes.css';

class CheckBoxes extends Component {
  constructor (props) {
    super(props);
    
    this.state = { 
        cSelected: [],
    };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });

    switch(selected) {
      case 1:   
          this.props.toggleHawkerHidden();
          break;
      case 2:
          this.props.toggleBusHidden();
          break;
      case 3:
          this.props.toggleSchoolHidden();
          break;
      default: 
          break;
    }
  }

  render() {
    return (
      <span className="checkboxes">
        <ButtonGroup size="medium">
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>Hawker Center</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Bus Stops</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}>Schools</Button>
        </ButtonGroup>
      </span>
    );
  }
}

export default CheckBoxes;