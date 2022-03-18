import React, { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";
import {Button, Grid, Modal, Typography, CardActionArea } from '@mui/material'
import { makeStyles, useTheme } from "@mui/styles"
import { Theme } from '@mui/material/styles'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const useStyles = makeStyles((theme) => ({
  root: {
      padding: "50px 75px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  },
  title: {
      fontSize: 35,
      fontWeight: 600,
  },
  button:{
      height: 55,
      width: 165,
      backgroundColor: "#FFF",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#4237C7",
      color: "#4237C7",
      textTransform: "none",
      fontSize: 18,
      fontWeight: 600,
  },
  midCard:{
    height:120,
    width:120,
    margin:20,
  },
  title:{
    alignitems:"center",
    justifyContent: "center",
  }
}))

const PollingStation = (props) => {
//MUI

  const classes = useStyles();  

  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };

  return (
    <Grid className={classes.root} container direction="row" spacing={4}>
    <Grid item xs={12}>
    <Typography className={classes.title} variant="h2" align="center">
      Polling
    </Typography>
    </Grid>
     <Card sx={{ maxWidth: 345 }}  >
       <CardActionArea onClick={() => addVote(0)} >
         <CardMedia
          component="img"
          height="200"
          width="200"
          src={candidate1URL}
          alt="URL1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
           Vote
           
          </Typography>
          {showresults ? (
              <Typography gutterBottom variant="h5" component="div" align="center">{candidate1Votes}</Typography>
            ) : null}
        </CardContent>
      </CardActionArea>
    </Card>

    <Card className={classes.midCard} sx={{ maxWidth: 200 }}>
        <CardContent align="center">
          <Typography variant="body2" color="text.secondary.dark" align="center">
            {prompt}
          </Typography>
        </CardContent>
    </Card>

    <Card sx={{ maxWidth: 345 }} onClick={() => addVote(1)}>
       <CardActionArea>
         <CardMedia
          component="img"
          height="200"
          width="200"
          src={candidate2URL}
          alt="URL2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
           Vote
          </Typography>
          {showresults ? (
              <Typography gutterBottom variant="h5" component="div" align="center">{candidate2Votes}</Typography>
            ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
</Grid>
    // <Container>
    //   <Row>
    //     <Col className='jutify-content-center d-flex'>
    //       <Container>
    //         <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
    //           <div
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               padding: "3vw",
    //             }}
    //           >
    //             <img
    //               style={{
    //                 height: "35vh",
    //                 width: "20vw",
    //               }}
    //               src={candidate1URL}
    //             ></img>
    //           </div>
    //         </Row>
    //         {showresults ? (
    //           <Row
    //             className='justify-content-center d-flex'
    //             style={{ marginTop: "5vh" }}
    //           >
    //             <div
    //               style={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 fontSize: "8vw",
    //                 padding: "10px",
    //                 backgroundColor: "#c4c4c4",
    //               }}
    //             >
    //               {candidate1Votes}
    //             </div>
    //           </Row>
    //         ) : null}
    //         <Row
    //           style={{ marginTop: "5vh" }}
    //           className='justify-content-center d-flex'
    //         >
    //           <Button disabled={buttonStatus} onClick={() => addVote(0)}>
    //             Vote
    //           </Button>
    //         </Row>
    //       </Container>
    //     </Col>
    //     <Col className='justify-content-center d-flex align-items-center'>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           backgroundColor: "#c4c4c4",
    //           height: "20vh",
    //           alignItems: "center",
    //           padding: "2vw",
    //           textAlign: "center",
    //         }}
    //       >
    //         {prompt}
    //       </div>
    //     </Col>
    //     <Col className='jutify-content-center d-flex'>
    //       <Container>
    //         <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
    //           <div
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               padding: "3vw",
    //             }}
    //           >
    //             <img
    //               style={{
    //                 height: "35vh",
    //                 width: "20vw",
    //               }}
    //               src={candidate2URL}
    //             ></img>
    //           </div>
    //         </Row>
    //         {showresults ? (
    //           <Row
    //             className='justify-content-center d-flex'
    //             style={{ marginTop: "5vh" }}
    //           >
    //             <div
    //               style={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 fontSize: "8vw",
    //                 padding: "10px",
    //                 backgroundColor: "#c4c4c4",
    //               }}
    //             >
    //               {candidate2Votes}
    //             </div>
    //           </Row>
    //         ) : null}
    //         <Row
    //           style={{ marginTop: "5vh" }}
    //           className='justify-content-center d-flex'
    //         >
    //           <Button disabled={buttonStatus} onClick={() => addVote(1)}>
    //             Vote
    //           </Button>
    //         </Row>
    //       </Container>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default PollingStation;
