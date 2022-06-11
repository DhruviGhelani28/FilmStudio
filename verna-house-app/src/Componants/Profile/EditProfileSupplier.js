import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSupplier } from "../../Store/Supplier/SupplierAction";
import { Card, Grid, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";
import classes from "../Login.module.css";
import { editSupplier } from "../../Store/Supplier/SupplierAction";
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
const EditProfileSupplier = (props) => {
  const classes1 = useStyles();
  const dispatch = useDispatch();
  const supplierId = props.supplierId;
  console.log(supplierId);
  const supplier = useSelector((state) => state.supplier);

  useEffect(() => {
    dispatch(getSupplier({ id: supplierId }));
  }, [dispatch]);

  console.log(supplier.getSupplier);
  // const [isError, setIsError] = React.useState(true);
  const [values, setValues] = React.useState({
    fullname: "",
    email: "",
    username: "",
    mobileNo: "",
    organizationName: "",
    organizationAddress: "",
    profileImage: ``,
    location: "",
    socialWebsite: "",
  });

  useEffect(() => {
    setValues({
      fullname: supplier.getSupplier?.name,
      email: supplier.getSupplier?.email,
      username: supplier.getSupplier?.username,
      mobileNo: supplier.getSupplier?.mobileNo,
      organizationName: supplier.getSupplier?.organisationName,
      organizationAddress: supplier.getSupplier?.organisationAddress,
      profileImage: `${supplier.getSupplier?.profile_image}`,
      location: supplier.getSupplier?.location,
      socialWebsite: supplier.getSupplier?.social_website,
    });
  }, [supplier]);

  console.log(values);
  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "profileImage") {
      console.log(event.target.files);
      // let path = { window.location.origin + `./${event.target.files[0].name}` }
      // console.log(path)
      setValues({ ...values, profileImage: event.target.files[0] });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    // e.preventDefault();
    console.log(values);
    dispatch(editSupplier({ values: values }, supplierId));
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
          </Grid>
          <Typography>{errors.email ? "Invalid Email Address" : ""}</Typography>
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
          {/* <Grid item xs={6}>
            <MuiPhoneNumber
              defaultCountry={"us"}
              {...register("mobileNo", { length: 10 })}
              error={errors?.mobileNo}
              value={values?.mobileNo}
              onChange={handleChange("mobileNo")}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="organisationName"
              label="Organisation Name"
              placeholder="xyz abc"
              {...register("organizationName", {
                maxLength: 20,
              })}
              error={!!errors?.organizationName}
              value={values?.organizationName}
              onChange={handleChange("organizationName")}
            />
            <Typography>
              {errors.organizationName ? "Max length 20" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="organisationAddress"
              label="Organisation Address"
              placeholder="xyz abc"
              {...register("organizationAddress", {
                maxLength: 60,
              })}
              error={!!errors?.organizationAddress}
              value={values?.organizationAddress}
              onChange={handleChange("organizationAddress")}
            />
            <Typography>
              {errors.organizationAddress ? "Max length 100" : ""}
            </Typography>
          </Grid>
          <Grid item xs={10}>
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
          <Grid item xs={6}>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              required
              id="location"
              label="Location"
              placeholder="xyz"
              {...register("location", {
                maxLength: 80,
              })}
              error={errors.location}
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
              id="social-website"
              label="Social Website"
              placeholder="http://xyz.com"
              {...register("socialWebsite")}
              error={errors?.socialWebsite}
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
    </>
  );
};
export default EditProfileSupplier;
