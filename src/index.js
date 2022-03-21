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

// salvar em um .env
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()

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
onSnapshot(q, (snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id});
    })
    console.log(books);
})

// real time data without a querie
onSnapshot(colRef, (snapshot)=>{
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

onSnapshot(docRef, (doc)=>{
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