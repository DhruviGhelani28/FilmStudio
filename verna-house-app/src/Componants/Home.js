import React, { useState, useEffect } from "react";
import AppBarHeader from "./AppBar/AppBarHeader";
import Drawer from "./Drawer/Drawer";
// import DrawerHeader from "./Drawer/DrawerHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import classes1 from "./Login.module.css";
// import Button from '@mui/material/Button';
import { Route, Routes, Navigate } from "react-router-dom";
import Suppliers from "./Suppliers/Suppliers";
import Registration from "./Login/Registration";
import Main1 from "./Main/Main";
import Agencies from "./Agencies/Agencies";
import LoginRegistration from "./Login/LoginRegistration";
import About from "./AppBar/About";
import Departments from "./Pending/Departments/Departments";
import Customers from "./Customers/Customers";
import Workers from "./Workers/Workers";
import Garments from "./Garments/Garments";
import Gadgets from "./Gadgets/Gadgets";
import PhotosPosters from "./Photos_Posters/PhotosPosters";
import Models from "./Models/Models";
import Messages from "./Pending/Messages/Messages";
import Notifications from "./Pending/Notifications/Notifications";
// import Settings from "./Pending/Settings/Settings";
import ChangePassword from "./Login/ChangePassword";
import SupplierForm from "./Suppliers/SupplierForm";
import CustomerForm from "./Customers/CustomerForm";
import WorkerForm from "./Workers/WorkerForm";
import AgencyForm from "./Agencies/AgencyForm";
import TaskForm from "./Tasks/TaskForm";
import Account from "./Account/Account";
import PhotoPosterForm from "./Photos_Posters/PhotoPosterForm";
import ModelForm from "./Models/ModelForm";
import GarmentForm from "./Garments/GarmentForm";
import GadgetForm from "./Gadgets/GadgetForm";
import Tasks from "./Tasks/Tasks";
import Footer from "./Footer/Footer";
import { Directions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, drawerwidth }) => ({
    paddingLeft: "47px",
    // paddingRight: 5,
    marginTop: 8.1,
    marginLeft: 20,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      paddingLeft: "5px",
      marginLeft: drawerwidth,
      width: `calc(100% - ${drawerwidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // marginLeft: 0,
    }),
  })
);
// let role = '';
const Home = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const drawerWidth = 200;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const data = JSON.parse(localStorage.getItem("userInfo"));

  // console.log("data::", data['role'])
  const handleDrawerOpen = () => {
    if (data !== null) {
      setOpen(true);
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let [role, setRole] = useState(" ");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data !== null) {
      setIsLoggedIn(true);
      setRole(data["role"]);
      console.log(isLoggedIn, role);
    }
  }, [data]);
  useEffect(() => {
    setRole(" ");
  }, [logout]);
  // useEffect(() => { }, [reload])

  // console.log('role::', role !== 'Admin')
  return (
    <React.Fragment>
      <Box sx={{}}>
        <CssBaseline />

        <AppBarHeader
          drawerwidth={drawerWidth}
          open={open}
          onOpen={handleDrawerOpen}
          sx={{ display: "flex" }}
          theme={theme}
          setLogout={(val) => setLogout(val)}
        />
        {role === " " && (
          <Main
            sx={{
              paddingLeft: 0.1,
              marginTop: 8.1,
              marginRight: 0,
              paddingRight: 0.1,
              display: "flex",
              marginLeft: 0.1,
            }}
            className={classes1.homeback}
          >
            <Routes>
              <Route path="/" element={<Main1 />} exact></Route>
              <Route path="/About" element={<About />} exact />
              <Route
                path="/Login"
                element={
                  <LoginRegistration
                    theme={theme}
                    setReload={(val) => setReload(val)}
                  />
                }
                exact
              />
              <Route path="/Registration" element={<Registration />} exact />
              <Route path="/SupplierForm" element={<SupplierForm />} exact />
              <Route path="/CustomerForm" element={<CustomerForm />} exact />
              <Route path="/AgencyForm" element={<AgencyForm />} exact />
              <Route path="/WorkerForm" element={<WorkerForm />} exact />
              <Route path="/ModelForm" element={<ModelForm />} exact />
              {/* <Route path="/Logout" element={<Logout setLogout={(val) => setLogout(val)} />} exact /> */}
            </Routes>
          </Main>
        )}
        {role !== " " && (
          <>
            <Drawer
              drawerwidth={drawerWidth}
              open={open}
              theme={theme}
              onClose={handleDrawerClose}
              className={classes.root}
              reload={reload}
            />
            <Main
              className={classes1.homeback}
              sx={{ marginTop: 8.1, marginRight: 0 }}
              drawerwidth={drawerWidth}
              open={open}
              theme={theme}
            >
              <Routes>
                <Route path="/" element={<Main1 />} exact></Route>
                <Route path="/About" element={<About />} exact />
                <Route
                  path="/Login"
                  element={<LoginRegistration theme={theme} />}
                  exact
                />
                <Route path="/Registration" element={<Registration />} exact />
                <Route path="/SupplierForm" element={<SupplierForm />} exact />
                <Route path="/CustomerForm" element={<CustomerForm />} exact />
                <Route path="/AgencyForm" element={<AgencyForm />} exact />
                <Route path="/WorkerForm" element={<WorkerForm />} exact />
                <Route path="/ModelForm" element={<ModelForm />} exact />
                {isLoggedIn && (
                  <Route
                    path={`/Account/MyTasks`}
                    element={<Account sx={{ marginLeft: 0 }} />}
                    exact
                  />
                )}
                {role !== "Supplier" && (
                  <Route path="/Suppliers" element={<Suppliers />} exact />
                )}
                {role !== "Customer" && (
                  <Route path="/Customers" element={<Customers />} exact />
                )}
                {role !== "Worker" && (
                  <Route path="/Workers" element={<Workers />} exact />
                )}
                {role !== "Agency" && (
                  <Route path="/Agencies" element={<Agencies />} exact />
                )}
                {role !== "Model" && (
                  <Route path="/Models" element={<Models />} exact />
                )}
                {role === "Supplier" && (
                  <>
                    <Route path="/Garments" element={<Garments />} exact />
                    <Route
                      path="/Garments/GarmentForm"
                      element={<Navigate replace to="GarmentForm" />}
                      exact
                    />
                    <Route
                      path="/GarmentForm"
                      element={<GarmentForm />}
                      exact
                    />
                  </>
                )}
                {role === "Agency" && (
                  <>
                    <Route path="/Gadgets" element={<Gadgets />} exact />
                    <Route
                      path="/Gadgets/GadgetForm"
                      element={<Navigate replace to="GadgetForm" />}
                      exact
                    />
                    <Route path="/GadgetForm" element={<GadgetForm />} exact />
                  </>
                )}

                {role === "Admin" && (
                  <>
                    <Route path="/Garments" element={<Garments />} exact />
                    <Route path="/Gadgets" element={<Gadgets />} exact />
                    <Route
                      path="/Notifications"
                      element={<Notifications />}
                      exact
                    />
                    <Route path="/Messages" element={<Messages />} exact />
                    <Route
                      path="/Departments"
                      element={<Departments />}
                      exact
                    />
                  </>
                )}

                <Route
                  path="/PhotosPosters"
                  element={<PhotosPosters />}
                  exact
                />
                <Route
                  path="/PhotoPosterForm"
                  element={<PhotoPosterForm />}
                  exact
                />

                {/* <Route path="/Settings" element={<Settings />} exact />  */}
                <Route
                  path="/ChangePassword"
                  element={<ChangePassword />}
                  exact
                />
                <Route path="/MyTasks" element={<Tasks />} exact />
                <Route path="/TaskForm" element={<TaskForm />} exact />
              </Routes>
            </Main>
          </>
        )}
        <Footer
          sx={{ display: "flex" }}
          drawerwidth={drawerWidth}
          open={open}
          theme={theme}
        />
      </Box>
    </React.Fragment>
  );
};
export default Home;
