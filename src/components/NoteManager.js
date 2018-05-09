import { generate } from 'pegjs';
import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';

import gramatica from '../grammar/kindleNotes.pegjs';
import Note from './Note';

export default class NoteManager extends Component {

    constructor(props) {
        super(props);
        let parser;
        this.parser=undefined;
        this.state = {
            isLoading: true,
            notas:{}
        };
    }

    cambiarSeparador(text){
        return text.replace(/==========/g,'ʓ')
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        try {
            fetch(gramatica)
            .then(response => response.text())
            .then(text => {
                this.parser = generate(this.cambiarSeparador(text)).parse;
                this.setState({ isLoading: false, notas:this.parser(this.cambiarSeparador(this.props.file)) });
            });
            
        } catch (error) {
            console.error("Se pico al generar el parser");
            // this.parser = require('../grammar/kindleNotes-parser.js').parse;
        }
    }

    getKeyOfNote(note){
        return JSON.stringify(note);
    }

    
    render() {
        const { notas, isLoading } = this.state;
        if (isLoading) {
          return <p>Loading ...</p>;
        }
        return (
            <CardColumns style={{padding:"40px"}} >
                { notas.map(nota => <Note key={this.getKeyOfNote(nota)} {...nota} />) }
            </CardColumns>
        )
    }
}

