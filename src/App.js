import './App.css';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import Login from "./Login";
import Nav from "./Nav";
import { MuiThemeProvider } from '@material-ui/core';
import axios from "axios";
import Theme from '../src/Theme';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			role: '',
			id: '',
			name: '',
			email: ''
		};
	}

	componentDidMount() {
		this.loginStateChange().then(data => {
			this.loginCheck();
		})
	}

	getCookie = name => {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length === 2) {
			return parts.pop().split(";").shift();
		}
	}
	  
	deleteCookie = (name, type) => {
		return new Promise((resolve, reject) => {
			if (type === 'FORCED') {
				document.cookie = name + "=;";
				resolve(true);
			} else {
				document.cookie = name + "=;";
				this.props.history.push('/login');
				resolve(true);
			}
		})
	}

	loginCheck = () => {
		const path = document.location.pathname.replace(/^\/+|\/+$/g, '');
		if (!this.state.loggedIn) {
			if (path === 'login' || path === 'register' || path === '') {
				this.props.history.push(document.location.pathname);
			} else {
				if (!localStorage.hasOwnProperty("popupMsg")) {
					localStorage.setItem("popupMsg", "Please Login To Continue");
				}
				this.props.history.push('/login');
			}
		} else {
			if (path === 'login' || path === 'register' || path === '') {
				this.props.history.push('/dashboard');
			} else {
				this.props.history.push(document.location.pathname);
			}
		}
	}

	loginStateChange = (user) => {
		return new Promise((resolve, reject) => {
			debugger
			if (user) {
				const path = document.location.pathname.replace(/^\/+|\/+$/g, '');
				document.cookie = `sessionId=${user.sessionId};`;
				this.setState(
					{
						loggedIn: true,
						id: user._id,
						name: user.name,
						email: user.email,
						role: user.role
					},
					() => {
						if (path === 'login' || path === 'register' || path === '') {
							resolve('/dashboard');
						} else {
							resolve(document.location.pathname);
						}
					}
				);
			} else {
				const sessionId = this.getCookie('sessionId');
				if (sessionId) {
					if (this.state.loggedIn) {
						resolve(true);
					} else {
						axios
							.post("/api/fetchUserInfo")
							.then(res => res.data)
							.then(data => {
								if (data.status === "FAILED") {
									if (data.message === "Session Expired") {
										localStorage.setItem("popupMsg", "Session Expired Please Login Again");
										this.deleteCookie('sessionId', 'FORCED').then(data => {
											resolve(true);
										})
									} else {
										localStorage.setItem("popupMsg", "Please Login To Continue");
										this.deleteCookie('sessionId', 'FORCED').then(data => {
											resolve(true);
										})
									}
								} else {
									let user = data.data;
									this.setState({
										loggedIn: true,
										id: user._id,
										name: user.name,
										email: user.email,
										role: user.role
									}, () => {
										resolve(true);
									})
								}
							})
							.catch(err => {
								console.log(err);
							})
					}
				} else {
					resolve(false);
				}
			}
		})		
	};
	
	handleLogOut = () => {
		sessionStorage.removeItem('user');
		this.setState(
			{
				loggedIn: false,
				id: '',
				name: '',
				email: ''
			},
			() => {
				this.props.history.push('/');
			}
		);
	};

	render() {
		const user = { ...this.state };
		return (
			<MuiThemeProvider theme={Theme}>
				<div className="App">
					<Switch>
						<Route
							exact
							path="/"
							render={defaultProps => (
								<Home user={user} loginCheck={this.loginCheck} loginFunc={this.loginStateChange} {...defaultProps} />
							)}
						/>
						<Route
							exact
							path='/login'
							render={defaultProps => (
								<Login user={user} loginCheck={this.loginCheck} loginFunc={this.loginStateChange} {...defaultProps} />
							)}
						/>
						<Route
							exact
							path='/dashboard'
							render={defaultProps => (
								<Nav user={user} loginCheck={this.loginCheck} loginFunc={this.loginStateChange} {...defaultProps} />
							)}
						/>
						<Route render={() => <PageNotFound />} />
					</Switch>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(App);
