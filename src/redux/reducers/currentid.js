import { FETCHID, CHANGEID } from '../constants/currentIdStates';

export default (state = null, action) => {
    switch (action.type) {
        case FETCHID:
            return state;
        case CHANGEID:
            return action.payload;
        default:
            return state;
    }
}