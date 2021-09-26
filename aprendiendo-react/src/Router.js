import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Slider from './components/Slider';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Pruebas from "./components/Pruebas";
import MiComponente from "./components/MiComponente";
import Peliculas from "./components/Peliculas";
import Error from "./components/Error";
class Router extends Component{
    render(){
        var buttonString = "Ir al BLOG";
        return(
            <BrowserRouter>
                <Header />
                <Slider title="Bienvenidos al BLOG de NSLP" btn={buttonString} />
                <div className="center">

                {/*Configurar ruta*/}
                <Switch>
                    <Route exact path='/' component={Peliculas} />
                    <Route exact path='/home' component={Peliculas} />
                    <Route exact path='/ruta-prueba' component={Pruebas}/>
                    <Route exact path='/segunda-ruta' component={MiComponente}/>

                    <Route exact path='/pag-1' render={()=>(
                        <div>
                            <h1>Prueba</h1>
                            <MiComponente saludo="Aca Esta La Prop" />
                        </div>
                    )}/>
                    <Route exact path='/prueba/:nombre/:apellido?' render={(props)=>{
                        var nombre=props.match.params.nombre;
                        var apellido=props.match.params.apellido;
                        return(
                             <div id='content'>
                                <h1 className="subheader">Pagina Prueba</h1>
                                <h2>{nombre}</h2>
                                <h2>{apellido}</h2>
                            </div>
                        )
                    }}/>
                    <Route component={Error}/>
                </Switch>
                <Sidebar />
                    <div className="clearfix"></div>
                    </div>
                    <Footer />
            </BrowserRouter>
        );
    }
}   

export default Router;