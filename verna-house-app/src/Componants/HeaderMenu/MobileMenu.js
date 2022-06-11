import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
// import ButtonBase from '@mui/material/ButtonBase';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';

const MobileMenu = (props) => {
  const isMobileMenuOpen = Boolean(props.mobileMoreAnchorEl);
  return (
    <Menu
      sx={{
        width: "auto",
        height: "auto",
        background: "linear-gradient(45deg, #575758  25%, #2F3031 80%)",
      }}
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={props.mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={props.onClose}
    >
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <Typography
          component="span"
          variant="button"
          onClick={props.aboutHandler}
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          About Us
        </Typography>
      </MenuItem>
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <Typography
          component="span"
          variant="button"
          onClick={props.loginHandler}
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          Login
        </Typography>
      </MenuItem>
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography
          component="span"
          variant="button"
          // onClick={props.loginHandler}
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          Messages
        </Typography>
      </MenuItem>
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
          <h6>Notifications</h6>
        </IconButton>
      </MenuItem>
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of currunt user"
          aria-haspopup="true"
          aria-controls={props.mobileMenuId}
          // onClick={props.onOpen}
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          <AccountCircle />
          <h6>Profile</h6>
        </IconButton>
      </MenuItem>
      <MenuItem
        sx={{
          height: 20,
          background: "linear-gradient(45deg, #FFE3E3 25%, #F3C5C5 80%)",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of currunt user"
          aria-haspopup="true"
          aria-controls={props.mobileMenuId}
          onClick={props.onOpen}
          sx={{ color: "black", "&:hover": { color: "#EC255A" } }}
        >
          <AccountCircle />
          <h6>Account</h6>
        </IconButton>
      </MenuItem>
    </Menu>
  );
};
export default MobileMenu;
