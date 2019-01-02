import React from 'react';
import { Alert } from 'reactstrap';
import './Alert.css';

export default class AlertExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
            <b> August 2018 BTO Launch: Punggol, Yishun East, Yishun West </b>
            </Alert>
    );
  }
}
