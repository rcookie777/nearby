import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "../utils";
import "../global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import Logo from "../assets/nearby-logos_black.png"
const NavBar = (props) =>{


  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
    <MDBContainer fluid className="text-center text-md-left">
      <MDBRow>
        <MDBCol md="6">
          <h5 className="title">Footer Content</h5>
          <p>
            Here you can use rows and columns here to organize your footer
            content.
          </p>
        </MDBCol>
        <MDBCol md="6">
          <h5 className="title">Links</h5>
          <ul>
            <li className="list-unstyled">
              <a href="#!">Link 1</a>
            </li>
            <li className="list-unstyled">
              <a href="#!">Link 2</a>
            </li>
            <li className="list-unstyled">
              <a href="#!">Link 3</a>
            </li>
            <li className="list-unstyled">
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
      </MDBContainer>
    </div>
  </MDBFooter>
      

    // <Router>
    //   <Navbar collapseOnSelect expand='lg' bg='light' variant='light' sticky="top">
    //     <Container>
    //       <Navbar.Brand href='/'>
    //         <img src={Logo} width="100" height="100" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    //       <Navbar.Collapse id='responsive-navbar-nav'>
    //         <Nav className='mx-auto'></Nav>
    //         <Nav>
    //           <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
    //           <Nav.Link onClick={window.accountId === "" ? login : logout}>
    //             {window.accountId === "" ? "Connect" : window.accountId}
    //           </Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </Router>
  );
}



export default NavBar;