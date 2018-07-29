import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import NavBar from './components/NavBar/NavBar';
import NavCol from './components/NavCol/NavCol';
import CheckBoxes from './components/NavCol/CheckBoxes/CheckBoxes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldReset: false,
      busHidden: false,
      btoHidden: false,
      schoolHidden: false,
      hawkerHidden: false,
      shoppingHidden: false
    };
  }

  resetHandler = () => {
    console.log("reset happening");
    this.setState( {
      shouldReset: true
    })
  }

  resetClosure = () => {
    console.log("looping back to original");
    this.setState( {
      shouldReset: false
    })
  }

  // Not needed, not working 
  // toggleHawkerHidden = () => {
  //   this.setState({
  //     hawkerHidden: !this.state.hawkerHidden 
  //   });
  //   console.log(this.state.hawkerHidden);
	// }

  render() {
    return (
      <div className="App">
        <div className="content-fixed">
          <NavBar onClick={this.resetHandler}/>
        </div>

        <div className="content-r"> 
            <Map shouldReset={this.state.shouldReset} 
                 resetClosure={() => this.resetClosure}
                 toggleHawkerHidden={this.state.hawkerHidden}
                 />
        </div>
      </div>
    );
  }
}
