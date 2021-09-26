import { Component } from 'react';

class Pelicula extends Component{
    marcar = () =>{
        this.props.marcarFav(this.props.pelicula)
    }
    render(){
        const peliFav= this.props.pelicula;
        const{titulo, Image} = this.props.Pelicula;
        return(
            <article className="article-item" id="article-template">
                    <div className="image-wrap">
                        <img src={Image} alt={titulo} />
                    </div>
                    <h2>{titulo}</h2>
                    <span className="date">
                        Hace 5 minutos
                    </span>
                    <a href="Article.html">Leer más</a>
                    <button onClick={this.marcar}> Marcar como favorita </button>
                    <div className="clearfix"></div>
                </article>
        )
    }
}
export default Pelicula;