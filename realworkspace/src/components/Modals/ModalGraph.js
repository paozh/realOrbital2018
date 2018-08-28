import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TimeSeries3 from '../TimeSeries/TimeSeries_3room';
import TimeSeries4 from '../TimeSeries/TimeSeries_4room';

class ModalGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
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
      <div id="modalgraph">
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} zIndex={10000} size={"lg"}>
          <ModalHeader toggle={this.toggle}> Prices of BTOs in different estates during 2008-2016  </ModalHeader>
          <ModalBody>
            <h5> 3-Room BTO Flats </h5>
            <TimeSeries3/>
            <h5> 4-Room BTO Flats </h5>
            <TimeSeries4/>
            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Dismiss</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalGraph;