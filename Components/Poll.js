import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
// import { Table, Container, Button } from "react-bootstrap";
import { button, Grid, Modal, Typography } from '@mui/material'
import { makeStyles, useTheme } from "@mui/styles"
import { Theme } from '@mui/material/styles'
import ContractCard from "../Cards/ContractCard";
import CssBaseline from "@material-ui/core/CssBaseline";
import image from "../assets/wallpaper.png"
import { Placeholder } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
      padding: "50px 75px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundImage: `url(${image})`,
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

const Poll = (props) => {

  const [contractList, changeContractList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getContracts = async () => {
      changeContractList(await window.contract.getAllContracts());
      console.log(await window.contract.getAllContracts());
    };
    getContracts();
  }, []);

  return (
    <Grid className={classes.root} container direction="row" spacing={4}>
        <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" align="center">
            Contracts
        </Typography>
        </Grid>
        {contractList.map((el, index) => {
            return (


            <ContractCard key={index} index={index} el={el} changeContract={props.changeContract} />
            //   <PollCard key={index} index={index} el={el} changeCandidate={props.changeCandidates} />
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

export default Poll;
