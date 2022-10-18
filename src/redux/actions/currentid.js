import { FETCHID, CHANGEID } from '../constants/currentIdStates';

// Action Creators

export const getCurrentId = () => async (dispatch) => {

    try {
        dispatch({ type: FETCHID });
    }
    catch (error) {
        console.log(error);
    }
}

export const changeCurrentId = (id) => async (dispatch) => {

    try {
        dispatch({ type: CHANGEID , payload: id })
    }
    catch (error) {
        console.log(error);
    }
}