import React, { useState, useEffect } from "react";

import { TextField, Button, Typography, Paper } from "@mui/material";

import FileBase from "react-file-base64";
import useStyles from "./styles";

import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../redux/actions/posts";
import { changeCurrentId } from "../../redux/actions/currentid";

const Form = () => {

    const user = useSelector((state) => state.currentuser);
	const currentId = useSelector((state) => state.currentid);
	const current_post_information = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //I have a button that manually sets the current ID! It then fetches ALL the data for it!

	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});


	const classes = useStyles();
	const use_dispatch = useDispatch();

    
	useEffect(() => {
		//If the post doesnt equal null, fill the post data with the information provided.
		if (current_post_information !== null) {
			setPostData(current_post_information);
		}
	}, [current_post_information]);
    
	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId === null) {
			use_dispatch(createPost({ ...postData, name: user?.result?.name }));
		} else {
			use_dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		}

		clear();
	};

	const clear = () => {
		use_dispatch(changeCurrentId(null));
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	console.log(postData);

    if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories! You also need to sign in
					to like other people's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? "Editing" : "Creating"} a Memory
				</Typography>

				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>

				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
					<Button
						className={classes.buttonSubmit}
						variant="outlined"
						color="primary"
						size="large"
						type="submit"
						fullWidth
					>
						Submit
					</Button>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={clear}
						fullWidth
					>
						Clear
					</Button>
				</div>
			</form>
		</Paper>
	);
};

export default Form;
