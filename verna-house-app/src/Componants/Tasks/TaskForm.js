import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import classes from "../Login.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// import DatePicker from '../DatePicker';

import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../Store/Task/TaskAction";
const useStyles = makeStyles({
  root1: {
    "&:hover": {
      color: "#EC255A",
    },
  },
  root4: {
    background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
    color: "action.home",
  },
  root5: {
    marginTop: 30,
  },
  allfield: {
    width: "40ch",
    marginTop: "10ch",
    background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
    color: "action.home",
  },
});

const Roles = [
  {
    value: "Supplier",
    label: "Supplier",
  },
  {
    value: "Customer",
    label: "Customer",
  },
  {
    value: "Agency",
    label: "Agency",
  },
  {
    value: "Worker",
    label: "Worker",
  },
  {
    value: "Admin",
    label: "Admin",
  },
];

const TaskForm = (props) => {
  const dispatch = useDispatch();
  const classes1 = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(props.taskData);

  const [values, setValues] = React.useState({
    taskName: props.taskData?.name,
    description: props.taskData?.description,
    dateTime: props.taskData?.date + "T" + props.taskData?.time,
  });

  // useEffect(() => {
  //   setValues({
  //     taskName: props.taskData?.name,
  //     description: props.taskData?.description,
  //     dateTime: props.taskData?.date + "T" + props.taskData?.time,
  //   });
  // }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const onSubmit = () => {
    // const data1 = a.push(data)

    if (props.modal_type == "Edit") {
      dispatch(editTask(values));
    } else {
      dispatch(addTask(values));
    }
    props.setReload(true);
    props.onClick();
  };
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = props.open ? "hidden" : "auto";
  }, [props.open]);
  return (
    <Container align="center">
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          maxHeight: 8000,
          background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 5,
          color: "action.home",
          paddingTop: 1,
          m: 1,
          marginTop: 10,
          //   transition: "all 0.5s ease",
          //   "&:hover": { transform: "scale(1.05)", borderRadius: "40px" },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardActions>
          <IconButton
            sx={{ marginLeft: 1, color: "white" }}
            onClick={props.onClick}
            className={classes1.root1}
          >
            <ChevronLeftIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            fontSize="26px"
            className={classes.registration}
            color="#bdbdbd"
          >
            {props.taskData ? "Edit" : "Add"} Task
          </Typography>
          <div className={classes1.root5}>
            {/* <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              multiline
              size="medium"
              id="username"
              label="UserName"
              placeholder="xyz_abc123"
              {...register("username", {
                required: true,
                maxLength: 20,
                minLength: 4,
              })}
              error={!!errors?.username}
             value={values?.username}
              onChange={handleChange}
            /> */}
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              multiline
              size="medium"
              id="taskName"
              label="Task Name"
              {...register("taskname", {
                // required: true,
                maxLength: 20,
                minLength: 4,
              })}
              error={!!errors?.taskname}
              value={values?.taskName}
              onChange={handleChange("taskName")}
            />
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              multiline
              size="medium"
              id="description"
              label="Description"
              placeholder="xyzbfhfkabc"
              {...register("description", { maxLength: 100 })}
              error={!!errors?.description}
              value={values?.description}
              onChange={handleChange("description")}
            />

            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              id="dateTime"
              required
              label="Date & Time"
              variant="outlined"
              type="datetime-local"
              // placeholder="dd-mm-yyyy, --:--:--"
              // accept="datetime-local"
              // value={values['dateTime']}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("datetime")}
              error={!!errors?.datetime}
              value={values?.dateTime}
              onChange={handleChange("dateTime")}
            />

            <div className={classes.button}>
              <Button
                variant="contained"
                className={classes1.root4}
                onClick={handleSubmit(onSubmit)}
                sx={{
                  marginTop: 0.5,
                  marginRight: -34,
                  color: "#bdbdbd",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};
export default TaskForm;

{
  /* <TextField
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
                            </TextField> */
}

{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            </LocalizationProvider> */
}
{
  /* <FormControl required sx={{ m: 1, width: '40ch' }} >
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
                            </FormControl> */
}
