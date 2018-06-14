import React, { Component } from 'react';
import logo from './logo.png';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <colorMesh className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DABBLE.BY.AJAY</h1>
        </colorMesh>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
