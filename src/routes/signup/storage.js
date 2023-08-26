// storage.js

// Load existing user data from localStorage or initialize an empty array
// localStorage.setItem('users', JSON.stringify([]));  
// const users = JSON.parse(localStorage.getItem('users') || '[]');
// var users = []
// Try running this in a clean HTML file

// localStorage.setItem('test', 'Hello, localStorage!');

// const storedValue = localStorage.getItem('test');
// console.log(storedValue); // Should output: "Hello, localStorage!"


export function addUser(user) {
  // localStorage.clear();
  const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users or initialize as an empty array
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users)); // Store the array as a JSON string
  console.log(users);
}

export function verifyUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  for (const user of users) {
    if (user.email === username && user.password === password) {
      return true;
    }
  }
  return false;
}

