import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { INPUT_CHANGED } from "../../actions/actions";
import Api from "../../api/signup";

import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, TextField } from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const styles = {
  container: {
    minHeight: "calc(100vh - 64px - 28px)"
  },
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    backgroundColor: "#ddd"
  },

  icon: {
    fontSize: "12rem"
  },

  form: {
    width: "90%",
    margin: "0 auto"
  },

  button: {
    marginTop: 20,
    width: "50%",
    height: "3.5rem",
    fontSize: "1.5rem"
  },

  signin: {
    marginTop: 20,
    width: "60%",
    fontSize: "0.7rem",
    marginBottom: 20
  },

  link: {
    textDecoration: "none"
  }
};

class SignUp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        className={classes.container}
        alignItems="center"
      >
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Paper className={classes.paper}>
            <AccountBoxIcon color="primary" className={classes.icon} />

            <Typography
              variant="title"
              align="center"
              gutterBottom
              style={{ fontSize: "2.5rem" }}
            >
              SIGN UP
            </Typography>

            <form
              className={classes.form}
              onSubmit={e =>
                this.props.handleSubmit(
                  e,
                  this.props.username,
                  this.props.organization,
                  this.props.email,
                  this.props.password
                )
              }
            >
              <TextField
                label="Username"
                name="username"
                value={this.props.name}
                onChange={this.props.inputChanged}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Organization"
                name="organization"
                value={this.props.organization}
                onChange={this.props.inputChanged}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={this.props.email}
                onChange={this.props.inputChanged}
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                value={this.props.password}
                onChange={this.props.inputChanged}
                type="password"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Confirm password"
                name="confirmPassword"
                onChange={this.props.inputChanged}
                type="password"
                margin="normal"
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Sign Up
              </Button>
            </form>
            <Link to="/signin" className={classes.link}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.signin}
              >
                Already registered
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    organization: state.organization,
    email: state.email,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inputChanged: e => {
      const action = {
        type: INPUT_CHANGED,
        name: e.target.name,
        value: e.target.value
      };
      dispatch(action);
    },
    handleSubmit: (e, _username, _organization, _email, _password) => {
      e.preventDefault();
      Api.signUp(dispatch, _username, _organization, _email, _password);
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
