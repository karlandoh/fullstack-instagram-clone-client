import { FETCHUSER, CHANGEUSER } from "../constants/currentIdStates";

// Action Creators

export const getCurrentUser = () => async (dispatch) => {
	try {
		dispatch({ type: FETCHUSER });
	} catch (error) {
		console.log(error);
	}
};

export const changeCurrentUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: CHANGEUSER, payload: id });
	} catch (error) {
		console.log(error);
	}
};
