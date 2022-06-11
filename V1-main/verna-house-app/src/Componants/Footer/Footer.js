import { Container, Grid, Box, Link } from "@mui/material";
import React from "react";
import styled from "styled-components";
const FooterContainer = styled.div`
  text-align: center;
  position:fixed;
    border: '1px solid black';
    margin-top: 10px;
  bottom: 10px;
  vertical-align: bottom;
  width: 100% !important;
  height: 80px !important ;
//   background: #6cf;

`;

const Footer1 = styled('footer', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerwidth }) => ({
        // flexGrow: 1,
        // paddingLeft: 10,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerwidth,
            width: `calc(100% - ${drawerwidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            // marginLeft: 0,
        }),
    }),
);


const Footer = (props) => {
    return (
        <React.Fragment>

            {/* // <FooterContainer > */}
            <Footer1 position='fixed' style={{ bottom: 0, verticalAlign: 'bottom', paddingLeft: 0, marginBottom: '5px' }} open={props.open} drawerwidth={props.drawerwidth} theme={props.theme}>

                <Box sx={{ background: 'linear-gradient(45deg,#434344 5%,#575758 20%)', px: { xs: 1, sm: 6 }, py: { xs: 3, sm: 6 }, width: '100%', height: 'fit-content', color: 'white', padding: 0 }}>
                    <Container >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4} >
                                <Box borderBottom={1}>Help</Box>
                                <Box>
                                    <Link href="/" color="inherit">Contact</Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">Support</Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">Privacy</Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Account</Box>
                                <Box>
                                    <Link href="/" color="inherit">Login</Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">Register</Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Messages</Box>
                                <Box>
                                    <Link href="/" color="inherit">Backup</Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">History</Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">Role</Link>
                                </Box>
                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            </Footer1>
            {/* // </FooterContainer>  */}
        </React.Fragment>
    );
}
export default Footer;
// , px: { xs: 3, sm: 10 }, py: { xs: 5, sm: 10 },