import { generate } from 'pegjs';
import React, { Component } from 'react';
import { CardColumns,FormGroup, Label, Input } from 'reactstrap';

import gramatica from '../grammar/kindleNotes.pegjs';
import Note from './Note';

export default class NoteManager extends Component {

    constructor(props) {
        super(props);
        let parser;
        this.parser=undefined;
        this.state = {
            isLoading: true,
            notas:{},
            authors:[],
            obras:{},
            selectedAuthor:"",
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
                let notas = this.parser(this.cambiarSeparador(this.props.file)); 
                let obras = notas.reduce(
                    (obras,nota) => {
                        obras[nota.obra.autor.replace(/,/g,'')] = nota.obra.titulo.replace(/,/g,'')
                        return obras;
                    },{})
                this.setState({ 
                    isLoading: false,
                    notas,
                    authors:Object.keys(obras),
                });
            });
            
        } catch (error) {
            console.error("Se pico al generar el parser");
        }
    }

    getKeyOfNote(note){
        return JSON.stringify(note);
    }

    handleAuthorChange(e){
        this.setState({
            selectedAuthor:e.target.value
        })
    }

    cleanAuthor(){
        this.setState({
            selectedAuthor:""
        })
    }

    
    render() {
        const { notas, isLoading, authors,selectedAuthor } = this.state;
        if (isLoading) {
          return <p>Loading ...</p>;
        }
        return (
            <div>
                <FormGroup>
                    <Label for="exampleSelect">Autores</Label>
                    <Input type="select" name="autores" id="exampleSelect" onChange={(e)=>this.handleAuthorChange(e)}>
                        { authors.map(author=><option>{author}</option>)}
                    </Input>
                </FormGroup>
                {selectedAuthor && <button onClick={(e)=>this.cleanAuthor()}>{selectedAuthor}</button>}
                <CardColumns style={{padding:"40px"}} >
                    { notas
                        .filter(nota=> selectedAuthor? nota.obra.autor.replace(/,/g,'') === selectedAuthor:true)
                        .map(nota => <Note key={this.getKeyOfNote(nota)} {...nota} />) }
                </CardColumns>
            </div>
        )
    }
}

