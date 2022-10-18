import { combineReducers } from 'redux';

import posts from './posts';
import currentid from './currentid';
import currentuser from "./currentuser";

import auth from './auth';

export default combineReducers({ posts, currentid, auth, currentuser });

