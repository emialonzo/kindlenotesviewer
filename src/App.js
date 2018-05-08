import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileManager from './components/FileManager';

import Header from './components/Header'




class App extends Component {

  constructor() {
    super()
    this.state = { file: '' }
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(file) {
    console.log(`Recibí el archivo ${file}`);
    this.setState({
      file: file
    });
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <FileManager handleFile={this.handleFile} />
        {this.state.file ? (<pre>{this.state.file}</pre>) : (<div>No hay archivo</div>)}
      </div>
    );
  }
}

export default App;
