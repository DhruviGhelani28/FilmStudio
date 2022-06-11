import React from "react";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import key from "../../static/images/key.png";
import classes from '../Login.module.css';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Container } from "reactstrap";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #2F3031 30%, #575758 50%, #2F3031 30%,#575758 50%)',
        color: 'action.home',
        maxWidth: 500,
        maxHeight: 4000,
        paddingTop: 1,
        marginTop: 30,
        margin: "center",
    },
    root1: {
        color: '#fff',
        '&:hover': {
            color: '#EC255A',
        }
    },
    root3: {
        color: '#EC255A',
        '&:hover': {
            color: '#fff',
        }
    },
    allfield:
    {
        width: '40ch',
        marginTop: '10ch',
        background: 'linear-gradient(45deg, #575758 25%, #2F3031  80%)',
        color: '#fff',
    },

});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChangePassword = props => {

    const classes1 = useStyles();
    const navigate = useNavigate()

    const goBackHandler = () => {
        navigate("/Login")
    }


    return (
        <Container align='center'>
            <Card variant="outlined" className={classes1.root} sx={{ borderColor: '#fff', borderWidth: 1, borderRadius: 5 }}>

                <CardContent >
                    <CardActions>
                        <IconButton sx={{ marginLeft: 0 }} onClick={goBackHandler} color='primary'>
                            <ChevronLeftIcon className={classes1.root1} />
                        </IconButton>
                    </CardActions>
                    <Typography variant="h4" component='div' fontSize='26px'>Set Your Password</Typography>
                    {/* <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                            position='sticky'/>
                    </StyledBadge> */}
                    <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5, position: 'relative', marginTop: 0, marginRight: -0.3, fontSize: 60 }} />

                    <Box
                        component="form"
                        sx={{
                            marginTop: 3,
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <div>
                            <img width="23" src={key} className={classes.custom} alt="oldKey"></img>
                            <TextField
                                required
                                id="old-password"
                                label="Enter Old Password"
                                type="password"
                                placeholder="*******"
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <img width="23" src={key} className={classes.custom} alt="newKey"></img>
                            <TextField
                                required
                                id="new-password"
                                label="Enter New Password"
                                type="password"
                                placeholder="*******"
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <img width="23" src={key} className={classes.custom} alt="confirmKey"></img>
                            <TextField
                                required
                                id="confirm-password"
                                label="Enter Confirm Password"
                                type="password"
                                placeholder="*******"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                onClick={props.onClick}
                                sx={{
                                    marginTop: 0.5,
                                    marginRight: -37.5,

                                }}>
                                Submit</Button>
                        </div>
                    </Box>

                </CardContent>
            </Card>
        </Container>

    );
};
export default ChangePassword;