import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => createStyles({
    background: {
        color: theme.palette.primary.main
    },
    container: {
        fontWeight: 100,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        height: '80vh',
        display: 'flex',
        flexWrap: 'wrap'
    },
    main: {
        width: '100%',
        fontSize: '3rem',
        letterSpacing: '1rem',
        // eslint-disable-next-line
        ['@media (max-width: 500px)'] : {
            fontSize: '2.25rem',
            letterSpacing: '0.25rem'
        }
    },
    name: {
        marginTop: '-20px'
    },
    link: {
        width: '100%',
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)'
    }
});

class Home extends Component {
	constructor(props) {
        super(props);
        // let root = document.documentElement;
        // root.style.setProperty("--primary-color", "#000");
		this.state = {
			loaded: false
        };
    }
    
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.background + ' page'}>
				<div className={classes.container}>
					<p className={classes.main}>WELCOME TO</p>
					<p className={classes.main + ' ' + classes.name}>TASK TRACK</p>
					<div>
						<Link className={classes.link} to="/login">
							<Button className={classes.btn + ' button-my-style'} variant="contained" color="primary">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Home);
