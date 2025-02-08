// const initializeApp = require("firebase/App");
// const {getAuth ,createUseWithEmailAndPassword,signInWithEmailAndPassword} = require("firebase/auth");
// const {getFireStore,doc,getDoc,setDoc} = require("firebase/firestore");
// const {getStorage,ref,uploadBytes,getDownloadURL} = require("firebase/storage");

// // fireabse config data
// const firebaseConfig = {
// 	apiKey:"AIzaSyDL7G_0CWWRFqKmH1XP1-iifbFAN1fxeBI",
// 	authDomain:"registration-form-71d05.firebaseapp.com",
// 	projectId:"registration-form-71d05",
// 	StorageBucket:"registration-form-71d05.firebasestorage.app",
// 	messagingSenderId:"346762239512",
// 	appId:"1:346762239512:web:6bd2a0ed85b49cb2ed6d6d",
// }


// const app = initializeApp(firebaseConfig);

// // initiating the fireabse services
// const auth = getAuth(app);
// const db = getFireStore(app);
// const storage = getStore(app);


// exports.data = {auth,createUseWithEmailAndPassword,signInWithEmailAndPassword,db,doc,getDoc,setDoc,storage,ref,uploadBytes,getDownloadURL};

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const env = require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.firebaseapiKey,
  authDomain: process.env.firebaseauthDomain,
  projectId: process.env.firebaseprojectId,
  storageBucket: process.env.firebasestorageBucket,
  messagingSenderId: process.env.firebasemessagingSenderId,
  appId: process.env.firebaseappId,
  
};

const app = initializeApp(firebaseConfig)

const storage = getStorage(app);

module.exports =   {storage};