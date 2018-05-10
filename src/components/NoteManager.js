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
            selectedBook:"",
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
                        let author = nota.obra.autor.replace(/,/g,'');
                        let title = nota.obra.titulo.replace(/,/g,'');
                        // obras[author]? obras[author]={title}:
                        if(!obras[author]){obras[author]= new Set();}
                        obras[author].add(title);
                        console.log(`Actual ${author}:${title} :: Total ${Array.from(obras[author])}`);
                        return obras;
                    },{})
                this.setState({ 
                    isLoading: false,
                    notas,
                    authors:Object.keys(obras),
                    obras,
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
    handleTitleChange(e){
        // alert(`Cambio el libro a ${e.target.value}`)
        this.setState({
            selectedBook:e.target.value
        })
    }

    cleanAuthor(){
        this.setState({
            selectedAuthor:"",
            selectedBook:"",
        })
    }

    
    render() {
        const { notas, isLoading, authors,selectedAuthor, obras, selectedBook } = this.state;
        if (isLoading) {
          return <p>Loading ...</p>;
        }
        return (
            <div>
                <FormGroup>
                    <Label for="exampleSelect">Autores</Label>
                    <Input type="select" name="autores" id="exampleSelect" onChange={(e)=>this.handleAuthorChange(e)}>
                        <option value="">Seleccionar...</option>
                        { authors.map(author=><option key={`key${author}`}>{author}</option>)}
                    </Input>
                </FormGroup>
                {selectedAuthor && (<FormGroup>
                    <Label for="exampleSelect">Autores</Label>
                    <Input type="select" name="libros" id="exampleSelect" onChange={(e)=>this.handleTitleChange(e)}>
                        <option value="">Seleccionar...</option>
                        { Array.from(obras[selectedAuthor]).map(title => <option>{title}</option>)}
                    </Input>
                </FormGroup>)}
                {selectedAuthor && <button onClick={(e)=>this.cleanAuthor()}>Limpiar</button>}
                <CardColumns style={{padding:"40px"}} >
                    { notas
                        .filter(nota=> selectedAuthor? nota.obra.autor.replace(/,/g,'') === selectedAuthor : true)
                        .filter(nota=> {
                            // console.log(`"${nota.obra.titulo.replace(/,/g,'')}" === "${selectedBook}" : ${nota.obra.titulo.replace(/,/g,'') === selectedBook}`)
                            return selectedBook? nota.obra.titulo.replace(/,/g,'').replace(/\s+$/, '') === selectedBook : true
                        })
                        .map(nota => <Note key={this.getKeyOfNote(nota)} {...nota} />) }
                </CardColumns>
            </div>
        )
    }
}

