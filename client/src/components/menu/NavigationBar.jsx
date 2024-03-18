import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as WineIcon } from "../../images/wine_logo.svg";
import { Link as RouterLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { Container, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function NavigationBar(rest) {
  const classes = useStyles();

  function handleReset() {
    localStorage.clear();
    rest.doReset();
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Container fluid>
        <Toolbar className={styles.toolbar}>
          <Col md={4} className={styles.textAlignStart}>
            <a target="_blank" rel="noreferrer" title="icon by iStar Design Bureau" href="https://www.iconfinder.com/iStar_Design_Bureau">
              <SvgIcon
                component={WineIcon}
                viewBox="0 0 80 80"
                className={styles.logo}
              />
            </a>
          </Col>
          <Col md={4}>
            <Typography variant="h6" noWrap>
              <RouterLink to="/" className={styles.linkDecoration}>
                Wine Online
              </RouterLink>
            </Typography>
          </Col>
          <Col md={4} className={styles.textAlignEnd}>
            {!rest.auth.isLoggedIn ? (
              <RouterLink to="/login" className={styles.linkDecoration}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={styles.buttons}
                >
                  Log In
                </Button>
              </RouterLink>
            ) : (
              <Col md={12} className={styles.greeting}>
                <Col md={10} className={styles.greetingMargin}>
                  <Typography variant="subtitle2">
                    Hello {rest.auth.firstName}
                  </Typography>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={styles.buttons}
                    component={RouterLink} to="/"
                    onClick={handleReset}
                  >
                    Sign Out
                  </Button>
                </Col>
              </Col>
            )}
          </Col>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
