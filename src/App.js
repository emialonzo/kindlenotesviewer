import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileManager from './components/FileManager';

import Header from './components/Header'




class App extends Component {

  
  render() {
    return (
      <div className="App">
        <Header></Header>
        <FileManager />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
