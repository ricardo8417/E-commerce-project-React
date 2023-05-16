import React from 'react'
import {Link} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Ecommerce from '../assets/Ecommerce.svg'
import Container from 'react-bootstrap/Container';

export const Categorias= () => {
  return (

    <Container>
      
     <Link className='img-link' to={'/'}> 
          <img src={Ecommerce} alt="logo-ecommerce"/></Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/category/Computadoras'}>Computadoras</Nav.Link>
            <Nav.Link as={Link} to={'/category/Videovigilancia'} >Videovigilancia</Nav.Link>
            <Nav.Link as={Link} to={'/category/Hardware'} >Hardware</Nav.Link>
            <Nav.Link as={Link} to={'/category/Software'} >Software</Nav.Link>
          </Nav>
          </Container>
  )
}
