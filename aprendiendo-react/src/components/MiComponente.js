import React, {Component} from 'react';

class MiComponente extends React.Component{

    render(){
        let receta = {
            nombre: 'Pizzas',
            ingredientes: ["Muzzarella", "Tomate", "Jamon", "Cebolla", "Arina"],
            calorias:500,
        };
        //o un div y un className para varias etiquetas
        return(
            <React.Fragment>
            <h1>{'Nombre: ' + receta.nombre}</h1>
            <h2>{'Calorias: ' + receta.calorias}</h2>

            {this.props.saludo &&
             <h3>{this.props.saludo}</h3>
            }

            <ol>
                {receta.ingredientes.map((ingrediente, i)=> {
                console.log(ingrediente);
                return <li key={i}>{ingrediente}</li>;
            })}
            </ol>
            <hr></hr>
            </React.Fragment>
        )
    }

}
export default MiComponente;