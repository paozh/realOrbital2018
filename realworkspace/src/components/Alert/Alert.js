import React from 'react';
import { Alert } from 'reactstrap';
import './Alert.css';

class AlertExample extends React.Component {
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
      <Alert className="alert" color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
        Insert information on how to operate the Web Application
      </Alert>
    );
  }
}

export default AlertExample;