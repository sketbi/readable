import {HAS_ERRORED,IS_LOADING,RECEIVED_POSTS,RECEIVED_CATEGORIES,ADD_POST,UPDATE_POST,DELETE_POST} from './actionTypes'


export function hasErrored(bool) {
    return {
        type: HAS_ERRORED,
        hasErrored: bool
    };
}
export function isLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool
    };
}
export const receivedPosts = posts =>({
  type: RECEIVED_POSTS,
  posts
});

export const receivedCategories= categories =>({
    type: RECEIVED_CATEGORIES,
    categories
  });

 export const addPost = post =>({
    type: ADD_POST,
    post
});

export const updatedPost = post =>({
    type: UPDATE_POST,
    post
});

export const deletePost = post =>({
    type: DELETE_POST,
    post
});


  



