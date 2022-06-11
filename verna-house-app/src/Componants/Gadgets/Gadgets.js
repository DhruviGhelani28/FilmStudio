import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import GadgetForm from "./GadgetForm";
import { useDispatch, useSelector } from "react-redux";
import { getMyGadgets, deleteGadget } from "../../Store/Gadget/GadgetAction";

const useStyles = makeStyles({
  root: {
    margin: 0.5,
    paddingTop: 45,
  },
  root1: {
    marginTop: 5,
  },
});
const Gadgets = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mygadgets = useSelector((state) => state.gadgets);
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [id, setId] = React.useState("");
  const [gadgets, setGadgets] = useState([]);
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

  console.log(mygadgets.getMyGadgets);
  useEffect(() => {
    dispatch(getMyGadgets());
  }, [dispatch, reload]);

  useEffect(() => {
    setGadgets(mygadgets.getMyGadgets);
  }, [mygadgets.getMyGadgets, reload]);
  console.log(gadgets);

  const editHandler = (value) => {
    handleOpen1();
    console.log("id:--", value.id);
    setId(value.id);
  };
  const deleteHandler = (value) => {
    dispatch(deleteGadget(value.id));
    setReload(true);
  };

  return (
    <React.Fragment>
      <h2>Tools / Items</h2>

      <Grid sx={{ flexGrow: 1 }} container spacing={{ xs: 0, md: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            {data["role"] == "Agency" && (
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
                  <GadgetForm
                    onClick={handleClose}
                    open={open}
                    setReload={setReload}
                  ></GadgetForm>
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
        sx={{ marginTop: 0 }}
      >
        {gadgets &&
          gadgets.map((value, index) => (
            <Grid item xs={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderColor: "#121212",
                  borderWidth: 0.1,
                  borderRadius: 2,
                  maxHeight: 390,
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image={`http://127.0.0.1:8000${value.premiseImage}`}
                // "../..//static/PhotoPoster/contemplative-reptile.jpg"
                />
                <CardContent
                  sx={{ marginTop: 0, marginBottom: 0, paddingBottom: 0 }}
                >
                  <Typography variant="h6" component="div" color="text.primary" sx={{ fontSize: 16 }}>
                    {value.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: {value.price} Rupees
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    align="left"
                  >
                    OrderStatus: {value.orderStatus?.name}
                  </Typography>
                  <Typography color="text.primary">
                    TimeDuration:
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
                    <Button size="small">Give Order</Button>
                  )}
                  {data["role"] == "Agency" && (
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
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open1}
        >
          <GadgetForm
            onClick={handleClose}
            open={open1}
            gadgetId={id}
            setReload={setReload}
          />
        </Backdrop>
      </Grid>
    </React.Fragment>
  );
};
export default Gadgets;
