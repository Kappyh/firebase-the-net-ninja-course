import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from "firebase/firestore"


import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"

// salvar em um .env
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MSS_SENDING_ID,
    appId: process.env.APP_ID
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth =  getAuth();

// collection ref
const colRef = collection(db,'books')

// queries
const q = query(colRef, orderBy('createdAt'))


// get collection data
/*getDocs(colRef).then((snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id});
    })
    console.log(books);
}).catch(err=>{
    console.error(err.message)
})*/

// real time data with a querie
const unsubQueryDoc = onSnapshot(q, (snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id});
    })
    console.log(books);
})

// real time data without a querie
const unsubAllDoc = onSnapshot(colRef, (snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id});
    })
    console.log(books);
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title:addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(()=>{
        addBookForm.reset();
    })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get the ref for the doc to be deleted XhFIFNR8joVnye3Z3Nek
    const docRef = doc(db, 'books',deleteBookForm.id.value);

    deleteDoc(docRef).then(()=>{
        deleteBookForm.reset();
    }).catch(err=>{
        console.error(err.message)
    })
})

// get a single document
const docRef = doc(db, 'books', '1I2zYQbyoYYqamc1xiC4');

/*getDoc(docRef)
.then((doc)=>{
    console.log(doc.data(), doc.id);
})*/

const unsubDocRef =  onSnapshot(docRef, (doc)=>{
    console.log(doc.data(), doc.id)
})

// update one document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const docRef = doc(db, 'books', updateForm.id.value);

    updateDoc(docRef,{
        title: 'update title'
    }).then(()=>{
        console.log('Success')
    }).catch(err=>{
        console.error(err.message)
    })
})

// firebase auth create user

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

// Login and logout
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('user signed out')
        })
        .catch(err => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user logged in:', cred.user)
            loginForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

// Subscribe User (listener for changes in the user status)
const unsubAuth = onAuthStateChanged(auth, (user)=>{
    console.log('user status changed: ', user)
})

// Unsubscribring

const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('unsubscribing...');
    unsubAllDoc();
    unsubAuth();
    unsubDocRef();
    unsubQueryDoc();
})