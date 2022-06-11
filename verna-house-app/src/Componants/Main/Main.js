

import classes from "../Login.module.css";

import Box from '@mui/material/Box';
import { Container } from "@mui/material";
// import image1 from ".../static/images/1.jpeg"
// import image2 from ".../static/images/2.jpeg"
// import image3 from ".../static/images/3.jpeg"
import Typography from '@mui/material/Typography';
import video from "../../static/vedio/vedio1.mp4"
// import Image from "@mui/material/Image";
import { styled, useTheme } from '@mui/material/styles';
import React, { Fragment, useEffect } from 'react';
import { Paper } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";
import images from "../ImageSlider/MainPageSliderImages";
import video1 from '../../static/vedio/vedio1.mp4';
import video4 from '../../static/vedio/vedio4.mp4';
import video3 from '../../static/vedio/vedio3.mp4';
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import ReactPlayer from 'react-player';
import Carousel from "react-material-ui-carousel";
import Footer from '../Footer/Footer';
import { Visibility } from "@mui/icons-material";
// import "react-carousel-animated/dist/style.css";

// const itemData = [
//     {
//         img: "https://images03.nicepage.com/a1389d7bc73adea1e1c1fb7e/ed393553372b5fedbb31d038/pexelsphoto1002638.jpeg",
//         title: 'Breakfast',
//     },
//     {
//         img: "https://images02.nicepage.com/c461c07a441a5d220e8feb1a/dc8fb1e500cf5d99b9134449/26afbfd6f4b0f7d2c0352d2c78f559db.jpeg",
//         title: 'Burger',
//     },
// ]

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open, drawerwidth }) => ({
//         flexGrow: 1,
//         padding: theme.spacing(3),
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: drawerwidth,
//         width: `calc(100% - ${drawerwidth}px)`,
//         ...(open && {
//             transition: theme.transitions.create(['width', 'margin'], {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//             marginLeft: 0,
//         }),
//     }),
// );

const items = [
    {
        video: `${video3}`,
        title: 'Bed',
    },
    {
        video: `${video4}`,
        title: 'Books',
    },
    {
        video: `${video1}`,
        title: 'Sink',
    }
];

const Main1 = (props) => {
    // useEffect(() => { }, [props?.reload, props?.logout])
    return (
        <Fragment >
            <Container className={classes.mainback} sx={{ marginTop: 0, padding: 0 }}>
                <Box sx={{ width: '100%', border: '1px solid black', marginTop: 3, paddingTop: 4, paddingRight: 4, paddingLeft: 4, marginRight: 4, paddingBottom: 1, background: 'linear-gradient(45deg,#434344 5%,#575758 20%)' }} >
                    <Carousel
                        indicatorIconButtonProps={{
                            style: {
                                padding: '5px',    // 1
                                color: 'black'       // 3
                            }
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                backgroundColor: 'white' // 2
                            }
                        }}
                        indicatorContainerProps={{
                            style: {
                                textAlign: 'center' // 4
                            }

                        }}
                        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                            style: {
                                backgroundColor: 'white',
                                color: 'black',
                                visibility: 'true',
                            }
                        }}

                    >
                        {
                            items.map((item, i) =>
                                <Card sx={{ borderRadius: 1, borderColor: "#121212", backgroundColor: "black", borderWidth: 0.1, elevation: 24 }} key={i} className={classes.carouslemain}>
                                    <CardMedia
                                        component='video'
                                        type="vedio/mp4"
                                        src={item.video}
                                        autoPlay
                                        loop
                                        playing='true'
                                        muted
                                        loading="lazy"
                                        width="100%"
                                        height='520vh'
                                    >
                                    </CardMedia>
                                </Card>
                            )
                        }
                    </Carousel>
                </Box>

                <Box className={classes.box} >
                    <Typography component='div' style={{ color: "black", fontSize: '18px', fontFamily: 'sans-serif' }} data-aos="fade-up">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </Box>

                {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing className={classes.media} /> */}
            </Container>
        </Fragment>
    )
};
export default Main1;
// <Box
//     sx={{ paddingLeft: 1, paddingTop: 1, marginTop:0 }} className={classes.mainback}>
{/* <Image
                src= "https://images03.nicepage.com/a1389d7bc73adea1e1c1fb7e/ed393553372b5fedbb31d038/pexelsphoto1002638.jpeg"
                height= "700px"
                width = "100%" 
                loading="lazy">
                       
            </Image> 
            <Image
                src= " https://images02.nicepage.com/c461c07a441a5d220e8feb1a/dc8fb1e500cf5d99b9134449/26afbfd6f4b0f7d2c0352d2c78f559db.jpeg"
                height="700px"
                width="100%"
                marginTop= "10px"
                loading="lazy">
            </Image>  
         className={classes.mainBack} 
            <ImageList  >
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}`}
                            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            height="700px"
                            width="100%"
                        />
                    </ImageListItem>
                ))} 
                 <Image
                    src="https://images03.nicepage.com/a1389d7bc73adea1e1c1fb7e/ed393553372b5fedbb31d038/pexelsphoto1002638.jpeg"
                    height="700px"
                    width="100%"
                    loading="lazy">

                </Image>
                <Image
                    src=" https://images02.nicepage.com/c461c07a441a5d220e8feb1a/dc8fb1e500cf5d99b9134449/26afbfd6f4b0f7d2c0352d2c78f559db.jpeg"
                    height="700px"
                    width="100%"
                    marginTop="10px"
                    loading="lazy">
                </Image> 
            </ImageList> */}


{/* <video loop autoPlay muted preload="auto">
                           <source src="https://www.youtube.com/watch?v=abcdef" type="video/mp4" />
                        </video> */}

