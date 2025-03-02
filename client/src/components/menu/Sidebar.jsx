import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FeedbackIcon from "@material-ui/icons/Feedback";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useMediaQuery, useTheme } from "@material-ui/core";

function ListItemLink(props) {
  const { icon, primary, to, active, hidden } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <NavLink to={to} activeClassName={active} ref={ref} {...itemProps} />
      )),
    [to, active]
  );

  return (
    <li hidden={hidden} >
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.string,
  hidden: PropTypes.bool,
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('xs')]: {
      width: "100%"
    }
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export default function Sidebar({ auth }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root} hidden={!auth.isLoggedIn}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor={matches ? "bottom" : "left"}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!matches && <Toolbar />}
        <div className={classes.drawerContainer}>
          <List>
            <ListItemLink
              to="/login"
              primary="Log In / Sign Up"
              icon={<AccountCircleIcon />}
              active={styles.active}
              hidden={auth.isLoggedIn}
            />
            <ListItemLink
              to="/shopping"
              primary="Start shopping"
              icon={<ShoppingCartIcon />}
              active={styles.active}
              hidden={!auth.isLoggedIn}
            />
            <ListItemLink
              to="/feedback"
              primary="Feedback"
              icon={<FeedbackIcon />}
              active={styles.active}
              hidden={!auth.isLoggedIn}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
}
