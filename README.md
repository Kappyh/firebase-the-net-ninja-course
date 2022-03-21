## Setup

Install dependencies

```
npm install
```

Configure the firebase in the console, copy and paste the
web config object to the file index.js
Example:
````
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
````

OR
This project suport env configuration, checkout the file .env-example,
include just the values for the firabase variables.

Run the project

```
npm start
```