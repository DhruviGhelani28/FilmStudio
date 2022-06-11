// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));

import { styled } from '@mui/material/styles';
import React from 'react';
const DrawerHeader1 = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: 'linear-gradient(45deg, #575758 25%, #2F3031  80%)',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DrawerHeader = props => {
    return (
        <React.Fragment>
            <DrawerHeader1 >{props.children}</DrawerHeader1>
        </React.Fragment>
    );

};
export default DrawerHeader;