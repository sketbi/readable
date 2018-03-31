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


export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data).catch(e => e);

    
export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
      .then(res => res.json())
      .then(data => data);
  
export const addPost = (post) => fetch(`${api}/posts`, {
  method: 'POST', 
  body: JSON.stringify(post),
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
})}).then(res => res.json())
.then(data => data);



export const getPostDetails = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
      .then(res => res.json())
      .then(data => data);
  

