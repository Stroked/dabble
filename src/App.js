import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import colorMesh from './vx/mosaic'

class App extends Component {
  


  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  render() {
    return (
      <div className="App">
        <colorMesh className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DABBLE.BY.AJAY</h1>
        </colorMesh>
        <p className="App-intro">
        </p>
        <colorMesh></colorMesh>
      </div>
    );
  }
}