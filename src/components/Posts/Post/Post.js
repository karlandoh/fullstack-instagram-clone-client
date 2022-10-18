import React from 'react';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

import { ThumbUpAlt, ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";

import { Delete } from '@mui/icons-material';

import { MoreHoriz } from '@mui/icons-material';

import useStyles from './styles.js';

import moment from 'moment';

import { useDispatch , useSelector } from 'react-redux';
import { likePost, deletePost } from '../../../redux/actions/posts';

import { changeCurrentId } from '../../../redux/actions/currentid';


const Post = ({ post }) => {

    
    const classes = useStyles();

    const use_dispatch = useDispatch();

    const user = useSelector(state=>state.currentuser);



    const Likes = () => {
        if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
            <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };


    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component="div" />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result.sub === post.creator || user?.result._id === post.creator) && (
            <div className={classes.overlay2}> {/* This is the only button that will change the setCurrentId ! */}

            <Button style={{ color: 'white' }} size="small" onClick={() => { use_dispatch(changeCurrentId(post._id)) }}>
                <MoreHoriz fontSize="default" />
            </Button>
        </div>
                )}


            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography className={classes.title} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" disabled={!user?.result} onClick={() => { use_dispatch(likePost(post._id)); }}>
                    <Likes />
                </Button>

                {(user?.result.sub === post.creator || user?.result._id === post.creator) && (
                <Button size="small" color="primary" onClick={() => { use_dispatch(deletePost(post._id)); }}>
                <Delete fontSize="small" />
                Delete
            </Button>
                )}

                



            </CardActions>


        </Card>
    )
}

export default Post;