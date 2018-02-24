import { combineReducers } from 'redux'
import * as ReadableAPIUtil from '../utils/api'

import {
  RECEIVED_POSTS,SET_ACTIVE_CATEGORY,ADD_POST,EDIT_POST,DELETE_POST,VOTE_POST,
  ADD_COMMENT,EDIT_COMMENT,DELETE_COMMENT,VOTE_COMMENT
} from '../actions'


function category(state={name:'All'},action){
  switch (action.type) {
    case SET_ACTIVE_CATEGORY :
      return action.category; 
    default :
      return state;
  }
}

function post(state=[],action){
  switch (action.type) {
    case RECEIVED_POSTS :
       if(action.posts){
        return action.posts; 
       }else{
         return null;
       }
    default :
      return state;
  }
}

function comment(state=[],action){
  switch (action.type) {
    case ADD_COMMENT :
      return state;
    default :
      return state;
  }
}

export default combineReducers({
  post: post,
  comment: comment,
  category : category
})

