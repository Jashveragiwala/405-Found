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
    // users.push(user);
    // console.log(users);
    const jsonObject = JSON.stringify(user);
    localStorage.setItem('users',JSON.parse(jsonObject));
    console.log(localStorage.getItem('users'));
}

export function verifyUser(username, password) {
  // Loop through the users array and check for a matching user
  const users = localStorage.getItem('users');
  console.log(users[0]);
  for (const user of users) {
    if (user.email == username && user.password == password) {
      return true;
    }
  }
  return false;
}
