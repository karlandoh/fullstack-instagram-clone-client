import React from 'react';

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

import { useNavigate, useLocation } from 'react-router-dom';

import ChipInput from 'material-ui-chip-input';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { getPosts } from '../../redux/actions/posts';

import Pagination from '../Pagination/Pagination';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {

    const query = useQuery();
    const history = useHistory();
    const page = query.get('page');
    const searchQuery = query.get('searchQuery');

    const currentId = useSelector((state) => state.currentid);

    const classes = useStyles();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])

    return (<Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.MainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        fullWidth
                        value="TEST"
                        onChange={()=> {}} 
                        />

                    </AppBar>
                    <Form />
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination />
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    </Grow>)
};

export default Home;