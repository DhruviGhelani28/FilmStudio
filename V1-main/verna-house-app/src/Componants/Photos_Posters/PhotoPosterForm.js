

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import classes from '../Login.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Container, FormControl } from '@mui/material';
import { useDispatch } from "react-redux";
// import { getLoginData } from "../../Store/Register/RegisterAction";
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid';
import { useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import UploadButton from '../UploadButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Input } from '@mui/material';
import { useState } from 'react';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #F3C5C5 30%, #FFE3E3 50%,#F3C5C5 30%,#FFE3E3 50%)',
        color: 'action.home',
        maxWidth: 500,
        maxHeight: 4000,
        paddingTop: 1,
        marginTop: 30,
        margin: "center",
    },
    root1: {
        color: '#121212',
        '&:hover': {
            color: '#EC255A',
        }
    },
    root2: {
        '&:onClick': {
            color: '#121212',
        },
        color: '#EC255A',
        '&:hover': {
            color: '#121212',
        },
        '&:active': {
            color: '#EC255A',
        }
    },
    root3: {
        color: '#EC255A',
        '&:hover': {
            color: '#121212',
        }
    },
    root4:
    {
        background: 'linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)',

    },
    allfield:
    {
        width: '40ch',
        marginTop: '10ch',
        background: 'linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)',
        color: 'action.home',
    }
});

const styles = {
    hidden: {
        display: "none",
    },
    importLabel: {
        color: "black",
    },
};
// const Input = styled('input')({
//     display: 'none',
// });

const OrderStatus = [
    {
        value: 'Available',
        label: 'Available',
    },
    {
        value: 'Pending',
        label: 'Pending',
    },
    {
        value: 'Purchased',
        label: 'Purchased',
    },
]
const PhotoPosterForm = props => {


    const dispatch = useDispatch();
    const navigateHome = useNavigate();
    const classes1 = useStyles();
    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        category: "",
        picture: "",
        photoName: "",
        orderStatus: "",
        timeDuration: "",
    });
    // const [file, setFile] = useState(null)
    // const photoData = {
    //     ...values,
    //     file
    // }
    // console.log(photoData)
    // console.log(values)
    // const onFileHandler = (e) => {

    //     console.log("file :: ", e.target.files[0])
    //     // setFile(e.target.files[0])
    //     setValues((values) => {
    //         // console.log(values.picture)
    //         return {
    //             ...values,
    //             picture: e.target.files[0].name,

    //         };

    //     });

    //     // console.log(values)
    // };
    // console.log(values.picture)
    // console.log(values)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleChange = (prop) => (event) => {

        console.log(prop)

        setValues({ ...values, [prop]: event.target.value });
        if (prop == "picture") {
            console.log(event.target.files[0])
            setValues({ ...values, picture: event.target.files[0].name });
        }

    };

    const onSubmit = (data) => {
        console.log(values)
        // data = data.push("picture", file)
        console.log(JSON.stringify(data, null, 2));
    }


    // console.log(values)
    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = props.open ? "hidden" : "auto";
    }, [props.open])
    return (
        <Container align="center" >
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 500, maxHeight: 8000, background: 'linear-gradient(45deg, #F3C5C5 30%, #FFE3E3 50%,#F3C5C5 30%,#FFE3E3 50%)',
                    borderColor: '#EC255A',
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
                    <IconButton sx={{ marginLeft: 1, }} onClick={props.onClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </CardActions>
                <CardContent>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <h4 >Add Photos/Posters</h4>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                className={classes1.allfield}
                                sx={{ marginTop: 1 }}
                                id="category"
                                label="Enter Category"
                                placeholder="xyz_abc123"
                                {...register('category', { required: true, maxLength: 20, minLength: 4 })}
                                error={!!errors?.category}
                                helpertext={errors?.category ? errors.category.message : null}
                                onChange={(e) => setValues((prevStatus) => { return { ...prevStatus, category: e.target.value } })}
                            // onChange={handleChange()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                type="file"
                                accept="image/*"
                                required

                                className={classes1.allfield}
                                sx={{ marginTop: 1 }}
                                label="Upload"
                                id='picture'

                                // ref={register}

                                {...register('picture', { required: true })}
                                error={!!errors?.picture}
                                helpertext={errors?.picture ? errors.picture.message : null}
                                onChange={(e) => setValues((prevStatus) => { return { ...prevStatus, picture: e.target.files[0].name } })}

                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                className={classes1.allfield}
                                sx={{ marginTop: 1 }}
                                id="photoName"
                                label="Name"

                                {...register('photoName', { required: true, maxLength: 20, minLength: 4 })}
                                error={!!errors?.photoName}
                                helpertext={errors?.photoName ? errors.photoName.message : null}
                                onChange={(e) => setValues((prevStatus) => { return { ...prevStatus, photoName: e.target.value } })}
                            /></Grid>
                        <Grid item xs={12}>
                            <FormControl
                                required
                                sx={{ marginTop: 1, width: '40ch' }}
                                className={classes1.allfield}>
                                <InputLabel id="order-id">Order Status</InputLabel>
                                <Select

                                    // ref={register}
                                    sx={{ textAlign: 'left' }}
                                    labelId="demo-simple-select-label"
                                    id="orderStatus"
                                    label="Order Status"
                                    // {...register('orderStatus', { required: true })}
                                    error={!!errors?.orderStatus}
                                    helpertext={errors?.orderStatus ? errors.orderStatus.message : null}
                                    defaultValue=""
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        setValues((prevStatus) => { return { ...prevStatus, orderStatus: event.target.value } })
                                    }}
                                >
                                    {OrderStatus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}{option.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    className={classes1.allfield}
                                    // sx={{ marginTop: 1 }}
                                    sx={{ textAlign: 'left', marginTop: 2 }}
                                    id="orderStatus"
                                    lable="orderstatus"
                                    type="select"
                                    defaultValue=""
                                    onChange={handleChange}
                                    {...register('orderStatus', { required: true })}
                                    error={!!errors?.orderStatus}
                                    helpertext={errors?.orderStatus ? errors.orderStatus.message : null}
                                >
                                    {OrderStatus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                className={classes1.allfield}
                                sx={{ marginTop: 1 }}
                                required

                                id="timeDuration"
                                label="TimeDuration"
                                placeholder="1 to 365 in days"
                                {...register('timeDuration', { required: true, maxLength: 365, minLength: 1 })}
                                error={!!errors?.timeDuration}
                                helpertext={errors?.timeDuration ? errors.timeDuration.message : null}
                                onChange={(e) => setValues((prevStatus) => { return { ...prevStatus, timeDuration: e.target.value } })}

                            />
                        </Grid>
                        <Grid item xs={12} className={classes.button}>
                            <Button
                                className={classes1.root4}
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                sx={{
                                    marginTop: 0.5,
                                    marginRight: -38.5,
                                    color: 'black',
                                }}>
                                Sign In</Button>
                        </Grid>
                    </Grid>
                    {/* </Box> */}
                    {/* </form> */}
                </CardContent>
            </Card>
        </Container >
    );

};
export default PhotoPosterForm;
{/* <Input

                                            style={styles.hidden}
                                            required
                                            accept="image/*"
                                            type="file"
                                            inputlabelprops={{
                                                shrink: true
                                            }}
                                            id="picture"
                                            label="Upload "
                                            onChange={onFileHandler}> */}
                                               // const formSubmit = (e) => {
    //     e.preventDefault();

    //     const formdata = new FormData();
    //     formdata.append("Category", values.Category)
    //     formdata.append("picture", values.picture.name)
    //     console.log(values.Category)
    //     console.log(values.picture.name)
    //     // console.log(formdata)
    //     const config = {
    //         headers: {
    //             'content-type': "multipart/formdata",
    //         },
    //     }
    // }
