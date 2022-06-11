import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "../Login.module.css";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TaskForm from "./TaskForm";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getMyTasks as MyTasks, addTask } from "../../Store/Task/TaskAction";
import { createTheme } from "@mui/material";

// const theme = createTheme({
//     components: {
//         // Name of the component
//          MuiButton:{
//             sizeSmall: ,
//             iconSizeSmall : ,
//         },
//     },
// });

const Tasks = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.tasks);
  const { getMyTasks } = myTasks;
  const task = useSelector((state) => state.addTask);
  const { loading, success, addTask } = task;
  const [tasks, setTasks] = useState([]);
  const data = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    dispatch(MyTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasks(myTasks.getMyTasks);
  }, [myTasks.getMyTasks, task]);
  console.log(tasks);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  // useEffect(() => {
  //     const body = document.querySelector("body");
  //     body.style.overflow = open ? "hidden" : "auto";
  // }, [open])
  return (
    <React.Fragment>
      <Grid sx={{ flexGrow: 1 }} container spacing={{ xs: 0, md: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              sx={{ marginTop: 0.3 }}
              onClick={handleToggle}
            >
              <AddIcon />
            </Fab>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <TaskForm onClick={handleClose} open={open}></TaskForm>
            </Backdrop>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={2}
          >
            {tasks &&
              tasks.map((value, index) => (
                <Grid key={value.id} item xs={3}>
                  <Paper
                    sx={{
                      maxHeight: 400,
                      maxWidth: 300,
                      padding: 0.5,
                    }}
                  >
                    <Grid container direction={"row"} spacing={0}>
                      <Grid item xs={8}>
                        <Typography
                          sx={{ fontSize: 15 }}
                          color="text.primary"
                          align="left"
                        >
                          Task Name: {value.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} align="right">
                        <Fab
                          color="secondary"
                          aria-label="edit"
                          size="small"
                          sx={{ marginLeft: 0.3 }}
                        >
                          <EditIcon />
                        </Fab>
                        <Fab
                          color="secondary"
                          aria-label="delete"
                          size="small"
                          sx={{ marginLeft: 0.3 }}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Grid>
                    </Grid>
                    <Grid container direction={"row"}>
                      <Grid item xs={12}>
                        <div className={classes.root1}>
                          <Typography
                            sx={{ fontSize: 14, mb: 0.5 }}
                            color="text.primary"
                            align="left"
                          >
                            Description:{" "}
                            {value.description ??
                              (value.description ? value.description : " ")}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 14, mb: 0.5 }}
                            color="text.primary"
                          >
                            Date: {value.date ?? (value.date ? value.date : "")}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 14, mb: 0.5 }}
                            color="text.primary"
                          >
                            Time: {value.time ?? (value.time ? value.time : "")}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Tasks;
