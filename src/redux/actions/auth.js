import { LOGIN, LOGOUT } from "../constants/loginStates";

import * as api from '../../api';

// Action Creators

export const authenticate = (googleCode) => async (dispatch) => {
	try {

		const { data } = await api.signIn(googleCode);

		dispatch({ type: LOGIN, data: data });

	} catch (error) {
		console.log(error);
	}
};

export const logout = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT});
	} catch (error) {
		console.log(error);
	}
}

export const signin = (formData,navigate) => async (dispatch) => {
	try {

		const { data } = await api.signIn(formData);

		dispatch({type: LOGIN, data: data});
		navigate("/");
		
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData,navigate) => async (dispatch) => {
	try {

		const { data } = await api.signUp(formData);

		dispatch({ type: LOGIN, data: data });

		navigate("/");
				

	} catch (error) {
		console.log(error);
	}
};