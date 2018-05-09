import React, { Component } from 'react'
import gramatica from '../grammar/kindleNotes.pegjs';
import { generate } from "pegjs";
import Note from './Note';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';

export default class NoteManager extends Component {

    constructor(props) {
        super(props);
        let parser;
        this.parser=undefined
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

    
    render() {
        const { notas, isLoading } = this.state;
        if (isLoading) {
          return <p>Loading ...</p>;
        }
        return (
            <CardColumns>
                { notas.map(nota => <Note {...nota} />) }
            </CardColumns>
        )
    }
}

// <pre>
            //     {JSON.stringify(notas)}
            // </pre>