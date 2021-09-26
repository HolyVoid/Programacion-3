import React , {Component} from 'react';
import Pelicula from './Pelicula';

class Peliculas extends Component{
    state = {
        peliculas: [
            {titulo:'Joker', Image:'https://media.metrolatam.com/2019/04/02/jokerjptp01-c6dc49aabb4381912fafcd4195a5a427.jpg'},
            {titulo:'Batman Vs Superman', Image:'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABVixGzDct56-tsHGWLZwtml5CejHjH2jjmxSag8NKtgyx7MNfqzhcC5192uzJoo-dpVg0SvdMiLqD37Sx4-MPCRgK0od.jpg?r=2a9'},
            {titulo:'Terminator', mage:'https://media.revistagq.com/photos/5dbab1e1d19dec0008a41e77/master/pass/terminator%20portada.jpg'}
        ]
    }
    cabiarTitulo = () =>{
        var {peliculas} =this.state;
        peliculas[0].titulo='Joker Parte1';
        this.setState({
            Peliculas:peliculas
        })
    } 
    favorita = (Peliculas) =>{
        console.log("Favorita");
        console.log(Peliculas);
    }
    render(){
        return(
            <div id="content" className="Peliculas">
                <h2 className="subheader">Peliculas</h2>
                <p>
                    <button onClick={this.cabiarTitulo}>Cambiar Titulo</button>    
                </p>
                <p>
                    <strong>La pelicula favorita es: </strong>
                    <span>x</span>
                </p>
                {
                    <div id="articles" className="Peliculas">{
                        this.state.peliculas.map((peliculas,i)=>{
                            return(
                            <Pelicula key={i} Pelicula={peliculas} marcarFav={this.favorita} />
                           )
                       })
                    }</div>
                }
            </div>
        )
    }
}
export default Peliculas;