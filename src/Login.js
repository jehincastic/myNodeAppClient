import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";

const styles = theme => createStyles({
    container: {
        marginTop: "20vh"
    },
    heading: {
		color: theme.palette.primary.main,
		margin: '0 auto',
		width: '100px',
        textAlign: 'center',
        marginTop: '40px'
    },
    form: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "30vh",
        justifyContent: "space-between",
        // eslint-disable-next-line
        ['@media (max-width: 800px)'] : {
            height: "25vh"
        }
    },
    emailField: {
        width: "30%",
        // eslint-disable-next-line
        ['@media (max-width: 500px)'] : {
            width: "60%"
        }
    },
    passwordField: {
        width: "30%",
        // eslint-disable-next-line
        ['@media (max-width: 500px)'] : {
            width: "60%"
        }
    },
    btn: {
        width: "80px",
        position: "relative",
        top: "20px",
        // eslint-disable-next-line
        ['@media (max-width: 500px)'] : {
            top: "30px"
        }
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            open: false,
            loading: false,
            errMsg: 'Could Not Log You In.'
        };
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty('popupMsg')) {
            this.setState({errMsg: localStorage.getItem('popupMsg'), open: true}, () => {
                localStorage.removeItem('popupMsg')
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ open: false });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true});
        const button = document.getElementById('login');
        const passwordField = document.getElementById('standard-password-input');
        const emailField = document.getElementById('standard-email');
        button.disabled = true;
        passwordField.disabled = true;
        emailField.disabled = true;
        const { email, password } = this.state;
        axios
            .post("/api/login", {
                email: email,
                password: password
            })
            .then(res => res.data)
            .then(response => {
                if (response.status === "FAILED") {
                    if(response.message === 'Email / Password Invalid') {
                        this.setState({errMsg: 'Email / Password Invalid'})
                    } else if (response.message === "Invalid Email Address") {
                        this.setState({errMsg: response.message})
                    } else {
                        this.setState({errMsg: 'Could Not Log You In.'})
                    }
                    button.disabled = false;
                    passwordField.disabled = false;
                    emailField.disabled = false;
                    this.setState({ open: true, loading: false });
                } else {
                    this.setState({
                        email: "",
                        password: "",
                        errMsg: 'Could Not Log You In.'
                    });
                    this.props.loginFunc(response.data).then(route => {
                        this.props.history.push(route);
                    })
                }
            })
            .catch(error => {
                this.setState({errMsg: 'Server Error Please Try Again Later.'});
                button.disabled = false;
                passwordField.disabled = false;
                emailField.disabled = false;
                this.setState({ open: true, loading: false });
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.loading ? <LinearProgress /> : ''}
                <div className={classes.container}>
                    <h1 className={classes.heading}>Login</h1>
                    <div className={classes.containerForm}>
                        <form onSubmit={this.handleSubmit} className={classes.form}>
                            <TextField
                                id="standard-email"
                                label="Email"
                                className={classes.emailField}
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoComplete="email"
                                type="email"
                                name="email"
                                margin="normal"
                                required
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                className={classes.passwordField}
                                type="password"
                                name="password"
                                autoComplete="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                margin="normal"
                                required
                            />
                            <Button
                                id='login'
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.btn + ' button-my-style'}
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        message={
                            <span id="message-id">
                                {this.state.errMsg}
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);