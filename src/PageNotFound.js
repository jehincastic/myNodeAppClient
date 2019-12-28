import React from 'react';
import './PageNotFound.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className="notFound page">
			<h1 className="text404">404</h1>
            <Link className="button404" to="/">
				<Button variant="contained" color="primary">
					Go Home
				</Button>
			</Link>
		</div>
	);
};

export default PageNotFound;
