import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styles from "./Signup.module.css";
import { useFormik, useFormikContext, Formik, Form } from "formik";
import * as yup from "yup";
import InputField from "../../components/signup/InputField";
import api from "../../api/api";

//stepper
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      marginTop: theme.spacing(1),
    },
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps = ["What's your name?", "How can we be in touch?", "Almost there"];

//----

//form
const signupFormModel = {
  formId: "signupForm",
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
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required",
      invalidErrorMsg: "Only english letters are allowed",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required",
      invalidErrorMsg: "Only english letters are allowed",
    },
    phone: {
      name: "phone",
      label: "Phone number*",
      requiredErrorMsg: "Phone number is required",
      invalidErrorMsg: "Phone number is not valid",
    },
    address: {
      name: "address",
      label: "Address*",
      requiredErrorMsg: "Address is required",
    },
  },
};
const { formId, formField } = signupFormModel;

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <UserDetailsForm formField={formField} />;
    case 1:
      return <UserContactForm formField={formField} />;
    case 2:
      return <Summary />;
    default:
      return;
  }
}

const phoneNumRegEx = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
const lettersRegEx = /^(?:[A-Za-z]+|)$/;

const validationSchema = [
  yup.object().shape({
    [signupFormModel.formField.username.name]: yup
      .string("Enter username")
      .required(`${signupFormModel.formField.username.requiredErrorMsg}`),
    [signupFormModel.formField.password.name]: yup
      .string("Enter password")
      .required(`${signupFormModel.formField.password.requiredErrorMsg}`),
    [signupFormModel.formField.firstName.name]: yup
      .string("Enter your first name")
      .required(`${signupFormModel.formField.firstName.requiredErrorMsg}`)
      .matches(
        lettersRegEx,
        signupFormModel.formField.firstName.invalidErrorMsg
      ),
    [signupFormModel.formField.lastName.name]: yup
      .string("Enter your last name")
      .required(`${signupFormModel.formField.lastName.requiredErrorMsg}`)
      .matches(
        lettersRegEx,
        signupFormModel.formField.lastName.invalidErrorMsg
      ),
  }),
  yup.object().shape({
    [signupFormModel.formField.phone.name]: yup
      .string("Enter your phone number")
      .required(`${signupFormModel.formField.phone.requiredErrorMsg}`)
      .matches(phoneNumRegEx, signupFormModel.formField.phone.invalidErrorMsg),
    [signupFormModel.formField.address.name]: yup
      .string("Enter your address")
      .required(`${signupFormModel.formField.address.requiredErrorMsg}`),
  }),
];

function UserDetailsForm(props) {
  const {
    formField: { username, password, firstName, lastName },
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={username.name} label={username.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={password.name} label={password.label} fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function UserContactForm(props) {
  const {
    formField: { phone, address },
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={address.name} label={address.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function Summary() {
  const { values: formValues } = useFormikContext();
  return (
    <React.Fragment>
      <Grid container spacing={3} className="mb-4">
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className={styles.textAlign}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Plese check your details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Username: <span className={styles.subtitle}>{formValues.username}</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>First name: <span className={styles.subtitle}>{formValues.firstName}</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Last name: <span className={styles.subtitle}>{formValues.lastName}</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Phone number: <span className={styles.subtitle}>{formValues.phone}</span></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Address: <span className={styles.subtitle}>{formValues.address}</span></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}

//----

export default function Signup(props) {
  //form
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = validationSchema[activeStep];

  const formik = useFormik({
    initialValues: {
      [signupFormModel.formField.username.name]: "",
      [signupFormModel.formField.password.name]: "",
      [signupFormModel.formField.firstName.name]: "",
      [signupFormModel.formField.lastName.name]: "",
      [signupFormModel.formField.phone.name]: "",
      [signupFormModel.formField.address.name]: "",
    },
  });

  async function _submitForm(values, actions) {
    await api.createUser(values).then((res) => {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", values.firstName);

      window.alert(`User created successfully`);  
      props.doSignup(values);
    })
    .catch((error) => {
      window.alert(`Cant create user`);
    });

    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  //----

  return (
    <Container>
      <Col md={12} className={styles.offset}>
        <h1 className="mb-5">Sign Up</h1>

        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={styles.form}>
            {activeStep === steps.length ? (
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
                    {getStepContent(activeStep)}

                    <div className={styles.formButtons}>
                      {activeStep !== 0 && (
                        <Button className="m-2" onClick={_handleBack}>
                          Back
                        </Button>
                      )}

                      <Button
                        className="m-2"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {isLastStep ? "Submit" : "Next"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </Col>
    </Container>
  );
}
