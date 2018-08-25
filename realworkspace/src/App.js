import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/MapAgain';
import NavBar from './components/NavBar/NavBar';
import ModalOnStart from './components/Modals/ModalOnStart';

// Initial boundaries set for panning, [LEFT CORNER, RIGHT CORNER] (longitude, latitude) OR (y,x)
var bounds = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldReset: false,
      busStopHidden: false,
      btoHidden: false,
      schoolHidden: false,
      hawkerHidden: false,
      shoppingHidden: false,
      featureOnFocus: null,
      shouldMoveToYishunEast: false,
      shouldMoveToYishunWest: false,
      shouldMoveToPunggol: false
    };
  }

  // EAST
  moveToYishunEastHandler = () => {
    //console.log("will move to Yishun East");
    this.setState({
      shouldMoveToYishunEast: true,
      featureOnFocus: "Yishun East"
    });
  }

  moveToYishunEastClosure = () =>　{
    //console.log("closure for yishun east");
    this.setState({
      shouldMoveToYishunEast: false
    })
  }

  // WEST
  moveToYishunWestHandler = () => {
    //console.log("will move to Yishun West");
    this.setState({
      shouldMoveToYishunWest: true,
      featureOnFocus: "Yishun West"
    });
  }

  moveToYishunWestClosure = () =>　{
    //console.log("closure for yishun west");
    this.setState({
      shouldMoveToYishunWest: false
    })
  }

  moveToPunggolHandler = () => {
    //console.log("will move to Punggol");
    this.setState({
      shouldMoveToPunggol: true,
      featureOnFocus: "Punggol"
    });
  }

  moveToPunggolClosure = () =>　{
    //console.log("closure for Punggol");
    this.setState({
      shouldMoveToPunggol: false
    })
  }

  resetHandler = () => {
    //console.log("in resetHandler");
    this.setState( {
      shouldReset: true,
      featureOnFocus: null
    })
  }

  resetClosure = () => {
    //console.log("in resetClosure");
    this.setState( {
      shouldReset: false
    })
  }

  toggleHawkerHidden = () => {
    this.setState({
      hawkerHidden: !this.state.hawkerHidden 
    });
  }
  
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
  
  // featureName is a string
	// handleFeatureOnFocus = (featureName) => {

  //   switch(featureName) {
  //     case "Yishun East": {
  //       console.log("In switch: moveToYishunEast()");
  //       this.moveToYishunEastHandler();
  //       break;
  //     }

  //     case "Yishun West": {
  //       console.log("In switch: moveToYishunWest()");
  //       break;
  //     }

  //     case "Punggol": {
  //       console.log("In switch: moveToPunggol()");
  //       break;
  //     }

  //     default: {
  //       console.log("invalid featureName");
  //     }
  //   }

  //   console.log("featureOnFocus is: " + featureName);
  // }
  
  render() {
    return (
      <div className="App">
        <div className="content-fixed">
          <NavBar onClick={this.resetHandler} 
                  moveToYishunWest={this.moveToYishunWestHandler}
                  moveToYishunEast={this.moveToYishunEastHandler}
                  moveToPunggol={this.moveToPunggolHandler}
                  toggleHawkerHidden={this.toggleHawkerHidden} 
                  toggleBusHidden={this.toggleBusStopHidden} 
                  toggleSchoolHidden={this.toggleSchoolHidden}
                  />
        </div>
        
        <div className="content-r"> 
            <Map shouldMoveToPunggol={this.state.shouldMoveToPunggol}
                 moveToPunggolClosure={this.moveToPunggolClosure}
                 shouldMoveToYishunWest={this.state.shouldMoveToYishunWest}
                 moveToYishunWestClosure={this.moveToYishunWestClosure}
                 shouldMoveToYishunEast={this.state.shouldMoveToYishunEast}
                 moveToYishunEastClosure={this.moveToYishunEastClosure}
                 shouldReset={this.state.shouldReset} 
                 resetClosure={this.resetClosure}
                 hawkerHidden={this.state.hawkerHidden}
                 busStopHidden={this.state.busStopHidden}
                 schoolHidden={this.state.schoolHidden}
                 featureOnFocus={this.state.featureOnFocus}
                 />
        </div>
          <ModalOnStart/>
        </div>
    );
  }
}
