import React from 'react'
import { Card, Grid, CardHeader, CardContent, CardMedia, Button, Typography, Box } from '@mui/material'
import '../styles/LandingPage.css'
import { Link } from 'react-router-dom'


const Services = () => {
    return (
        <div name="Services">
            <Typography
                className="main-text"
                sx={{ fontWeight: 525 }}
                variant="h2"
            >
                Our Services    
            </Typography>
            <Grid 
                container 
                spacing={2} 
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12} md={5} container justify="center">
                    <Card className="card-size">
                            <CardMedia
                                component="img"
                                className="service-photo"
                                src="/images/tutors.png"
                                title="Tutors"
                                sx={{maxHeight: '308px'}}
                            />
                            <CardHeader
                                title={'Tutors'}
                                className="card-title"
                            />
                            <CardContent >
                                <Typography>
                                    TutorsVILLE has many tutors which specialize in certain subjects and can help you!
                                </Typography>
                            </CardContent>
                            <Box className="button-size">
                                <Link to="/Tutors" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained">
                                        See Tutors
                                    </Button>
                                </Link>
                            </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5} container justify="center">
                    <Card className="card-size">
                            <CardMedia
                                component="img"
                                className="service-photo"
                                src="/images/courses.jpg"
                                title="Tutors"
                                sx={{maxHeight: '308px'}}
                            />
                            <CardHeader
                                title={'Courses'}
                                className="card-title"
                            />  
                            <CardContent>
                                <Typography>
                                TutorsVILLE has course selection so you can get help tailored exactly to what you need!
                                </Typography>
                            </CardContent>
                            <Box className="button-size">
                                <Link to="/CoursePage" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained">
                                        See Courses
                                    </Button>
                                </Link>
                            </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Services
