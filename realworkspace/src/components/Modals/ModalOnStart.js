import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import List from './List/List';

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
          <ModalHeader toggle={this.toggle}> Welcome to  BTOViewer! </ModalHeader>
          <ModalBody>
            <List/>
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