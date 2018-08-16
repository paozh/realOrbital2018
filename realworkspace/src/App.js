import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import NavBar from './components/NavBar/NavBar';
// import NavCol from './components/NavCol/NavCol';
// import CheckBoxes from './components/NavCol/CheckBoxes/CheckBoxes';
import ModalOnStart from './components/Modals/ModalOnStart';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldReset: false,
      busStopHidden: false,
      btoHidden: false,
      schoolHidden: false,
      hawkerHidden: false,
      shoppingHidden: false
    };
  }

  resetHandler = () => {
    this.setState( {
      shouldReset: true
    })
  }

  resetClosure = () => {
    this.setState( {
      shouldReset: false
    })
  }

  toggleHawkerHidden = () => {
    console.log("in appjs, toggling hawker hidden");
    this.setState({
      hawkerHidden: !this.state.hawkerHidden 
    });
    console.log("done");
  }
  
  // Watch out for naming convention, can't pinpoint error.
  toggleBusStopHidden = () => {
    this.setState({
      busStopHidden: !this.state.busStopHidden 
    });
  }

  toggleSchoolHidden = () => {
    this.setState({
      schoolHidden: !this.state.schoolHidden 
    });
	}

  render() {
    return (
      <div className="App">
        <div className="content-fixed">
          <NavBar onClick={this.resetHandler} 
                  toggleHawkerHidden={this.toggleHawkerHidden} 
                  toggleBusHidden={this.toggleBusStopHidden} 
                  toggleSchoolHidden={this.toggleSchoolHidden}
                  />
        </div>
        
        <div className="content-r"> 
            <Map shouldReset={this.state.shouldReset} 
                 resetClosure={() => this.resetClosure}
                 hawkerHidden={this.state.hawkerHidden}
                 busStopHidden={this.state.busStopHidden}
                 schoolHidden={this.state.schoolHidden}
                 />
            
        </div>
 
        <ModalOnStart/>
      </div>
    );
  }
}
