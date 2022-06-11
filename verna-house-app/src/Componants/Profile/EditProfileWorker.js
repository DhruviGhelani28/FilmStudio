import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import classes from "../Login.module.css";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

import { getWorker, editWorker } from "../../Store/Worker/WorkerAction";
import UploadButton from "../UploadButton";

// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import userEvent from '@testing-library/user-event';
const useStyles = makeStyles({
  root1: {
    color: "#121212",
    "&:hover": {
      color: "#EC255A",
    },
  },
  root4: {
    // background: 'linear-gradient(45deg, #575758  25%, #2F3031 80%)',
    color: "#fff",
  },
  root5: {
    marginTop: 30,
  },
  allfield: {
    width: "30ch",
    marginTop: "10ch",
    // background: 'linear-gradient(45deg, #575758  25%, #2F3031 80%)',
    color: "#fff",
  },
});

const EditProfileWorker = (props) => {
  const classes1 = useStyles();
  const dispatch = useDispatch();
  const workerId = props.workerId;
  console.log(workerId);
  const worker = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(getWorker({ id: workerId }));
  }, [dispatch]);

  console.log(worker.getWorker);

  const [values, setValues] = React.useState({
    fullname: "",
    email: "",
    username: "",
    mobileNo: "",
    short_intro: "",
    address: "",
    profileImage: ``,
    location: "",
    worker: "",
  });

  useEffect(() => {
    setValues({
      fullname: worker.getWorker?.name,
      email: worker.getWorker?.email,
      username: worker.getWorker?.username,
      mobileNo: worker.getWorker?.mobileNo,
      short_intro: worker.getWorker?.short_intro,
      address: worker.getWorker?.address,
      profileImage: `${worker.getWorker?.profile_image}`,
      location: worker.getWorker?.location,
      worker: worker.getWorker?.worker,
    });
  }, [worker]);

  console.log(values);

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "profileImage") {
      console.log(event.target.files[0]);
      setValues({ ...values, profileImage: event.target.files[0] });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log(values);
    dispatch(editWorker({ values: values }, workerId));
    props.setReload(true);
    props.onClose();
  };
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = props.open ? "hidden" : "auto";
  }, [props.open]);
  return (
    // <Container align="center">
    <>
      <Card
        component="form"
        sx={{
          height: 450,
          width: 590,
          padding: 1,
          background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              sx={{ marginTop: 2 }}
              className={classes1.allfield}
              required
              color="primary"
              id="fullname"
              label="Enter Your Name"
              placeholder="xyz abc"
              {...register("fullname", {
                maxLength: 20,
                minLength: 4,
              })}
              error={!!errors?.fullname}
              value={values?.fullname}
              onChange={handleChange("fullname")}
            />
            <Typography>
              {errors.fullname ? "Max length 20 and Min length 4" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ marginTop: 2 }}
              className={classes1.allfield}
              required
              id="email"
              label="Enter Your Email Address"
              placeholder="xyz@abc.com"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i,
                },
              })}
              error={!!errors?.email}
              value={values?.email}
              onChange={handleChange("email")}
            />
            <Typography>
              {errors.email ? "Invalid Email Address" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ marginTop: 1 }}
              className={classes1.allfield}
              required
              id="username"
              label="Enter Your UserName"
              placeholder="xyz_abc123"
              {...register("username", {
                maxLength: 20,
                minLength: 5,
              })}
              error={!!errors?.username}
              value={values?.username}
              onChange={handleChange("username")}
            />
            <Typography>
              {errors.username ? "Max length 20 and Min length 5" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              type="tel"
              required
              id="mobileNo"
              label="Mobile No."
              placeholder="1234567892"
              {...register("mobileNo", {
                validate: {
                  greaterThanTen: (value) => value.length >= 10,
                  lessThanFourteen: (value) => value.length < 14,
                },
                pattern: {
                  value: /^[0-9]*/,
                },
              })}
              error={errors?.mobileNo}
              value={values?.mobileNo}
              onChange={handleChange("mobileNo")}
            />
            <Typography>
              {errors.mobileNo ? "Invalid Mobile No." : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="short_intro"
              label="Short Intro"
              placeholder="xyz abc"
              {...register("short_intro", {
                maxLength: 100,
              })}
              error={errors?.short_intro}
              value={values?.short_intro}
              onChange={handleChange("short_intro")}
            />
            <Typography>
              {errors.short_intro ? "Max length 100" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="address"
              label="Address"
              placeholder="xyz abc"
              {...register("address", {
                maxLength: 60,
              })}
              error={errors?.address}
              value={values?.address}
              onChange={handleChange("address")}
            />
            <Typography>{errors.address ? "Max length 60" : ""}</Typography>
          </Grid>
          <Grid item xs={12}>
            <label
              style={{
                border: "1px solid white",
                borderRadius: 5,
                color: "white",
                fontSize: 15,
              }}
            >
              <input
                type={"file"}
                onClick={handleChange("profileImage")}
                {...register("profileImage", { required: true })}
                error={errors?.profileImage}
              />
              <label>{values?.profileImage}</label>
            </label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="location"
              label="Location"
              placeholder="xyz"
              {...register("location", { maxLength: 80 })}
              error={!!errors?.location}
              value={values?.location}
              onChange={handleChange("location")}
            />
            <Typography>
              {errors?.location ? "Length should be max 80" : ""}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              rowSpacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  className={classes1.root4}
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    marginTop: 0.5,
                    color: "black",
                    marginRight: 0,
                  }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  className={classes1.root4}
                  onClick={props.onClose}
                  sx={{
                    marginTop: 0.5,
                    // marginLeft: 3,
                    // marginRight: 2,
                    color: "black",
                  }}
                >
                  Cancle
                </Button>
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
      </Card>
    </> // </Container>
  );
};
export default EditProfileWorker;

{
  /* <TextField
                                disabled
                                id="supplier-one-to-one"
                                label="Supplier"
                            // defaultValue={username}
                            />
                            <TextField
                                required
                                multiline
                                size='medium'
                                id="first-name"
                                label="Name"
                                placeholder="xyz abc"
                            />
                            <TextField
                                required
                                multiline
                                size='medium'
                                id="email-id"
                                label="Email Address"
                                placeholder="xyz@abc.com"
                            />
                            <TextField
                                required
                                multiline
                                size='medium'
                                id="username"
                                label="UserName"
                                placeholder="xyz_abc123"
                            /> */
}
