import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "@mui/material/MenuItem";
import {
  addGarment,
  getGarment,
  editGarment,
} from "../../Store/Garment/GarmentAction";

const useStyles = makeStyles({
  root1: {
    "&:hover": {
      color: "#EC255A",
    },
  },
  root4: {
    background: "linear-gradient(45deg, #2F3031 25%, #575758  80%)",
    color: "action.home",
  },
  root5: {
    marginTop: 30,
  },
  allfield: {
    width: "40ch",
    marginTop: "10ch",
    background: "linear-gradient(45deg, #2F3031 25%, #575758  80%)",
    color: "action.home",
  },
});
const OrderStatus = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Purchased",
    label: "Purchased",
  },
];

const GarmentForm = (props) => {
  const dispatch = useDispatch();
  const classes1 = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const garmentId = props.garmentId;
  console.log(garmentId);

  const garment = useSelector((state) => state.garment);

  useEffect(() => {
    let a = dispatch(getGarment({ id: props.garmentId }));
    a.then((res) => {
      console.log("--------a------", res);
    });
  }, [props.garmentId, dispatch]);

  console.log(garment.getGarment);
  const [values, setValues] = React.useState({
    garmentName: "",
    garmentImage: "",
    price: "",
    orderStatus: "",
    timeDuration: "",
  });

  useEffect(() => {
    setValues({
      garmentName: garment?.getGarment?.garmentName,
      garmentImage: `${garment?.getGarment?.garmentImage}`,
      price: garment.getGarment?.price,
      orderStatus: garment?.getGarment?.orderStatus,
      timeDuration: garment?.getGarment?.timeDuration,
    });
  }, [props.garmentId]);

  const onSubmit = () => {
    console.log(values);
    if (props.garmentId) {
      dispatch(editGarment({ values: values }, garmentId));
    } else {
      dispatch(addGarment({ values: values }));
    }
    props.setReload(true);
    props.onClick();
  };

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "garmentImage") {
      console.log(event.target.files[0]);
      setValues({ ...values, garmentImage: event.target.files[0].name });
    }
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
          maxHeight: 900,
          background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
          borderColor: "#fff",
          borderWidth: 1,
          borderRadius: 5,
          color: "action.home",
          paddingTop: 1,
          m: 1,
          marginTop: 5,
          //   transition: "all 0.5s ease",
          //   "&:hover": { transform: "scale(1.05)", borderRadius: "40px" },
        }}
        component="form"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <CardActions>
          <IconButton
            sx={{ marginLeft: 1, color: "#fff" }}
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
            color="#fff"
            className={classes.registration}
          >
            {props.garmentId ? "Edit" : "Add"} Garment
          </Typography>
          <Grid
            container
            component="div"
            spacing={0}
            className={classes1.root5}
          >
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 0 }}
                id="garmentName"
                label="Garment Name"
                {...register("garmentName", {
                  required: true,
                  minLength: 1,
                  maxLength: 200,
                })}
                error={errors?.garmentName}
                value={values?.garmentName}
                onChange={handleChange("garmentName")}
              />
              <Typography color="#fff">
                {errors.garmentName ? "Length should be Max 200" : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="garmentImage"
                label="Garment Image"
                type="file"
                accept="image/*"
                {...register("garmentImage", { required: true })}
                error={errors?.garmentImage}
                // value={values?.garmentImage ? {`http://127.0.0.1:8000${values.garmentImage}`} : undefined}
                onChange={handleChange("garmentImage")}
              ></TextField>
              <Typography color="#fff">
                {errors.garmentImage ? "Enter valid Image" : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                required
                id="price"
                label="Price"
                {...register("price", {
                  required: true,
                  validate: { positive: (value) => value >= 0 },
                })}
                error={!!errors?.price}
                value={values?.price}
                onChange={handleChange("price")}
              />
              <Typography color="#fff">
                {errors.price ? "Enter valid price >=0 " : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                sx={{ marginTop: 1, width: "40ch" }}
                className={classes1.allfield}
              >
                <InputLabel id="order-id">Order Status</InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  id="orderStatus"
                  label="Order Status"
                  required
                  {...register("orderStatus", { required: true })}
                  error={!!errors?.orderStatus}
                  value={values?.orderStatus}
                  onChange={handleChange("orderStatus")}
                >
                  {OrderStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography color="#fff">
                {errors.orderStatus ? "Choose OrderStatus" : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="timeDuration"
                label="TimeDuration"
                format="DD Days MM Months"
                placeholder="2 Days 2 Months"
                {...register("timeDuration", { required: true })}
                error={!!errors?.timeDuration}
                value={values?.timeDuration}
                onChange={handleChange("timeDuration")}
              />
            </Grid>
            <Grid item xs={12} className={classes.button}>
              <Button
                variant="contained"
                className={classes1.root4}
                onClick={handleSubmit(onSubmit)}
                sx={{
                  marginTop: 1,
                  marginRight: -34,
                  color: "#fff",
                }}
              >
                Submit
              </Button>
            </Grid>
            {/* </div> */}
            {/* </div> */}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
export default GarmentForm;
