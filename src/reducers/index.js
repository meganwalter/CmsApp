import { combineReducers } from 'redux';
import PostsReducer from './reducers_ports';

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
