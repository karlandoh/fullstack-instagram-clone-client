import React from 'react';

import { Grid, CircularProgress } from '@mui/material';

import { useSelector } from 'react-redux';

import Post from './Post/Post';

import useStyles from './styles';

const Posts = () => {

    const classes = useStyles();
    
    const posts = useSelector((state) => state.posts); //It fetches it locally!!!
    

    const currentId = useSelector((state) => state.currentid);


    console.log("TEST 2 (Local Posts)");
    console.log(posts);
    console.log(currentId);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} />
                        </Grid>
                    ))
                }
            </Grid>
        )

    )
}

export default Posts;