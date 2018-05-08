import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import './FileManager.css'

export class FileManager extends Component {
  constructor() {
    super()
    this.state = { disabled: true, files: [], contenido:'' }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  onDrop2(files) {
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            this.setState({
              contenido:fileAsBinaryString
            })
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsText(file);
    });
}
  render() {
    return (
      <div>
        <Dropzone className='droop' onDrop={this.onDrop2.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        {/* <ul>
            {
              this.state.files.map(f => <li>{f.name} - {f.size} bytes - {f.getAsText()}</li>)
            }
          </ul> */}
          <pre>{this.state.contenido}</pre>
      </div>
    )
  }
}

export default FileManager
