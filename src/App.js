import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
// import Bubbly from './Component/Bubbly';
import D3Components from './viz/charts/D3Components'
import Charts from './viz/linked-charts/Charts'


class App extends Component {
  
state={ width: window.width, height:  window.height }
 // state = { width: 0, height: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions=()=> this.setState({ width: window.innerWidth, height: window.innerHeight });

  render() {
    return (
      <div className="App">
          <D3Components></D3Components>
          <Charts></Charts>
        {/* <Bubbly className="bubble-force-chart"> </Bubbly> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
    );
  }
}

export default App;