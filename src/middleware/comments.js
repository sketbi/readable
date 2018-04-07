
import {api,headers} from './api'
import {updatedPost,hasErrored,isLoading} from '../actions'
  
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
                }).then(() => {
                    return dispatch(updatedPost(post));
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
            .then((data) => {
                if(post.commentCount >0){
                    post.comments.push(data);
                    post.commentCount = post.comments.length
                }else{
                     post.commentCount =  1;
                     post["comments"] = [data]; 
                }
            }).then(() =>{
                return dispatch(updatedPost(post));
            }).catch(() => dispatch(hasErrored(true)));
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
                    .then((data) => {
                        if(option === 'upVote'){
                            comment.voteScore =  comment.voteScore + 1;
                            post.comments = updatePostComment(post.comments,comment); 
                        }else{
                            comment.voteScore =  comment.voteScore - 1;
                            post.comments = updatePostComment(post.comments,comment); 
                        }
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
    console.log("comment in updateComment action --> "+JSON.stringify(comment));
    return (dispatch) => {
        fetch(`${api}/comments/${comment.id}`,{
            method: 'POST', 
            body: JSON.stringify(comment),
            headers: headers 
        }).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
        }).then((response) => response.json())
           .then((data) => {
                post.comments = updatePostComment(post.comments,comment); 
            }).then(() =>{
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

