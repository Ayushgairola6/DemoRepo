
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
 require('dotenv').config()

const firebaseConfig = {
  apiKey:process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app); 


const uploadFile = async (file, path) => {
    try {
        if (!file || !file.buffer) {
            throw new Error("Invalid file object received. Ensure you're using Multer.");
        }

        const filename = file.originalname ? file.originalname : `file_${Date.now()}`; // ✅ Handle missing originalname
        const storageRef = ref(storage, `${path}/${Date.now()}_${filename}`);

        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        // console.log(filename,storageRef,uploadTask)
        await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress.toFixed(2)}% done`); // ✅ Ensure correct percentage
                },
                (error) => reject(error),
                () => resolve()
            );
        });

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};
module.exports ={app,uploadFile}