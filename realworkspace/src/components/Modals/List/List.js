import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <ListGroup>
        <ListGroupItem color="info"> 
            <li>Click any of the <Button color="info">Filters </Button> to toggle and filter out the features you are looking out for!</li>
         </ListGroupItem>
         <ListGroupItem color="info">
            <li> Click on <Button color="primary"> BTO Launches </Button> to view the its nearby amenities! </li>
            </ListGroupItem>
        <ListGroupItem color="info">
            <li> Click on <Button color="success"> Graphs </Button> to view the the BTO price trends in recent years!  </li>
            </ListGroupItem> 
         <ListGroupItem color="info">
            <li> Click on <Button color="danger"> Reset </Button> to zoom out! </li>
            </ListGroupItem>  
      </ListGroup>
    );
  }
}