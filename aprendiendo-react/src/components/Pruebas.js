import React, {Component} from "react";
import MiComponente from './MiComponente';
class Pruebas extends Component{
  contador = 0;

 //forma larga
 /* constructor(props){
    super(props);
    this.state={
      contador:0
    };


  }*/
  
  state={
    contador: 0,
  };

  
  HolaMundo(nombre){
        var precentacion=<h2>Hola soy {nombre}</h2>
        return precentacion;
    }
    sumar(){
      this.setState({
        contador: this.state.contador + 1
      })
    }
    restar(){
      this.setState({
        contador: this.state.contador - 1
      })
    }

    render(){
        var nombre="Elian"
        return(
            <section id="content">
              <h2 class="subheader"> Ultimos articulos</h2>
              <p>hola bienvenido a programacion 4!!</p>
              <h2 class="subheader">Funciones</h2>
          {this.HolaMundo(nombre)}
              <h2 class="subheader">Componentes</h2>
      <section className ="componentes" >
        <MiComponente />
      </section>
      <h2 class="subheader">Estado</h2>
      <p>Contador:{this.state.contador}</p>
      <p>
        <input type="button" value="sumar" onClick={this.sumar}></input>
        <input type="button" value="restar" onClick={this.restar}></input>
      </p>
      </section>
        );
    }
}
export default Pruebas;