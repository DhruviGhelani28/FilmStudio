import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';
import Registration from "./Registration";
import ChangePassword from "./ChangePassword";
// import Button from '@mui/material/Button';
// import { Outlet } from "react-router-dom";
import classes from ".././Login.module.css"
import { Container } from "@mui/material";


const LoginRegistration = props => {
    // let match = useMatch();
    const navigate = useNavigate()

    const registrationHandler = () => {

        navigate("/Registration")
    }
    const loginHandler = () => {
        navigate("/")
    }
    // const [reload, setReload] = useState()
    return (
        <React.Fragment>
            <div align="center">
                <Routes>
                    <Route path="/" element={<Login onClick={loginHandler} onRegisterClick={registrationHandler} theme={props.theme} setReload={(val) => props.setReload(val)} />} exact />
                    <Route path="/Registration" element={<Registration />} exact />
                    <Route path="/ChangePassword" element={<ChangePassword />} exact />
                </Routes>

            </div>

        </React.Fragment>

    );

};
export default LoginRegistration;