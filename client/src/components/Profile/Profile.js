// React
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import Api from "../../api/delete";

// Material UI

import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

//---------------- Material UI custom styles

const styles = {
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    backgroundColor: "#ddd"
  },

  icon: {
    fontSize: "8rem"
  },

  title: {
    fontSize: "3rem",
    minHeight: "3rem"
  },

  bodyText: {
    minHeight: "15rem",
    fontSize: "1.4rem",
    padding: "0 1rem"
  },

  button: {
    marginTop: 20,
    width: "50%",
    height: "3rem",
    fontSize: "1.5rem",
    marginBottom: 20
  }
};

class Profile extends Component {
  // Delete account confirmation dialog
  state = {
    dialogOpen: false
  };

  // Set state with decoded JWT token data
  componentWillMount = () => {
    // Decode user information
    const decoded = jwt_decode(localStorage.token);
    const { userId, username, email, organization } = decoded;
    const created = decoded.created.split("T")[0];

    this.setState({
      userId,
      username,
      email,
      organization,
      created
    });
  };

  // Delete account confirmation dialog
  handleDialogOpen = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        style={{ minHeight: "calc(100vh - 64px - 28px)" }}
        alignItems="center"
      >
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Paper className={classes.paper}>
            {/* Account icon */}

            <AccountBoxIcon color="primary" className={classes.icon} />

            {/* Account heading */}

            <Typography
              variant="title"
              align="center"
              className={classes.title}
              gutterBottom
            >
              Profile
            </Typography>

            {/* Account details */}

            <Typography
              variant="body1"
              align="left"
              className={classes.bodyText}
              gutterBottom
            >
              ID: {this.state.userId}
              <br />
              Username: {this.state.username}
              <br />
              Organization: {this.state.organization}
              <br />
              Email: {this.state.email}
              <br />
              Created: {this.state.created}
              <br />
              <br />
              To sign out click account icon in the top right corner.
            </Typography>

            {/* Delete account icon */}

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleDialogOpen}
            >
              <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                {/* Dialog title */}

                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this account?"}
                </DialogTitle>
                <DialogActions>
                  {/* Agree button */}

                  <Button
                    onClick={() =>
                      this.props.handleClick(
                        this.state.userId,
                        this.props.history
                      )
                    }
                    color="primary"
                    autoFocus
                  >
                    Agree
                  </Button>

                  {/* Disagree button */}

                  <Button onClick={this.handleDialogOpen} color="primary">
                    Disagree
                  </Button>
                </DialogActions>
              </Dialog>
              Delete account
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = _dispatch => {
  return {
    handleClick: (_userId, _history) => {
      Api.deleteUser(_dispatch, _userId, _history);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
