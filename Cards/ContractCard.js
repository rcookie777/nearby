import { CircularProgress, Grid, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import Paper from '@mui/material/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    card: {
        marginBottom:16,
    },
    imgContainer: {
        display: "flex",
        justifyContent: "center",
        minHeight: 250,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomStyle: "solid",
        borderBottomColor: "#00000050",
        borderBottomWidth: 2.0,
        overflow: "clip",
    },
    img: {
        borderRadius: 9,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bolder',
        lineHeight: 1.0,
        margin: "16px 16px 4px 16px",

    },
    descriptionText: {
        fontSize: 12,
        fontWeight: 200,
        lineHeight: 1.0,
        margin: "0px 16px 0px 16px",

    },
}))

const ContractCard = (props) => {
    const [contractList, changeContractList] = useState([]);
    const classes = useStyles()
    const [candidate1URL, changeCandidate1Url] = useState(CircularProgress);
    const [candidate2URL, changeCandidate2Url] = useState(CircularProgress);
    useEffect(() => {
        const getInfo = async () => {
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
        };
    
        getInfo();
        const getContracts = async () => {
            changeContractList(await window.contract.getAllContracts());
            console.log(await window.contract.getAllContracts());
          };
          getContracts();
        }, []);   

    return (
        <Grid className={classes.root} item sm={4} xs={6}>
            <Grid className={classes.card} container direction="column">
            <Card className={classes.root} raised="true">
            <CardActionArea onClick={() => props.changeContract(props.el)} >
            <CardContent>
             <Typography variant="body2" component="p" align="center">
             {props.el}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
                
                {/* <div className={classes.imgContainer}>
    {candidate1URL != '' ?  "Add Poll":<Image src={candidate1URL}/>}
    </div>
    <div className={classes.imgContainer}>
    {candidate2URL != '' ?  "Add Poll": <Image src={candidate2URL}/>}
    </div> */}
                {/* <Typography className={classes.descriptionTitle} variant="h2">
                    Poll {props.index}
                </Typography>
                <Typography className={classes.descriptionText} variant="body1">{props.el}</Typography>
                <Button className={classes.button} onClick={() => props.changeCandidate(props.el)}>
                    Go to Poll
                </Button> */}
            </Grid>
        </Grid>

    )
}

export default ContractCard