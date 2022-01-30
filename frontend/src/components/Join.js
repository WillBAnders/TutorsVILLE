import React from 'react'
import { Typography, Grid, Button } from '@mui/material'
import '../styles/LandingPage.css'
import { Link } from 'react-router-dom'


export default function Join() {
    return (
        <div id="join" className="home-div">
            <Typography
                className="main-text"
                sx={{ fontWeight: 525 }}
                variant="h2"
            >
                Get Started    
            </Typography>
            <Grid 
            container 
            spacing={1} 
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={7} container justify="center" alignItems="left">
                    <img src="/images/join.png"  height="100%" width="100%" className="main-img" alt="join"/>
                </Grid>
                <Grid item xs={12} md={5} container justify="center" alignItems="center">
                    <Typography
                        className="main-text"
                        variant="h2"
                    >
                        Join TutsVILLE today! <br/>
                        <Link to="/SignUp" style={{ textDecoration: 'none' }}>
                            <Button variant="contained">
                                Sign Up
                            </Button>
                        </Link>

                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}