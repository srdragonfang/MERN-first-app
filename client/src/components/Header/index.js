import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './styles';

export default function Header() {
	const classes = useStyles();

	return (
		<Typography variant='h4' align='center' className={classes.container}>
			Blog
		</Typography>
	);
}
