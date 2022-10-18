import React from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';

import useStyles from './styles';

import memories from '../../images/memories.png';

import { Link , useLocation , useNavigate } from 'react-router-dom';

import {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from "../../redux/actions/auth";

import { changeCurrentUser } from "../../redux/actions/currentuser";

import decode from 'jwt-decode';

const Navbar = () => {

    const classes = useStyles();

    const use_dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const both = useSelector((state) => {
        return {user: state.currentuser, id: state.currentid, auth: state.auth}
    })

    const user = both.user;
    const myid = both.id;
	const auth = both.auth;

    const log_out = () => {
        use_dispatch(logout());
        navigate('/');
        use_dispatch(changeCurrentUser(null));
    }

        
    useEffect (() => {
        const token = user?.token;

		if(token){
			const  decodedToken = decode(token);

			if(decodedToken.exp *1000 < new Date().getTime()){
				log_out();
			}
		}

        use_dispatch(changeCurrentUser(JSON.parse(localStorage.getItem('profile'))));
    } , [location]);
    

    return (
			<AppBar className={classes.AppBar} position="static" color="inherit">
				<p>Current User: {JSON.stringify(user)}</p>
				<h1>Current PostID: {JSON.stringify(myid)}</h1>
				<h2>Current LocalStorage: {JSON.stringify(auth)}</h2>

				<div className={classes.brandContainer}>
					<Typography
						component={Link}
						to="/"
						className={classes.heading}
						variant="h2"
						align="center"
					>
						Memories
					</Typography>
					<img
						className={classes.image}
						src={memories}
						alt="memories"
						height="60"
					/>
				</div>

				<Toolbar className={classes.toolbar}>
					{user ? (
						<div className={classes.profile}>
							<Avatar
								className={classes.purple}
								alt={user.result.name}
								src={user.result.imageUrl}
							>
								{user.result.name.charAt(0)}
							</Avatar>
							<Typography className={classes.userName} variant="h6">
								{user.result.name}
							</Typography>
							<Button
								variant="contained"
								className={classes.logout}
								color="secondary"
								onClick={log_out}
							>
								Logout
							</Button>
						</div>
					) : (
						<Button
							component={Link}
							to="/auth"
							variant="contained"
							color="primary"
						>
							Sign In
						</Button>
					)}
				</Toolbar>
			</AppBar>
		);
};

export default Navbar;