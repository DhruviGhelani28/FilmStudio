import React from "react";
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
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getRegisterData } from "../../Store/Register/RegisterAction";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
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

const ModelForm = () => {
  const state = useLocation().state;
  const dispatch = useDispatch();
  // console.log(state)

  const classes1 = useStyles();
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate("/Registration");
  };
  const [values, setValues] = React.useState({
    mobileNo: "",
    address: "",
    background: "",
    profileImage: "",
    nativePlace: "",
    salary: "",
  });

  const handleChange = (prop) => (event) => {
    console.log(prop);
    // if (prop !== "picture") {
    // console.log(event.target.files[0])
    setValues({ ...values, [prop]: event.target.value });
    if (prop == "profileImage") {
      console.log(event.target.files[0]);
      setValues({ ...values, profileImage: event.target.files[0].name });
    }
    // setValues({ ...values, [prop]: event.target.value });
  };
  // const onFileHandler = (event) => {
  //     setValues({ ...values, profileImage: event.target.files[0].name });
  // }
  // const handleChange = (prop) => (event) => {
  //     console.log(event.target.files[0])
  //     setValues({ ...values, [prop]: event.target.files[0] });
  // }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // const data1 = a.push(data)
    // data.profileImage = event.ta
    console.log(values);
    const data1 = { ...state, ...values };
    // console.log(JSON.stringify(data, null, 2));
    // console.log(values, typeof(values))
    // console.log(data1)
    dispatch(getRegisterData({ data: data1 }));
    console.log("user registered model created");
    navigate("/Login");
  };
  console.log(register);
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
            Model Profile
          </Typography>

          <Grid container component="div" spacing={0}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                inputprops={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="mobileNo"
                label="Mobile No."
                placeholder="1234567892"
                {...register("mobileNo", { required: true, maxLength: 10 })}
                error={!!errors?.mobileNo}
                value={values?.mobileNo}
                onChange={handleChange("mobileNo")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="address"
                label="Address"
                {...register("address", { required: true, maxLength: 200 })}
                error={!!errors?.address}
                value={values?.address}
                onChange={handleChange("address")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // ref={register}
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="background"
                label="Background History"
                {...register("background", { required: true, maxLength: 2000 })}
                error={!!errors?.background}
                value={values?.background}
                onChange={handleChange("background")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="profileImage"
                label="Profile Image"
                type="file"
                accept="image/png image/jpeg"
                // value={value}
                // onChange={(e) => setValues((prevStatus) => { return { ...prevStatus, profileImage: e.target.files[0] } })}
                // inputlabelprops={{
                //     shrink: true,
                // }}

                // ref={register}
                {...register("profileImage", { required: true })}
                error={!!errors?.profileImage}
                value={values?.profileImage}
                onChange={handleChange("profileImage")}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="nativePlace"
                label="Native Place"
                {...register("nativePlace", { required: true, maxLength: 50 })}
                error={!!errors?.nativePlace}
                value={values?.nativePlace}
                onChange={handleChange("nativePlace")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                className={classes1.allfield}
                sx={{ marginTop: 1 }}
                id="salary"
                label="Salary"
                error={!!errors?.salary}
                helpertext={
                  errors?.salary ? "Only Admin can add salary of model." : null
                }
                onChange={handleChange("salary")}
              />
            </Grid>
            <Grid item xs={12} className={classes.button}>
              <Button
                variant="contained"
                className={classes1.root4}
                onClick={handleSubmit(onSubmit)}
                sx={{
                  marginTop: 0.5,
                  marginRight: -34,
                  color: "black",
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

export default ModelForm;
