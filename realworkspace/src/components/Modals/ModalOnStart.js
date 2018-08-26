import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} zIndex={10000}>
          <ModalHeader toggle={this.toggle}> BTO Planner application </ModalHeader>
          <ModalBody>
            <h3> Welcome to the BTO Planner Web Application! </h3> 
             <h5> Click any of the feature buttons to filter out the features you are looking out for! </h5> 
            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Dismiss</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;