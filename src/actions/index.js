import * as ReadableAPIUtil from '../utils/api'

// posts actoins
export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';
export const FILTER_POSTS = 'FILTER_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'DELETE_POST';

// comments actions
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export const receivedPosts = posts =>({
  type: RECEIVED_POSTS,
  posts
});

export const setActiveCategory = category =>({
     type : SET_ACTIVE_CATEGORY,
     category
})

export const GetAllPosts = () => dispatch => (
    ReadableAPIUtil.getPosts().then(posts => dispatch(receivedPosts(posts)))

);


export const filterPosts = (category) => dispatch => (
    ReadableAPIUtil.getPostsByCategory(category).then(posts => dispatch(receivedPosts(posts)))
);

export function addPost({title,body,author,category,timestamp}){
   return {
       type : ADD_POST,
       title,
       body,
       author,
       category,
       timestamp
   }
}

export function editPost({id,title,body,author,category}){
   return {
       type : EDIT_POST,
       id,
       title,
       body,
       author,
       category
   }
}
export function deletePost({id,deleted}){
    return {
        type : DELETE_POST,
        id,
        deleted
    }
 }
 export function votePost({id,title,body,author,category}){
    return {
        type : VOTE_POST,
        id,
        title,
        body,
        author,
        category
    }
 }