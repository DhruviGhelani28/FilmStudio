import React, { useEffect } from "react";
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
  addGadget,
  getGadget,
  editGadget,
} from "../../Store/Gadget/GadgetAction";

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

const GadgetForm = (props) => {
  const dispatch = useDispatch();
  const classes1 = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gadgetId = props.gadgetId;
  console.log(gadgetId);

  const gadget = useSelector((state) => state.gadget);
  useEffect(() => {
    // if (props.gadgetId) {
    dispatch(getGadget({ id: gadgetId }));
    // console.log("--------a------", a);
    // }
  }, [dispatch]);
  console.log(gadget.getGadget);
  const [values, setValues] = React.useState({
    gadgetName: "",
    gadgetImage: "",
    price: "",
    orderStatus: "",
    timeDuration: "",
  });
  useEffect(() => {
    // if (props.gadgetId) {
    setValues({
      gadgetName: gadget.getGadget?.itemName,
      gadgetImage: `${gadget.getGadget?.premiseImage}`,
      price: gadget.getGadget?.price,
      orderStatus: gadget.getGadget?.orderStatus,
      timeDuration: gadget.getGadget?.timeDuration,
    });
    // }
  }, []);
  const handleChange = (prop) => (event) => {
    console.log(prop);

    setValues({ ...values, [prop]: event.target.value });
    if (prop == "gadgetImage") {
      console.log(event.target.files[0]);
      setValues({ ...values, gadgetImage: event.target.files[0].name });
    }
  };

  const onSubmit = () => {
    console.log(values);
    if (props.gadgetId) {
      dispatch(editGadget({ values: values }, gadgetId));
    } else {
      dispatch(addGadget({ values: values }));
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
        onSubmit={handleSubmit(onSubmit)}
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
            {props.gadgetId ? "Edit" : "Add"} Gadget
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
                sx={{ marginTop: 1 }}
                size="medium"
                id="gadgetName"
                label="Gadget Name"
                {...register("gadgetName", {
                  required: true,
                  minLength: 1,
                  maxLength: 200,
                })}
                error={!!errors?.gadgetName}
                value={values?.gadgetName}
                onChange={handleChange("gadgetName")}
              />
              <Typography color="#fff">
                {errors.gadgetName ? "Length should be Max 200" : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                required
                id="gadgetImage"
                label="Gadget Image"
                type="file"
                accept="image/*"
                {...register("gadgetImage", { required: true })}
                error={!!errors?.gadgetImage}
                // value={values.gadgetImage ? values.gadgetImage : undefined}
                onChange={handleChange("gadgetImage")}
              ></TextField>
              <Typography color="#fff">
                {errors.gadgetImage ? "Enter valid Image" : ""}
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
                  defaultValue=""
                  required
                  {...register("orderStatus", { required: true })}
                  error={!!errors?.orderStatus}
                  value={values?.orderStatus}
                  onChange={handleChange("orderStatus")}
                >
                  {OrderStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {/* {option.label} */}
                      {option.value}
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
                required
                id="timeDuration"
                label="TimeDuration"
                format="DD Days MM Months"
                placeholder="2 Days 2 Months"
                {...register("timeDuration", {
                  // required: true,
                  pattern: {
                    value: "^([0-30]+)Days ([0-12]+)Months$/",
                  },
                })}
                error={!!errors?.timeDuration}
                value={values?.timeDuration}
                onChange={handleChange("timeDuration")}
              />
              <Typography color="#fff">
                {errors.timeDuration
                  ? "Enter TimeDuration in valid format"
                  : ""}
              </Typography>
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
export default GadgetForm;
