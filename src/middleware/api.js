

export const api = 'http://localhost:3001';



// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

 export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
  }


