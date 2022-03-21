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
import Poll from "./Components/Poll";

// images
import CssBaseline from "@material-ui/core/CssBaseline";
import BlockVoteLogo from "./assets/nearby-logos_black.png";
import back from "./assets/wallpaper.png"

import getConfig from "./config";
import { ThemeProvider } from '@mui/styles'
import theme from './global/theme.js';

const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace("http://localhost:1234/" + "PollingStation");
  };
  //CONTRACT PAGE CHANGE FUNC *ADD*
  const changeContractsFunction = async (contract) => {
    console.log(contract);
    let promptPair = await window.contract.getContractPair({ contract: contract });
    localStorage.setItem("contract", promptPair[0]);
    localStorage.setItem("prompts", promptPair[1]);
    window.location.replace(window.location.href + "Home");
  };

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path='/'>
          <Poll changeContract={changeContractsFunction}/>
        </Route>
        <Route exact path='/Home'>
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
