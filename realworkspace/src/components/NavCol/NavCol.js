import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './NavCol.css';
import CheckBoxes from './CheckBoxes/CheckBoxes';

export default class NavCol extends React.Component {
  render() {
    return (
      <div id="Col">
        <p>Links to added</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav>
        <hr />
        <CheckBoxes/>
      </div>
    );
  }
}