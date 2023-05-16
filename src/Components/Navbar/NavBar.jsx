import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CartWidget} from '../CartWidget/CartWidget'
import { Categorias } from "./Categorias/Categorias";
import { BotonDarkMode } from './BotonDarkMode/BotonDarkMode';

export const Menu= () => {
  return (
                  <Navbar expand="lg" bg="primary" variant="dark"  className='justify-content-center' >
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                
                    <Categorias />     
<CartWidget cantCart={0}/>
<BotonDarkMode />
</div>
      </Navbar>

      
    
    
  )
}

