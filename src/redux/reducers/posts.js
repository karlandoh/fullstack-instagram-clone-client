import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...state, action.payload];
        case UPDATE: //Replace the existing post with the new post.
        case LIKE: //Replace the existing post with the new post.
            return state.map((post) => post._id === action.payload._id ? action.payload : post) //Replace the existing post with the new post.

        case DELETE:
            return state.filter((post) => post._id !== action.payload); //Only keep those that DONT equal the deleted post.
        default:
            return state;
    }
}