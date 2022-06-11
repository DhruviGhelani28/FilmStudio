import React from "react";

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

import { useLocation } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getRegisterData } from "../../Store/Register/RegisterAction";
// import { getCustomers } from '../../Store/Supplier/SupplierAction';
import { useForm } from "react-hook-form";
import UploadButton from "../UploadButton";
import { FormControl, OutlinedInput } from "@mui/material";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import userEvent from '@testing-library/user-event';
const useStyles = makeStyles({
  root1: {
    color: "#fff",
    "&:hover": {
      color: "#EC255A",
    },
  },
  root4: {
    background: "linear-gradient(45deg, #575758 25%, #2F3031 80%)",
    color: "action.home",
  },
  root5: {
    marginTop: 30,
  },
  allfield: {
    width: "40ch",
    marginTop: "10ch",
    background: "linear-gradient(45deg, #575758 25%, #2F3031  80%)",
    color: "action.home",
  },
});

const CustomerForm = (props) => {
  const state = useLocation().state;
  const dispatch = useDispatch();
  // console.log(state)

  const classes1 = useStyles();
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/Registration");
  };
  // const a = [state.fullname, state.username, state.email]

  const [values, setValues] = React.useState({
    mobileNo: "",
    companyName: "",
    companyAddress: "",
    profileImage: null,
    location: "",
    socialWebsite: "",
  });

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "profileImage") {
      setValues({ ...values, [prop]: event.target.files[0].name });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(values);
    const data1 = { ...state, ...values };

    dispatch(getRegisterData({ data: data1 }));
    console.log("user registered customer created");
    navigate("/Login");
  };

  return (
    <Container align="center">
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          maxHeight: 8000,
          background:
            "linear-gradient(45deg, #2F3031 30%, #575758 50%, #2F3031 30%,#575758 50%)",
          borderColor: "#fff",
          borderWidth: 1,
          borderRadius: 5,
          color: "action.home",
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
          <IconButton sx={{ marginLeft: 1 }} onClick={goBackHandler}>
            <ChevronLeftIcon className={classes1.root1} />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            fontSize="26px"
            className={classes.registration}
          >
            Customer Profile
          </Typography>

          <div className={classes1.root5}>
            <TextField
              disabled
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              multiline
              size="medium"
              id="role"
              label="Role"
              defaultValue={state.role}
            />
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="mobileNo"
              label="Mobile No."
              placeholder="1234567892"
              {...register("mobileNo", {
                required: true,
                minLength: 10,
                maxLength: 13,
              })}
              error={!!errors?.mobileNo}
              value={values?.mobileNo}
              onChange={handleChange("mobileNo")}
            />
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              id="companyName"
              label="Company Name"
              placeholder="xyz abc"
              {...register("companyName", { required: true, maxLength: 20 })}
              error={!!errors?.companyName}
              value={values?.companyName}
              onChange={handleChange("companyName")}
            />
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              id="companyAddress"
              label="Company Address"
              placeholder="xyz abc"
              {...register("companyAddress", {
                required: true,
                maxLength: 100,
              })}
              error={!!errors?.companyAddress}
              value={values.companyAddress}
              onChange={handleChange("companyAddress")}
            />

            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              id="profileImage"
              label="Profile Image"
              placeholder="Upload File"
              type="file"
              accept="image/*"
              {...register("profileImage", { required: true })}
              error={!!errors?.profileImage}
              value={values.profileImage}
              onChange={handleChange("profileImage")}
            ></TextField>
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              id="location"
              label="Location"
              placeholder="xyz"
              {...register("location", { required: true, maxLength: 100 })}
              error={!!errors?.location}
              value={values.location}
              onChange={handleChange("location")}
            />
            <TextField
              className={classes1.allfield}
              sx={{ marginTop: 1 }}
              multiline
              required
              size="medium"
              id="socialWebsite"
              label="Social Website"
              placeholder="http://xyz.com"
              {...register("socialWebsite", { required: false })}
              error={!!errors?.socialWebsite}
              value={values.socialWebsite}
              onChange={handleChange("socialWebsite")}
            />
            <div className={classes.button}>
              <Button
                variant="contained"
                className={classes1.root4}
                // onClick={handleSubmit(onSubmit)}
                sx={{
                  marginTop: 0.5,
                  marginRight: -34,
                  color: "black",
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
export default CustomerForm;

//  <TextField
//                             disabled
//                             id="customer-one-to-one"
//                             label="Customer"
//                         // defaultValue={username}
//                         />
//                         <TextField
//                             required
//                             multiline
//                             size='medium'
//                             id="first-name"
//                             label="Name"
//                             placeholder="xyz abc"
//                         />
//                         <TextField
//                             required
//                             multiline
//                             size='medium'
//                             id="email-id"
//                             label="Email Address"
//                             placeholder="xyz@abc.com"
//                         />
//                         <TextField
//                             required
//                             multiline
//                             size='medium'
//                             id="username"
//                             label="UserName"
//                             placeholder="xyz_abc123"
//                         />
