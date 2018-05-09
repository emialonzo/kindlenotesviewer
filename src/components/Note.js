import React, { Component } from 'react'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardFooter, CardHeader } from 'reactstrap';



export default class Note extends Component {
    render(){
        const {obra, pos, pag,contenido,tipo} = this.props;
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{obra.titulo.replace(/,/g,'')}</CardTitle>
                    <CardSubtitle>{obra.autor.replace(/,/g,'')}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    <CardTitle>{tipo}</CardTitle>
                    { tipo==="SUBRAYADO" &&  (
                    <CardText>
                    {/* <blockquote className="blockquote"><p> */}
                    {contenido}
                    {/* </p></blockquote> */}
                    </CardText>
                    )}
                </CardBody>
                <CardFooter>Pos:{pos}|Pag:{pag}</CardFooter>
            </Card>
        )
    }
}

// const Example = (props) => {
//   const {obra, pos, pag,contenido,tipo} = this.props;
//   return (
//       <Card>
//         <CardBody>
//           <CardTitle>{obra.titulo}</CardTitle>
//           <CardSubtitle>{obra.autor}</CardSubtitle>
//         </CardBody>
//         <CardBody>
//             <CardTitle>{tipo}</CardTitle>
//             { tipo=="SUBRAYADO" &&  <CardText>{contenido}</CardText>}
//         </CardBody>
//         <CardFooter>Pos:{pos}|Pag:{pag}</CardFooter>
//       </Card>
//   );
// };

// export default Note;
