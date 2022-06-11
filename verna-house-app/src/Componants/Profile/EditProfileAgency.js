import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { editAgency, getAgency } from "../../Store/Agency/AgencyAction";
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
const EditProfileAgency = (props) => {
  const classes1 = useStyles();
  const dispatch = useDispatch();
  const agencyId = props.agencyId;
  console.log(agencyId);
  const agency = useSelector((state) => state.agency);

  useEffect(() => {
    dispatch(getAgency({ id: agencyId }));
  }, [dispatch]);

  console.log(agency.getAgency);

  const [values, setValues] = React.useState({
    fullname: "",
    email: "",
    username: "",
    mobileNo: "",
    agencyName: "",
    agencyAddress: "",
    profileImage: "",
    location: "",
    socialWebsite: "",
  });

  useEffect(() => {
    setValues({
      fullname: agency.getAgency?.name,
      email: agency.getAgency?.email,
      username: agency.getAgency?.username,
      mobileNo: agency.getAgency?.mobileNo,
      agencyName: agency.getAgency?.agencyName,
      agencyAddress: agency.getAgency?.agencyAddress,
      profileImage: `${agency.getAgency?.profile_image}`,
      location: agency.getAgency?.location,
      socialWebsite: agency.getAgency?.social_website,
    });
  }, [agency]);

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
    dispatch(editAgency({ values: values }, agencyId));
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
              error={errors?.fullname}
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
              error={errors?.email}
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
              error={errors?.username}
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
              id="agencyName"
              label="Agency Name"
              placeholder="xyz abc"
              {...register("agencyName", { maxLength: 20 })}
              error={errors?.agencyName}
              value={values?.agencyName}
              onChange={handleChange("agencyName")}
            />
            <Typography>{errors.agencyName ? "Max length 20" : ""}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="agencyAddress"
              label="Agency Address"
              placeholder="xyz abc"
              {...register("agencyAddress", { maxLength: 100 })}
              error={!!errors?.agencyAddress}
              value={values?.agencyAddress}
              onChange={handleChange("agencyAddress")}
            />
            <Typography>
              {errors.agencyAddress ? "Max length 100" : ""}
            </Typography>
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
              <input type={"file"} onChange={handleChange("profileImage")} />
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
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="social_website"
              label="Social Website"
              placeholder="http://xyz.com"
              {...register("socialWebsite", { required: true })}
              error={!!errors?.socialWebsite}
              value={values?.socialWebsite}
              onChange={handleChange("socialWebsite")}
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
export default EditProfileAgency;
