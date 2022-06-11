import React from "react";

// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tasks from '../Tasks/Tasks';

// function LinkTab(props) {
//     return (
//         <Tab
//             component="a"
//             onClick={(event) => {
//                 event.preventDefault();
//             }}
//             {...props}
//         />
//     );
// }

const Account = props => {

    const [value, setValue] = React.useState('1')
    const changeHandler = (event, newValue) => {
        setValue(newValue)
    }

    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleToggle = () => {
    //     setOpen(!open);
    // };
    //onClick={tasksHandler}
    return (
        <React.Fragment>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={changeHandler} aria-label="lab API tabs example">
                            <Tab label="Tasks" value="1" />
                            <Tab label="Item Two" value="2" />
                            <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" >
                        <Tasks> {props.children} </Tasks>

                    </TabPanel>
                    <TabPanel value="2">
                        {/* <Bills>{props.children}</Bills> */}
                    </TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    )

};
export default Account;
