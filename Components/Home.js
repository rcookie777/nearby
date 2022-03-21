import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
// import { Table, Container, Button } from "react-bootstrap";
import { button, Grid, Modal, Typography } from '@mui/material'
import { makeStyles, useTheme } from "@mui/styles"
import { Theme } from '@mui/material/styles'
import PollCard from "../Cards/PollCard";
import CssBaseline from "@material-ui/core/CssBaseline";
import image from "../assets/wallpaper.png"

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
}))

const Home = (props) => {

  const [promptList, changePromptList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
    <Grid className={classes.root} container direction="row" spacing={4}>
        <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" align="center">
            Voting Polls
        </Typography>
        </Grid>
        {promptList.map((el, index) => {
            return (
              <PollCard key={index} index={index} el={el} changeCandidate={props.changeCandidates} />
            //   <Grid className={classes.root} item sm={6} xs={12}>
            //       <Grid className={classes.card} container direction="column">
            //           {/* <div className={classes.imgContainer}>
            //               {tokenImage != "" ? <Image className={classes.img} src={tokenImage} height={250} width={350} objectPosition="center center" objectFit="cover" alt={props.tokenId} /> : <div />}
            //           </div> */}
            //           <Typography className={classes.descriptionTitle} variant="subtitle1">
            //               Poll {index}
            //           </Typography>
            //           <Typography className={classes.descriptionText} variant="body1">{el}</Typography>
            //           <Button onClick={() => props.changeCandidates(el)}>
            //          Go to Poll
            //         </Button>
            //       </Grid>
            // </Grid>
            );
          })}
    </Grid>

  );
};

export default Home;
