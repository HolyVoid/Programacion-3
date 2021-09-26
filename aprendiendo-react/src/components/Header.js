import React , {Component} from 'react';
import logo from "./images/react-logo.png"
import { NavLink } from 'react-router-dom';
class Header extends Component{
    render(){
        return(
        <header id="header">
            <div className="center">
            <div id="logo">
                <img src={logo}
                 className="app-logo" 
                 alt="logotipo"
                 width="70"
                 height="60"
                  />
                  <span id="brand">
                      <strong>BLOG</strong>NSLP
                  </span>
                 

            </div>
            <nav id="menu">
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/MiComponente" activeClassName="active">Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/segunda-ruta" activeClassName="active">Formulario</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pag-1" activeClassName="active">Pagina 1</NavLink>
                    </li>
                    
                </ul>

            </nav>
            <div className="clearfix"> </div>
            </div>
            
        </header>
        )
    }
} 
export default Header;