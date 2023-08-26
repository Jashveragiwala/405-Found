// storage.js

// Load existing user data from localStorage or initialize an empty array
// localStorage.setItem('users', JSON.stringify([]));  
// const users = JSON.parse(localStorage.getItem('users') || '[]');
var users = []

export function addUser(user) {
  users.push(user);
//   localStorage.setItem('users', JSON.stringify(users));
}

export function verifyUser(username, password) {
  // Loop through the users array and check for a matching user
  for (const user of users) {
    if (user.email === username && user.password === password) {
      return true;
    }
  }
  return false;
}
