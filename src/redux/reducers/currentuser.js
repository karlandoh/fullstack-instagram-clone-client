import { FETCHUSER, CHANGEUSER } from "../constants/currentIdStates";

export default (state = JSON.parse(localStorage.getItem('profile')) , action) => {
	switch (action.type) {
		case FETCHUSER:
			return state;
		case CHANGEUSER:
			return action.payload;
		default:
			return state;
	}
};