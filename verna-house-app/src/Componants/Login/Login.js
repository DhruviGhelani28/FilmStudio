import React, { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import video from "../../static/vedio/vedio2.mp4";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Badge,
  Avatar,
  Button,
  styled,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import key from "../../static/images/key.png";
import classes from "../Login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData, getUsers } from "../../Store/Register/RegisterAction";
import { useForm } from "react-hook-form";
// import { useSelect } from "@mui/base";
import { loadingButtonClasses } from "@mui/lab";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(45deg, #2F3031 30%, #575758 50%, #2F3031 30%,#575758 50%)",
    color: "action.home",
    maxWidth: 500,
    maxHeight: 4000,
    padding: 1,
    marginTop: 30,
    // margin: "center",
    position: "relative",
  },
  root1: {
    color: "#fff",
    "&:hover": {
      color: "#EC255A",
    },
  },
  // root2: {
  //     '&:onClick': {
  //         color: '#fff',
  //     },
  //     color: '#EC255A',
  //     '&:hover': {
  //         color: '#fff',
  //     },
  //     '&:active': {
  //         color: '#EC255A',
  //     }
  // },
  root3: {
    color: "#EC255A",
    "&:hover": {
      color: "#fff",
    },
  },
  root4: {
    background: "linear-gradient(45deg, #575758 25%, #2F3031 80%)",
  },
  root5: {
    marginTop: 30,
  },
  // /#F3C5C5/#FFE3E3
  allfield: {
    width: "40ch",
    marginTop: "10ch",
    background: "linear-gradient(45deg, #575758 25%, #2F3031  80%)",
    color: "#fff",
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",

    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const classes1 = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const logindata = JSON.parse(localStorage.getItem("userInfo"));
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
  };

  const [alert, setAlert] = React.useState(false);
  const alertClick = () => {
    setAlert(true);
  };
  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let a = dispatch(getLoginData(values));
    a.then((res) => {
      if (res != undefined) {
        alertClick();
      } else {
        navigate("/Account/MyTasks");
        props.setReload(true);
      }
    });
  };

  const goBackHandler = () => {
    navigate("/Home");
  };
  const changePasswordHandler = () => {
    if (logindata !== null) {
      navigate("/ChangePassword");
    }
  };

  const handleClickShowPassword = () => {
    if (values.password) {
      setShowPassword(!showPassword);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={classes.loginBack} theme={props.theme}>
        <video loop autoPlay muted preload="auto" className={classes.loginback}>
          <source src={video} type="video/mp4" />
        </video>
        <Snackbar open={alert} autoHideDuration={7000} onClose={alertClose}>
          <Alert onClose={alertClose} severity="error" sx={{ width: "100%" }}>
            Enter Valid Credentials
          </Alert>
        </Snackbar>
        <Card
          variant="outlined"
          className={classes1.root}
          sx={{
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <CardActions>
            <IconButton
              sx={{ marginLeft: 1 }}
              onClick={goBackHandler}
              className={classes1.root1}
            >
              <ChevronLeftIcon className={classes1.root1} />
            </IconButton>
          </CardActions>
          <CardContent>
            <h3 style={{ color: "#bdbdbd" }}>Sign In Here</h3>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="User"
                sx={{
                  width: 56,
                  height: 56,
                  borderWidth: 5,
                  borderColor: "#121212",
                }}
                position="sticky"
              />
            </StyledBadge>

            <Box
              component="form"
              sx={{
                marginTop: 5,
                "& .MuiTextField-root": { m: 1, width: "40ch" },
                "& .MuiButton-root": { textColor: "#121212" },
              }}
              noValidate
              autoComplete="off"
            // onSubmit={onSubmit}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <AccountCircle
                    sx={{
                      color: "white",
                      mr: 1,
                      my: 0.5,
                      position: "relative",
                      marginTop: 3,
                      marginRight: -0.3,
                    }}
                  />
                  {/* <TextField
                                    className={classes1.root5}
                                    sx={{
                                        color: 'action.home',
                                        borderColor: '#121212',
                                        '&:onFocus': {
                                            borderColor: '#121212',
                                        },
                                    }}
                                    required
                                    onChange={handleChange}
                                    id="email"
                                    label="Enter Your Email Address"
                                    placeholder="xyz@abc.com"
                                    // {...register('email', {
                                        //     required: true, pattern: {
                                    //         value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i,
                                    //         message: "Invalid Email Address",
                                    //     },
                                    // })}
                                    error={!!errors?.email}
                                    helpertext={errors?.email ? errors.email.message : null}
                                /> */}
                  <TextField
                    sx={{ marginTop: 1 }}
                    className={classes1.allfield}
                    required
                    id="username"
                    label="Enter Your UserName"
                    placeholder="xyz_abc123"
                    {...register("username", {
                      required: true,
                      maxLength: 20,
                      minLength: 4,
                      message: "Enter Valid Username",
                    })}
                    error={!!errors?.username}
                    value={values?.username}
                    onChange={handleChange("username")}
                  />
                  <Typography sx={{ color: "white" }}>
                    {errors?.username ? "Enter Valid Username" : null}
                  </Typography>
                </Grid>

                {/* <Grid item xs={12}>
                                <PeopleIcon sx={{ color: 'action.home', mr: 1, my: 0.5, position: 'relative', marginTop: 3, marginRight: -0.3 }} />
                                <FormControl required sx={{ m: 1, width: '40ch' }} >
                                <InputLabel id="roll-id">Roll</InputLabel>
                                <Select
                                sx={{ textAlign: 'left' }}
                                labelId="demo-simple-select-label"
                                id="roll"
                                label="Roll"
                                defaultValue=""
                                onChange={handleChange}
                                {...register('roll', { required: true })}
                                error={!!errors?.roll}
                                helpertext={errors?.roll ? errors.roll.message : null}
                                >
                                {Rolls.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                            ))}
                                            </Select>
                                    <FormHelperText>Please select your roll in system.</FormHelperText>
                                </FormControl>
                            </Grid> */}
                <Grid item xs={12}>
                  <img
                    width="23"
                    src={key}
                    className={classes.custom}
                    alt="key"
                  ></img>
                  <TextField
                    autoComplete="true"
                    required
                    sx={{ marginTop: 1 }}
                    className={classes1.allfield}
                    label="Enter Password"
                    placeholder="*******"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className={classes1.root1}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff className={classes1.root1} />
                            ) : (
                              <Visibility className={classes1.root1} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password", {
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
                        // message: "The password must contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character & length should be 8 character or longer ",
                      },
                    })}
                    error={!!errors?.password}
                    onChange={handleChange("password")}
                  />
                  <Typography sx={{ color: "white", fontSize: 12 }}>
                    {errors?.password
                      ? "The password must contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character & length should be 8 character or longer "
                      : null}
                  </Typography>
                </Grid>

                <Grid item xs={12} className={classes.button}>
                  <Button
                    className={classes1.root4}
                    variant="contained"
                    type="submit"
                    onClick={onSubmit}
                    sx={{
                      marginTop: 0.5,
                      marginRight: -38.5,
                      color: "#bdbdbd",
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>

                <Grid item xs={12} className={classes.register}>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 0.5, marginLeft: -9, color: "#bdbdbd" }}
                  >
                    Don't You Have An Account?
                    <Link to={"/Registration"} className={classes1.root3}>
                      {" "}
                      Sign Up{" "}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 0.5, marginLeft: -26, color: "black" }}
                  >
                    <Link to={"/Registration"} className={classes1.root3}>
                      Forgot Password?
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={changePasswordHandler}
              sx={{ color: "#bdbdbd" }}
              className={classes1.root3}
            >
              Change Password
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};
export default Login;

/*
<input
  {...register("test", {
    validate: value => value === '1' || 'error message'  // JS only: <p>error message</p> TS only support string
  })}
/>
// object of callback functions
<input
  {...register("test1", {
    validate: {
      positive: v => parseInt(v) > 0 || 'should be greater than 0',
      lessThanTen: v => parseInt(v) < 10 || 'should be lower than 10',
      // you can do asynchronous validation as well
      checkUrl: async () => await fetch() || 'error message',  // JS only: <p>error message</p> TS only support string
      messages: v => !v && ['test', 'test2']
    }
  })}
/>*/
