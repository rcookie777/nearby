import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "../utils";
import "../global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Logo from "../assets/nearby-logos_black.png"
const NavBar = (props) =>{


  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='light' variant='light' sticky="top">
        <Container>
          <Navbar.Brand href='/'>
            <img src={Logo} width="100" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Connect" : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}



export default NavBar;
