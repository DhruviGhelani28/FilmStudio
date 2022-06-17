import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Grid } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import GarmentForm from "./GarmentForm";
import {
  getMyGarments,
  deleteGarment,
} from "../../Store/Garment/GarmentAction";

const useStyles = makeStyles({
  root: {
    margin: 0.5,
    paddingTop: 45,
  },
  root1: {
    marginTop: 5,
  },
});
const Garments = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const mygarments = useSelector((state) => state.garments);
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [garmentData, setGarmentData] = React.useState({});
  const [garments, setGarments] = useState([]);
  const data = JSON.parse(localStorage.getItem("userInfo"));

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };
  const handleOpen = () => {
    console.log("form open");
    setOpen(true);
  };
  const handleOpen1 = () => {
    console.log("form open");
    setOpen1(true);
  };

  console.log(mygarments.getMyGarments);
  useEffect(() => {
    dispatch(getMyGarments());
  }, [dispatch, reload]);

  useEffect(() => {
    setGarments(mygarments.getMyGarments);
  }, [mygarments.getMyGarments, reload]);

  console.log(garments);

  const editHandler = (value) => {
    handleOpen1();
    console.log("id:--", value.id);
    setGarmentData(value);
  };
  const deleteHandler = (value) => {
    dispatch(deleteGarment(value.id));
    setReload(true);
  };

  return (
    <React.Fragment>
      <h2>Garments</h2>
      <Grid sx={{ flexGrow: 1 }} container spacing={{ xs: 0, md: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            {data["role"] == "Supplier" && (
              <>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  sx={{ marginTop: 0.3, marginRight: 2 }}
                  onClick={handleOpen}
                >
                  <AddIcon />
                </Fab>
                <Backdrop
                  sx={{
                    color: "#fff",
                    height: "100vh",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <GarmentForm
                    onClick={handleClose}
                    open={open}
                    setReload={setReload}
                  ></GarmentForm>
                </Backdrop>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={1}
        sx={{ marginTop: 0.5 }}
      >
        {garments &&
          garments.map((value, index) => (
            <Grid item xs={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderColor: "#121212",
                  borderWidth: 0.1,
                  borderRadius: 2,
                  maxHeight: 550,
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image={`http://127.0.0.1:8000${value.garmentImage}`}
                />
                <CardContent sx={{ paddingBottom: 0 }}>
                  <Typography variant="h6" component="div" color="text.primary">
                    {value.garmentName}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: {value.price} Rupees
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    align="left"
                  >
                    OrderStatus: {value.orderStatus.name}
                  </Typography>
                  <Typography color="text.primary" sx={{ fontSize: 14 }}>
                    TimeDuration:{" "}
                    {value.timeDuration ? value.timeDuration : "Not Given"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginTop: 0,
                    marginBottom: 0,
                    justifyContent: "flex-end",
                    paddingBottom: 0.3,
                  }}
                >
                  {data["role"] == "Admin" && (
                    <Button size="small" varient="">
                      Give Order
                    </Button>
                  )}
                  {data["role"] == "Supplier" && (
                    <>
                      <EditIcon onClick={() => editHandler(value)} />
                      <DeleteIcon onClick={() => deleteHandler(value)}>
                        {" "}
                      </DeleteIcon>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        {garmentData && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open1}
          >
            <GarmentForm
              onClick={handleClose}
              open={open1}
              garmentData={garmentData}
              setReload={setReload}
              modal_type="Edit"
            ></GarmentForm>
          </Backdrop>
        )}
      </Grid>
    </React.Fragment>
  );
};
export default Garments;
