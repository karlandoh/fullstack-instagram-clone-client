import React from 'react';

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

import { useNavigate, useLocation } from 'react-router-dom';

import ChipInput from 'material-ui-chip-input';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import { getPosts } from '../../redux/actions/posts';

import Pagination from '../Pagination/Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {

    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page');
    const searchQuery = query.get('searchQuery');

    const currentId = useSelector((state) => state.currentid);

    const classes = useStyles();

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId])

    const searchPost = () => {
        if(search.trim()){
            // dispatch -> fetch search post
            history("/");
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag)=> tag!== tagToDelete));

    return (<Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        onKeyPress={handleKeyPress}
                        fullWidth
                        value={search}
                        onChange={(e)=> {setSearch(e.target.value)}} 
                        />
                    <ChipInput
                    style={{margin: '10px 0'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined" />

                    <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>

                    </AppBar>
                    <Form />
                    <Paper elevation={6}>
                        <Pagination />
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    </Grow>)
};

export default Home;