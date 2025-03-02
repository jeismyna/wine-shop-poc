import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./Login.module.css";
import { useFormik, Formik, Form } from "formik";
import * as yup from "yup";
import InputField from "../../components/signup/InputField";
import api from "../../api/api";

// snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//----

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      marginTop: theme.spacing(1),
    },
  },
}));


//form
const loginFormModel = {
  formId: "loginForm",
  formField: {
    username: {
      name: "username",
      label: "Username*",
      requiredErrorMsg: "Username is required",
    },
    password: {
      name: "password",
      label: "Password*",
      requiredErrorMsg: "Password is required",
    },
  },
};
const { formId, formField } = loginFormModel;

const validationSchema = [
  yup.object().shape({
    [loginFormModel.formField.username.name]: yup
      .string("Enter username")
      .required(`${loginFormModel.formField.username.requiredErrorMsg}`),
    [loginFormModel.formField.password.name]: yup
      .string("Enter password")
      .required(`${loginFormModel.formField.password.requiredErrorMsg}`),
  }),
];

function UserCredentialsForm(props) {
  const {
    formField: { username, password },
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={5}>
          <InputField name={username.name} label={username.label} fullWidth/>
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={5}>
          <InputField name={password.name} label={password.label} fullWidth/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

//----

export default function Login(props) {

  // snackbar
  const [open, setOpen] = React.useState(props.location.state ? true : false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  
  //----

  //form
  const classes = useStyles();
  const currentValidationSchema = validationSchema[0];

  const formik = useFormik({
    initialValues: {
      [loginFormModel.formField.username.name]: "",
      [loginFormModel.formField.password.name]: "",
    },
  });

  async function _submitForm(values, actions) {
    await api
      .getUserByUsernameAndPassword(values.username, values.password)
      .then((res) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", res.data.data.firstName);
        console.log("User found");
        props.doSignup(res.data.data);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log("User not found " + error);
        actions.setSubmitting(false);
      });
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }

  //----

  return (
    <Container>
      <Col md={12} className={styles.offset}>
        <h1 className="mb-5">Login</h1>
        <Row className={classes.root}>
          <Col md={12} className={styles.verticalCenter}>
          <div className={styles.form}>
            { props.auth.isLoggedIn ? (
              <Redirect
                to={{
                  pathname: "/shopping",
                }}
              />
            ) : (
              <Formik
                initialValues={formik.initialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    <UserCredentialsForm formField={formField} />
                    <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item xs={5} sm={5} className={styles.formButtons}>
                      <Button
                        className="my-4"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
              )}
            </div>
          </Col>
          </Row>
          <Row>
          <Col md={5} className={styles.verticalCenter}>
            or
          </Col>
          </Row>

          <Row>
          <Col md={5} className={styles.verticalCenter}>
            <RouterLink to="/signup" className={styles.linkDecoration}>
              <Button
                className="m-4"
                type="submit"
                variant="outlined"
                color="primary"
              >
                Sign up
              </Button>
            </RouterLink>
          </Col>
        </Row>
      </Col>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {props.location.state ? props.location.state.message : ""}
        </Alert>
      </Snackbar>
    </Container>
  );
}
