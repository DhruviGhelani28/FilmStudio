import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root4: {
    background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
    "&:hover": {
      color: "#EC255A",
    },
  },
});
const RenderMenu = (props) => {
  const classes1 = useStyles();
  const navigate = useNavigate();
  const isMenuOpen = Boolean(props.anchorEl);
  const data = JSON.parse(localStorage.getItem("userInfo"));

  // const [anchorEl, setAnchorEl] = React.useState(props.anchorEl)
  const accountHandler = () => {
    props.setAnchorEl(null);
    navigate("/Account/MyTasks");
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={props.menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClose} className={classes1.root4} sx={{ color: "#bdbdbd" }}>
        Profile
      </MenuItem>
      <MenuItem onClick={accountHandler} className={classes1.root4} sx={{ color: "#bdbdbd" }}>
        My Account
      </MenuItem>
    </Menu>
  );
};
export default RenderMenu;
