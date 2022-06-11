
import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import classes from '../Login.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from "@material-ui/core/styles";
import { getRegisterData } from '../../Store/Register/RegisterAction';
import { getAgencies } from '../../Store/Supplier/SupplierAction';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from 'react-hook-form';
// import FormControl from '@mui/material/FormControl';
// import { Select } from '@mui/material';
import UploadButton from '../UploadButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyles = makeStyles({
    root1: {
        color: '#fff',
        '&:hover': {
            color: '#EC255A',
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
        color: 'action.home',
    }
});


const AgencyForm = props => {
    const state = useLocation().state
    const dispatch = useDispatch()
    // console.log(state)
    const classes1 = useStyles();
    const navigate = useNavigate()

    const goBackHandler = () => {
        navigate("/Registration")
    }
    // const a = [state.fullname, state.username, state.email]
    const [values, setValues] = React.useState({
        mobileNo: "",
        agencyName: '',
        agencyAddress: '',
        profileImage: "",
        location: '',
        socialWebsite: "",
    });

    const handleChange = (prop) => (event) => {

        console.log(prop)
        setValues({ ...values, [prop]: event.target.value });
        if (prop == "profileImage") {
            console.log(event.target.files[0])
            setValues({ ...values, profileImage: event.target.files[0].name });
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => {
        console.log(values)
        const data1 = { ...state, ...values }
        dispatch(getRegisterData({ data: data1 }));
        console.log("user registered agency created")
        navigate("/Login")
    }
    return (
        <Container align="center">
            <Card
                variant="outlined"
                margin="10px"
                sx={{
                    maxWidth: 500, maxHeight: 8000, background: 'linear-gradient(45deg, #2F3031 30%, #575758 50%, #2F3031 30%,#575758 50%)',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                    color: 'action.home',
                    paddingTop: 1,
                    m: 1,
                    marginTop: 10,
                    transition: "all 0.5s ease",
                    "&:hover": { transform: "scale(1.05)", borderRadius: "40px" },
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardActions>
                    <IconButton sx={{ marginLeft: 1, }} onClick={goBackHandler} >
                        <ChevronLeftIcon className={classes1.root1} />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography variant="h4" component='div' fontSize='26px' className={classes.registration}>Agency Profile</Typography>

                    <div className={classes1.root5}>
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            disabled

                            size='medium'
                            id="role"
                            label="Role"
                            defaultValue={state.role}

                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                            id="mobileNo"
                            label="Mobile No."
                            placeholder="1234567892"

                            {...register('mobileNo', { required: true, maxLength: 10 })}
                            error={!!errors?.mobileNo}

                            value={values?.mobileNo}
                            onChange={handleChange('mobileNo')}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}

                            id="agencyName"
                            label="Agency Name"
                            placeholder="xyz abc"

                            {...register('agencyName', { required: true, maxLength: 20 })}
                            error={!!errors?.agencyName}

                            value={values?.agencyName}
                            onChange={handleChange('agencyName')}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}

                            id="agencyAddress"
                            label="Agency Address"
                            placeholder="xyz abc"

                            {...register('agencyAddress', { required: true, maxLength: 100 })}
                            error={!!errors?.agencyAddress}

                            value={values?.agencyAddress}
                            onChange={handleChange('agencyAddress')}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}

                            id="profileImage"
                            label="Profile Image"
                            placeholder='Upload File'

                            type="file"
                            accept="image/*"

                            {...register('profileImage', { required: true })}
                            error={!!errors?.profileImage}

                            value={values?.profileImage}
                            onChange={handleChange('profileImage')}
                        >
                        </TextField>
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}

                            id="location"
                            label="Location"
                            placeholder="xyz"

                            {...register('location', { required: true, maxLength: 100 })}
                            error={!!errors?.location}

                            value={values?.location}
                            onChange={handleChange('location')}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}

                            id="socialWebsite"
                            label="Social Website"
                            placeholder="http://xyz.com"

                            {...register('socialWebsite', { required: false })}
                            error={!!errors?.socialWebsite}

                            value={values?.socialWebsite}
                            onChange={handleChange('socialWebsite')}
                        />
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                className={classes1.root4}
                                // onClick={handleSubmit(onSubmit)}
                                sx={{
                                    marginTop: 0.5,
                                    marginRight: -34,
                                    color: 'black',
                                }}>
                                Submit</Button>
                        </div>

                    </div>
                    {/*</Box> */}
                </CardContent>
            </Card>
        </Container>
    );

};
export default AgencyForm;

//                       <TextField
//                             className={classes.allfield}
//                             sx={{ marginTop: 1 }}
//                             disabled
//                             id="customer-one-to-one"
//                             label="Customer"
//                          defaultValue={username}
//                         />
//                        <TextField
//                             className={classes.allfield}
//                             sx={{ marginTop: 1 }}
//                             required
//                             multiline
//                             size='medium'
//                             id="first-name"
//                             label="Name"
//                             placeholder="xyz abc"
//                         />
//                         <TextField
//                             className={classes.allfield}
//                             sx={{ marginTop: 1 }}
//                             required
//                             multiline
//                             size='medium'
//                             id="email-id"
//                             label="Email Address"
//                             placeholder="xyz@abc.com"
//                         />
//                         <TextField
//                             className={classes.allfield}
//                             sx={{ marginTop: 1 }}
//                             required
//                             multiline
//                             size='medium'
//                             id="username"
//                             label="UserName"
//                             placeholder="xyz_abc123"
// /> 