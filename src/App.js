import './App.css';

import React, { Component } from 'react';

import FileManager from './components/FileManager';
import Header from './components/Header';
import NoteManager from './components/NoteManager';




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
        
        {this.state.file ? (<NoteManager file={this.state.file} />) : (<FileManager handleFile={this.handleFile} />)}
      </div>
    );
  }
}

export default App;
