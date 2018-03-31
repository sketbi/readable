

//import * as ReadableAPIUtil from '../utils/api'

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
  }

  

// categories action
export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES';



// posts actoins
export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';


// comments actions
export const RECEIVED_POST_COMMENTS = 'RECEIVED_POST_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';


export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';


export const HAS_ERRORED = 'HAS_ERRORED';
export const IS_LOADING = 'IS_LOADING';

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

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(hasErrored(true));
        }, 5000);
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


  export function addPost(post){
    return {
        type : ADD_POST,
        post
    }
 }
 

 export const updatedPost = post =>({
    type: UPDATE_POST,
    post
  });
  

 export function deletePost(post){
     return {
         type : DELETE_POST,
         post
     }
  }

  

export function GetAllPosts() {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/posts`, { headers })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((posts) => {
                return dispatch(receivedPosts(addCommentsArray(posts)));
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}




export function GetAllGategories() {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/categories`, { headers })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(receivedCategories(data.categories)))
            .catch(() => dispatch(hasErrored(true)));
    };
}



export function addNewPost(post) {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/posts`,{
            method: 'POST', 
            body: JSON.stringify(post),
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                post.comments =[];
                post.id = data.id;
          
            }).then(() =>{
               return dispatch(addPost(post));
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}

export function updatePost(post) {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/posts/${post.id}`,{
            method: 'PUT', 
            body: JSON.stringify(post),
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                //data.comments =[];
                dispatch(updatedPost(post));
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}

export function votePost(post,option) {
    return (dispatch) => {
        if (option === "upVote" || option === "downVote"){
                fetch(`${api}/posts/${post.id}`,{
                    method: 'POST', 
                    body: JSON.stringify({"option" :option}),
                    headers: headers 
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response;
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        post.voteScore = data.voteScore
                    }).then(() =>{
                        return dispatch(updatedPost(post));
                    })
                    .catch(() => dispatch(hasErrored(true)));
        }else{
            return  dispatch(hasErrored(true));
        } 

    }
}
 

export function deleteExistingPost(post) {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/posts/${post.id}`,{
            method: 'DELETE',
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((post) => dispatch(deletePost(post)))
            .catch(() => dispatch(hasErrored(true)));
    };

}


export function getCommentForPost(post) {
    return (dispatch) => {
            dispatch(isLoading(true));
            fetch(`${api}/posts/${post.id}/comments`, { headers })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(isLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((comments) =>  {
                    post.commentCount = comments.length;
                    post["comments"] = comments;
                    return dispatch(updatedPost(post));
                }).then(() => {
                   
                })
                .catch(() => dispatch(hasErrored(true)));
    }
}




export function addNewComment(post,comment) {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/comments`,{
            method: 'POST', 
            body: JSON.stringify(comment),
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((comment) => {
                if(post.commentCount >0){
                    post.comments.push(comment);
                    post.commentCount = post.comments.length
                    return dispatch(updatedPost(post));
                }else{
                    post.commentCount =  1;
                     post["comments"] = [comment]; 
                }
               
            }).then(() =>{
                return dispatch(updatedPost(post));
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}


export function voteComment(post,comment,option) {
    return (dispatch) => {
        if (option === "upVote" || option === "downVote"){
                fetch(`${api}/comments/${comment.id}`,{
                    method: 'POST', 
                    body: JSON.stringify({"option" :option}),
                    headers: headers 
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response;
                    })
                    .then((response) => response.json())
                    .then((comment) => {
                        post.comments = updatePostComment(post.comments,comment); 
                    }).then(() =>{
                        return dispatch(updatedPost(post));
                    })
                    .catch(() => dispatch(hasErrored(true)));
        }else{
            return  dispatch(hasErrored(true));
        } 

    }
 
}

export function updateComment(post,comment) {
    return (dispatch) => {
        fetch(`${api}/comments/${comment.id}`,{
            method: 'POST', 
            body: JSON.stringify(comment),
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((comment) => {
                post.comments = updatePostComment(post.comments,comment); 
                return dispatch(updatedPost(post));
            })
            .catch(() => dispatch(hasErrored(true)));
    }
 
}



export function deleteComment(post,comment) {
    return (dispatch) => {
        dispatch(isLoading(true));
        fetch(`${api}/comments/${comment.id}`,{
            method: 'DELETE', 
            body: JSON.stringify(comment),
            headers: headers 
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((comment) => {
                post.comments = deleteCommentFromArray(post.comments,comment);
                post.commentCount = post.comments.length;
                return dispatch(updatedPost(post));
               
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}



function updatePostComment(comments,comment){
    return comments.map( (stateComment) => {
        if(stateComment.id !== comment.id) {
            return stateComment;
        }else{
          return comment;
        }   
    });
}

function deleteCommentFromArray(comments,comment){
    return comments.filter(e => e.id !== comment.id);
}

function addCommentsArray(posts){
    return posts.map( (post) => {
        post["comments"] = [];
        return post;
    });
}



