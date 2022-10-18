import React, { useState } from 'react';

import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';

import { useGoogleLogin } from "@react-oauth/google";

import Icon from './icon';

import useStyles from './styles';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


import { useDispatch } from 'react-redux';

import Input from './Input';

import axios from 'axios';


import { authenticate , signup, signin } from "../../redux/actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};


const Auth = () => {
    const state = null;

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const use_dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => { 
        
        e.preventDefault();
        
        setFormData({...formData, name: `${formData.firstName} ${formData.lastName}`});
        
        if(isSignup){
            use_dispatch(signup(formData,navigate));
        }
        else{
            use_dispatch(signin(formData,navigate));
        }

        
    
    };

    const handleChange = (e) => { 
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
    };

    


    const googleSuccess = async (res) => {

        await use_dispatch(authenticate(res));

        navigate("/");

    };

    const googleFailure = async (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later.")
    };

    const login = useGoogleLogin({
            flow: 'auth-code',
			onSuccess: googleSuccess,
			onError: googleFailure,
            scope: "openid"
		});

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>

                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )

                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }

                    </Grid>
                        
                    <Button className={classes.googleButton} color='primary' fullWidth startIcon={<Icon/>} variant="contained" onClick={()=> login()}>Google Sign In</Button>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignup ? 'Sign Up' : 'Sign In'
                        }
                    </Button> 
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up."
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;