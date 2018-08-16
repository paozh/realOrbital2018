import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
 } from 'reactstrap';
import CheckBoxes from '../NavCol/CheckBoxes/CheckBoxes';
import ModalGraph from '../Modals/ModalGraph';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isStart: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div id="Bar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">BTO Planner</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <CheckBoxes toggleBusHidden={this.props.toggleBusHidden}
                            toggleSchoolHidden={this.props.toggleSchoolHidden}
                            toggleHawkerHidden={this.props.toggleHawkerHidden}
                  />
              </NavItem>

              <NavItem> 
                <ModalGraph buttonLabel="Graphs"/>
                </NavItem>

              <NavItem> 
                <Button color="primary" onClick={this.props.onClick}> Reset </Button>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}