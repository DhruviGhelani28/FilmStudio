import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import classes from '../Login.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
// import DatePicker from '../DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from 'react-hook-form';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../../Store/Task/TaskAction';
const useStyles = makeStyles({
    root1: {
        color: '#121212',
        '&:hover': {
            color: '#EC255A',
        }
    },
    root4:
    {
        background: 'linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)',
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
        background: 'linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)',
        color: 'action.home',
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
        value: 'Admin',
        label: 'Admin',
    },

];


const TaskForm = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes1 = useStyles();

    // const goBackHandler = () => {
    //     props.onClick()
    //     // navigate("/Account")
    // }

    const [values, setValues] = React.useState({
        'username': "",
        "taskName": '',
        "discription": '',
        "dateTime": '',
    });


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {

        // const data1 = a.push(data)
        e.preventDefault();
        console.log(JSON.stringify(data, null, 2));
        props.onClick()
        dispatch(addTask({ data }))
        setValues(
            {
                'username': "",
                "taskname": '',
                "discription": '',
                "datetime": 'dd-mm-yyyy --:--:--'
            })
    }
    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = props.open ? "hidden" : "auto";
    }, [props.open])
    return (
        <Container align="center">
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
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardActions>
                    <IconButton sx={{ marginLeft: 1, }} onClick={props.onClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <Typography variant="h4" component='div' fontSize='26px' className={classes.registration}>Add Task</Typography>
                    <div className={classes1.root5}>
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            required
                            multiline
                            size='medium'
                            id="username"
                            label="UserName"
                            placeholder="xyz_abc123"
                            {...register('username', { required: true, maxLength: 20, minLength: 4 })}
                            error={!!errors?.username}
                            helpertext={errors?.username ? errors.username.message : null}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            required
                            multiline
                            size='medium'
                            id="taskName"
                            label="Task Name"
                            {...register('taskname', { required: true, maxLength: 20, minLength: 4 })}
                            error={!!errors?.taskname}
                            helpertext={errors?.taskname ? errors.taskname.message : null}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            required
                            multiline
                            size='medium'
                            id="description"
                            label="Description"
                            placeholder="xyzbfhfkabc"
                            {...register('description', { required: true, maxLength: 100 })}
                            error={!!errors?.description}
                            helpertext={errors?.description ? errors.description.message : null}
                            onChange={handleChange}
                        />

                        <TextField
                            className={classes1.allfield}
                            sx={{ marginTop: 1 }}
                            id="dateTime"
                            label="Date & Time"
                            variant="outlined"
                            type="datetime-local"
                            // placeholder="dd-mm-yyyy, --:--:--"
                            // accept="datetime-local"
                            // value={values['dateTime']}
                            InputLabelProps={{
                                "shrink": true
                            }}
                            {...register('datetime', { required: true })}
                            error={!!errors?.datetime}
                            helpertext={errors?.datetime ? errors.datetime.message : null}
                            onChange={handleChange} />


                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                className={classes1.root4}
                                onClick={handleSubmit(onSubmit)}
                                sx={{
                                    marginTop: 0.5,
                                    marginRight: -34,
                                    color: 'black',
                                }}>Submit</Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </Container>
    );

};
export default TaskForm;

{/* <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    disableFuture
                                                    label="Date"
                                                    openTo="year"
                                                    views={['year', 'month', 'day']}
                                                    value={value}
                                                    onChange={
                                                        (newValue) => { setValue(newValue); }
                                                    }
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined">
                            </TextField> */}

{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disableFuture
                                    label="Date"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={value}
                                    onChange={
                                        (newValue) => { setValue(newValue); }
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider> */}
{/* <FormControl required sx={{ m: 1, width: '40ch' }} >
                                <InputLabel id="roll-id">Roll</InputLabel>
                                <Select
                                    sx={{ textAlign: 'left' }}
                                    labelId="demo-simple-select-label"
                                    id="select-roll"
                                    label="Roll"
                                    // value={'fghg'}
                                    onChange={rollChangeHandler}
                                >
                                    {Rolls.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Please select your roll in system.</FormHelperText>
                            </FormControl> */}