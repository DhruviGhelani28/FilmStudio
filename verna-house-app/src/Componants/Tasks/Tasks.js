import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import classes from "../Login.module.css";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import TaskForm from "./TaskForm";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getMyTasks as MyTasks, deleteTask } from "../../Store/Task/TaskAction";
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
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state?.tasks);
  const [taskDetail, setTaskDetail] = useState({});
  const [reload, setReload] = useState(false);

  const [tasks, setTasks] = useState([]);
  const data = JSON.parse(localStorage.getItem("userInfo"));

  // const { editTask } = eTask;
  useEffect(() => {
    dispatch(MyTasks());
  }, [dispatch, reload]);

  useEffect(() => {
    setTasks(myTasks.getMyTasks);
  }, [myTasks.getMyTasks, reload]);

  console.log(tasks);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const handleOpen = () => {
    setOpen1(true);
  };

  const editHandler = (task) => {
    // console.log(task);
    setTaskDetail(task);
    handleOpen();
  };
  const deleteHandler = (task) => {
    dispatch(deleteTask(task.id));
    setReload(true);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  }, [open]);
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
              color="#bdbdbd"
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
              <TaskForm
                onClick={handleClose}
                open={open}
                setReload={setReload}
              ></TaskForm>
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
                      height: 140,
                      maxWidth: 300,
                      padding: 0.5,
                      backgroundColor: "#bdbdbd",
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
                        <EditIcon onClick={() => editHandler(value)} />

                        <DeleteIcon onClick={() => deleteHandler(value)} />
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
            {taskDetail && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open1}
              >
                <TaskForm
                  onClick={handleClose1}
                  setReload={setReload}
                  taskData={taskDetail}
                  modal_type="Edit"
                ></TaskForm>
              </Backdrop>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Tasks;
