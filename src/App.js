import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

// images
import BlockVoteLogo from "./assets/nearby-logos_black.png";

import getConfig from "./config";
import { ThemeProvider } from '@mui/styles'
import theme from './global/theme';
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path='/'>
          <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path='/PollingStation'>
          <PollingStation />
        </Route>
        <Route exact path='/NewPoll'>
          <NewPoll />
        </Route>
      </Switch>
      {/* <Footer/> */}
    </Router>
    </ThemeProvider>
  );
}
