import * as ReadableAPIUtil from '../utils/api'

// categories action
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES';



// posts actoins
export const RECEIVED_POSTS = 'RECEIVED_POSTS';
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

export const receivedCategories= categories =>({
    type: RECEIVED_CATEGORIES,
    categories
  });

export const GetAllPosts = () => dispatch => (
    ReadableAPIUtil.getPosts().then(posts => dispatch(receivedPosts(posts)))

);

export const GetAllGategories = () => dispatch => (
    ReadableAPIUtil.getCategories().then(categories => dispatch(receivedCategories(categories)))
);


export const filterPosts = (category) => dispatch => (
    ReadableAPIUtil.getPostsByCategory(category).then(posts => dispatch(receivedPosts(posts)))
);

export const addNewPost = (post) => dispatch => (
    ReadableAPIUtil.addPost(post).then(() => dispatch(addPost(post)))
);


export function addPost(post){
   return {
       type : ADD_POST,
       post
   }
}

export function editPost(post){
   return {
       type : EDIT_POST,
       post
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