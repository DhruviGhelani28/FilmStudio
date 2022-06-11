
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import GlobalStyles from '@mui/material/GlobalStyles';
const MainMenu = (props) => {

    const isMainMenuOpen =Boolean(props.mainMenuEl)
    return (
        <React.Fragment>
            {/* <GlobalStyles styles={styles} /> */}
            <Menu
                anchorEl={props.mainMenuEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                id={props.mainMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                open={isMainMenuOpen}
                onClose={props.onClose}>
                {/* <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem> */}
            </Menu>
        </React.Fragment>
    );
};
export default MainMenu;