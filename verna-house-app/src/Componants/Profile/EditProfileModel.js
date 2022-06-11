import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getModel, editModel } from "../../Store/Model/ModelAction";
import { Card, Grid, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "../Login.module.css";

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
const EditProfileModel = (props) => {
  const classes1 = useStyles();
  const dispatch = useDispatch();
  const modelId = props.modelId;
  console.log(modelId);
  const model = useSelector((state) => state.model);

  useEffect(() => {
    dispatch(getModel({ id: modelId }));
  }, [dispatch]);

  console.log(model.getModel);

  const [values, setValues] = React.useState({
    fullname: "",
    email: "",
    username: "",
    mobileNo: "",
    background: "",
    address: "",
    profileImage: "",
    salary: "",
    nativePlace: "",
  });

  useEffect(() => {
    setValues({
      fullname: model.getModel?.name,
      email: model.getModel?.email,
      username: model.getModel?.username,
      mobileNo: model.getModel?.mobileNo,
      background: model.getModel?.background,
      address: model.getModel?.address,
      profileImage: `${model.getModel?.profile_image}`,
      salary: model.getModel?.salary ? model.getModel.salary : 0,
      nativePlace: model.getModel?.nativePlace,
    });
  }, [model]);

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "profileImage") {
      console.log(event.target.files);
      setValues({ ...values, profileImage: event.target.files[0].name });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log(values);
    dispatch(editModel({ values: values }, modelId));
    props.setReload(true);
    props.onClose();
  };

  return (
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
              id="background"
              label=" Background"
              placeholder="xyz abc"
              {...register("background", { maxLength: 500 })}
              error={!!errors?.background}
              value={values?.background}
              onChange={handleChange("background")}
            />
            <Typography>{errors.background ? "Max length 500" : ""}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="address"
              label="Address"
              placeholder="xyz abc"
              {...register("address", { maxLength: 100 })}
              error={!!errors?.address}
              value={values?.address}
              onChange={handleChange("address")}
            />
            <Typography>{errors.address ? "Max length 100" : ""}</Typography>
          </Grid>
          <Grid item xs={6}>
            <label
              style={{
                border: "1px solid white",
                borderRadius: 5,
                color: "white",
                fontSize: 15,
              }}
            >
              <input type={"file"} onChange={handleChange("profileImage")} />
              <label>{values?.profileImage}</label>
            </label>
            <Typography>{errors.profileImage ? "Add Image" : ""}</Typography>
          </Grid>
          {/* <Grid item xs={6}>
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
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="Native Place"
              label=" nativePlace"
              {...register("nativePlace", { maxLength: 50 })}
              error={!!errors?.nativePlace}
              value={values?.nativePlace}
              onChange={handleChange("nativePlace")}
            />
            <Typography>
              {errors?.nativePlace ? "Length should be max 50" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              type="number"
              required
              id="salary"
              label="salary"
              {...register("salary", {
                valueAsNumber: true,
                validate: { positive: (value) => value >= 0 },
              })}
              error={!!errors?.salary}
              value={values?.salary}
              onChange={handleChange("salary")}
            />
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
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
export default EditProfileModel;
