import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import {
  RECEIVED_CATEGORIES,
  RECEIVED_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  HAS_ERRORED,
  IS_LOADING,
} from '../actions'


export function hasErrored(state = false, action) {
  switch (action.type) {
      case HAS_ERRORED:
          return action.hasErrored;

      default:
          return state;
  }
}
export function isLoading(state = false, action) {
  switch (action.type) {
      case IS_LOADING:
          return action.isLoading;

      default:
          return state;
  }
}


function category(state=[],action){
  switch (action.type) {
    case RECEIVED_CATEGORIES :
    return action.categories; 
    default :
      return state;
  }
}

function post(state=[],action){
  const {post} = action;
  switch (action.type) {
    case RECEIVED_POSTS :
       if(action.posts){
        return action.posts; 
       }else{
         return null;
       }
    case ADD_POST :
    return [
      ...state,
       post
      ];
    case UPDATE_POST:
        return state.map( (statePost) => {
          if(statePost.id !== post.id) {
              return statePost;
          }else{
          return post
          }   
        });
      case DELETE_POST:
        return state.filter(e => e.id !== post.id);                  
      default :
        return state;
  }
}

function comment(state=[],action){
  return state;
}

export default combineReducers({
  routing: routerReducer,
  post: post,
  category : category,
  hasErrored : hasErrored,
  isLoading : isLoading
})

