
import {api,headers} from './api'
import {receivedPosts,addPost,updatedPost,deletePost,hasErrored,isLoading} from '../actions'


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
                data.comments =[];
                return dispatch(addPost(data));
            }).catch(() => dispatch(hasErrored(true)));
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
function addCommentsArray(posts){
    return posts.map( (post) => {
        post["comments"] = [];
        return post;
    });
}


