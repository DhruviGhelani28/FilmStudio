
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate, Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import classes from '../Login.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/core/styles";
import { formatMuiErrorMessage } from '@mui/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { getRegisterData } from '../../Store/Register/RegisterAction';
import { Pattern } from '@mui/icons-material';

// const theme = createTheme({
//     components: {
//         // Name of the component
//         .Mui-error: {
//             styleOverrides: {
//                 // Name of the slot
//                 root: {
//                     // Some CSS
//                     fontSize: '1rem',
//                 },
//             },
//         },
//     },
// });


const useStyles = makeStyles({
    root1: {
        color: '#fff',
        '&:hover': {
            color: '#EC255A',
        }
    },
    // root2: {
    //     '&:onClick': {
    //         color: '#121212',
    //     },
    //     color: '#EC255A',
    //     '&:hover': {
    //         color: '#121212',
    //     },
    //     '&:active': {
    //         color: '#EC255A',
    //     }
    // },
    root3: {
        color: '#EC255A',
        '&:hover': {
            color: '#fff',
        }
    },
    root4:
    {
        background: 'linear-gradient(45deg, #575758 25%, #2F3031 80%)',
        color: 'action.home',
    },
    root5:
    {
        marginTop: 30,
    },
    allfield:
    {
        width: '40ch',
        marginTop: '10ch',
        background: 'linear-gradient(45deg, #575758 25%, #2F3031  80%)',
        color: '#fff'
    }
});

const Rolls = [
    {
        value: 'Supplier',
        label: 'Supplier',
    },
    {
        value: 'Customer',
        label: 'Customer',
    },
    {
        value: 'Agency',
        label: 'Agency',
    },
    {
        value: 'Worker',
        label: 'Worker',
    },
    {
        value: 'Model',
        label: 'Model',
    },
    {
        value: 'Admin',
        label: 'Admin',
    },
];

const Registration = props => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const navigateForm = useNavigate();
    // const validationSchema = Yup.object().shape({
    //     fullname: Yup.string().required('Fullname is required'),
    //     username: Yup.string()
    //         .required('Username is required')
    //         .min(6, 'Username must be at least 6 characters')
    //         .max(20, 'Username must not exceed 20 characters'),
    //     email: Yup.string()
    //         .required('Email is required')
    //         .email('Email is invalid'),
    //     password: Yup.string()
    //         .required('Password is required')
    //         .min(6, 'Password must be at least 6 characters')
    //         .max(40, 'Password must not exceed 40 characters'),  
    //     confirmPassword: Yup.string()
    //         .required('Confirm Password is required')
    //         .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    //     roll: Yup.string()
    //         .required('Roll is required'),

    // });
    const { register, handleSubmit, formState: { errors } } = useForm(
        // {resolver: yupResolver(validationSchema)}
    );

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));

        // dispatch(getRegisterData({ data: data }));
        if (data.role === 'Supplier') {
            console.log('registration data send')
            navigateForm("/SupplierForm", { state: data });
        }
        else if (data.role === 'Customer') {
            navigateForm("/CustomerForm", { state: data });
        }
        else if (data.role === 'Worker') {
            navigateForm("/WorkerForm", { state: data });
        }
        else if (data.role === 'Agency') {
            navigateForm("/AgencyForm", { state: data });
        }
        else {
            navigateForm("/ModelForm", { state: data });
        }

    };
    const goBackHandler = () => {
        navigate("/Login")
    }

    const classes1 = useStyles();
    const [values, setValues] = React.useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirm: '',
        role: '',
        showPassword: false,
    });
    // const [isPassValid, setIsPassValid] = useState(false)
    const handleChange = (prop) => (event) => {

        setValues({ ...values, [prop]: event.target.value });
        // if ([prop] === 'confirm') {
        //     if (values.password === event.target.value) {
        //         setIsPassValid(true)
        //     }
        // }
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPass = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPass = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.registerBack} align="center">
            {/* <Container align="center" > */}
            <Card variant="outlined"
                sx={{
                    maxWidth: 500, maxHeight: 7000, background: 'linear-gradient(45deg, #2F3031 20%, #575758 50%, #2F3031 30%,#575758 50%)',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                    color: 'action.home',
                    paddingTop: 0,
                    marginTop: 2,
                    marginBottom: 5,
                    // transition: "all 0.5s ease",
                    // "&:hover": { transform: "scale(1.05)", borderRadius: "40px" },
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardActions>
                    <IconButton sx={{ marginLeft: 1, }} onClick={goBackHandler} className={classes1.root1}>
                        <ChevronLeftIcon className={classes1.root1} />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography variant="h4" component='div' fontSize='26px' className={classes.registration}>Register Here</Typography>

                    <div className={classes1.root5}>
                        <TextField
                            sx={{ marginTop: 2 }}
                            className={classes1.allfield}
                            required
                            multiline
                            size='medium'
                            id="fullname"
                            label="Enter Your Name"
                            placeholder="xyz abc"
                            inputprops={{ tabIndex: "1" }}
                            onChange={handleChange('fullname')}
                            {...register('fullname', { required: true, maxLength: 20, minLength: 4 })}
                            error={!!errors?.fullname}
                            helpertext={errors?.fullname ? errors.fullname.message : null}
                        />

                        <TextField
                            sx={{ marginTop: 1 }}
                            className={classes1.allfield}
                            required
                            multiline
                            size='medium'
                            id="email"
                            label="Enter Your Email Address"
                            placeholder="xyz@abc.com"
                            onChange={handleChange('email')}
                            inputprops={{ tabIndex: "2" }}
                            {...register('email', {
                                required: true, pattern: {
                                    value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i,
                                    message: "Invalid Email Address",
                                },
                            })}
                            error={!!errors?.email}
                            helpertext={errors?.email ? errors.email.message : null}
                        />

                        <TextField
                            sx={{ marginTop: 1 }}
                            className={classes1.allfield}
                            required
                            multiline
                            size='medium'
                            id="username"
                            label="Enter Your UserName"
                            placeholder="xyz_abc123"
                            onChange={handleChange('username')}
                            inputprops={{ tabIndex: "3" }}
                            {...register('username', { required: true, maxLength: 20, minLength: 4 })}
                            error={!!errors?.username}
                            helpertext={errors?.username ? errors.username.message : null}
                        />
                        <TextField
                            autoComplete="true"
                            inputprops={{ tabIndex: "4" }}
                            sx={{ marginTop: 1 }}
                            className={classes1.allfield}
                            required
                            label="Enter New Password"
                            placeholder='*******'
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            // value={values.password}
                            onChange={handleChange('password')}
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
                                            {values.showPassword ? <VisibilityOff className={classes1.root1} /> : <Visibility className={classes1.root1} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...register('password', {
                                required: true,
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
                                    message: "The password must contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character & length should be 8 character or longer ",
                                }
                            }
                            )}
                            error={!!errors?.password}
                            helpertext={errors?.password ? errors.password.message : null}
                        />
                        <TextField
                            autoComplete="true"
                            sx={{ marginTop: 1 }}
                            className={classes1.allfield}
                            required
                            label="Enter Confirm Password"
                            placeholder='*******'
                            id="confirmpassword"
                            type={values.showPassword ? 'text' : 'password'}
                            // value={values.password}
                            onChange={handleChange('confirm')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            className={classes1.root1}
                                            aria-label="toggle visibility"
                                            onClick={handleClickShowPass}
                                            onMouseDown={handleMouseDownPass}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff className={classes1.root1} /> : <Visibility className={classes1.root1} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            inputprops={{ tabIndex: "5" }}
                            {...register('confirmpassword', {
                                required: true,
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
                                    message: "The password must contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character & length should be 8 character or longer ",
                                }
                            }
                            )}
                            error={!!errors?.confirmpassword}
                            helpertext={errors?.confirmpassword ? errors.confirmpassword.message : null}
                        />

                        <FormControl
                            required sx={{ marginTop: 1, width: '40ch' }}
                            className={classes1.allfield}
                            inputprops={{ tabIndex: "6" }}
                        >
                            {/* {
                                console.log("vvvv", getFieldState("roll"))
                            } */}
                            <InputLabel id="role-id">Role</InputLabel>
                            <Select
                                onChange={handleChange('role')}
                                sx={{ textAlign: 'left' }}
                                labelId="demo-simple-select-label"
                                id="select-role"
                                label="Role"
                                {...register('role', { required: true })}
                                error={!!errors?.role}
                                helpertext={errors?.role ? errors.role.message : null}
                                defaultValue=""

                            >
                                {Rolls.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>


                        </FormControl>
                        <FormHelperText sx={{ marginLeft: 7, color: "white" }}>Please select your role in system.</FormHelperText>

                        <div className={classes.button}>
                            <Button
                                className={classes1.root4}
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                sx={{
                                    marginTop: 0.5,
                                    marginRight: -34,
                                    color: '#bdbdbd',
                                }}>
                                Next</Button>
                        </div>
                        <div className={classes.register}>
                            <Typography variant="body1" sx={{ marginTop: 0.5, marginLeft: -13.5, color: '#bdbdbd' }}>
                                Do You Have An Account?
                                <Link to={"/Login"} className={classes1.root3}> Sign In  </Link>
                            </Typography>
                            {/* <Typography variant="body1" sx={{ marginTop: 0.5, marginLeft: -27, color: 'black' }}>
                                <Link to={"/Registration"} className={classes1.root3}>Forgot Password?
                                </Link>
                            </Typography> */}
                        </div>
                    </div>

                </CardContent>
            </Card>
            {/* </Container> */}
        </div>
    );

};
export default Registration;

/*

<FormControl required sx={{ m: 1, width: '40ch' }} variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Enter Confirm Password</InputLabel>
                                <OutlinedInput
                                    label="Enter Confirm Password"
                                    placeholder='*******'
                                    id="confirm-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
*/