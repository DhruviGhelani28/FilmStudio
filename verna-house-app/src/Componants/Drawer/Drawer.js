// import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import DrawerHeader from './DrawerHeader';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Divider from '@mui/material/Divider';
import List from '../List/List';
import { makeStyles } from "@material-ui/core/styles";


const openedMixin = (theme, drawerwidth) => ({
    width: drawerwidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #575758 25%, #2F3031  80%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#fff',

    },
    root1: {
        color: '#fff',
        '&:hover': {
            color: '#EC255A',
        }
    }
});


const Drawer1 = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerwidth }) => ({
        width: drawerwidth,

        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme, drawerwidth),
            '& .MuiDrawer-paper': openedMixin(theme, drawerwidth),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Drawer = props => {
    // const [reload, setReload] = useState(false)
    useEffect(() => {

    }, [props?.reload])

    const classes = useStyles();
    return (
        <React.Fragment>
            <Drawer1 variant="permanent" open={props.open} drawerwidth={props.drawerwidth} className={classes.root}>
                <DrawerHeader>
                    <IconButton onClick={props.onClose} className={classes.root}>
                        {props.theme.direction === 'rtl' ? <ChevronRightIcon className={classes.root1} /> : <ChevronLeftIcon className={classes.root1} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List open={props.open} className={classes.root}>
                    {props.children}
                </List>
            </Drawer1>
        </React.Fragment>
    );

};
export default Drawer;

/*

 {['Departments', 'Suppliers', 'Customers', 'Workers'].map((text, index) => (
                        <ListItemButton
                            key={text}
                            sx={{
                                minHeight: 48,
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: props.open ? 1 : 0 }} />
                        </ListItemButton>
                    ))}


            <Divider />
                <List>
                    {['Agencies', 'Items', 'Photos/Posters', 'Models', 'Settings'].map((text, index) => (
                        <ListItemButton
                            key='Agencies'
                            sx={{
                                minHeight: 48,
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                color='inherit'
                                sx={{
                                    minWidth: 0,
                                    mr: props.open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: props.open ? 1 : 0 }} textcolor="error" />
                        </ListItemButton>
                    ))}
                </List>
*/