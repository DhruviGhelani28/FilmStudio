import "./App.css";
import React from "react";
import Home from "./Componants/Home";
import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import classes from "../src/Componants/Login.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    common: {
      //   black: '#000',
      //   white: '#fff',
    },
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some
          // multiline: true,
          // border: '0.3px solid white',
          borderRadius: 4,
          color: "#fff",
          varient: "outlined",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          color: "#fff",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          multiline: true,
          color: "#fff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // multiline: true,
          color: "#fff",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        // Name of the slot
        root: {
          // border: '0.3px solid white',
          borderRadius: 4,
          color: "#fff",

          varient: "outlined",
          multiline: true,
        },
      },
    },

  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Home className={classes.body} />
          {/* <Routes>
            <Route path="/" element={<Home />} exact></Route>
          </Routes> */}
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
