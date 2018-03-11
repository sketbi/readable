import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as ReadableAPIUtil from '../utils/api'

import {
  RECEIVED_POSTS,
  RECEIVED_CATEGORIES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions'


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
      {
        id : post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        category : post.category,
        timestamp : post.timestamp,
        voteScore : post.voteScore,
        deleted : post.deleted,
        commentCount : post.commentCount
       }
      ];
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
  routing: routerReducer,
  post: post,
  comment: comment,
  category : category
})

