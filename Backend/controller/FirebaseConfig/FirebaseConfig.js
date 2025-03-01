
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytesResumable, getDownloadURL ,deleteObject } = require("firebase/storage");
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

        const filename = file.originalname ? file.originalname : `file_${Date.now()}`; 
        const storageRef = ref(storage, `${path}/${Date.now()}_${filename}`);

        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        // console.log(filename,storageRef,uploadTask)
        await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

// delete file

const deleteFile = async (fileUrl) => {
    try {
        if (!fileUrl) throw new Error("No file URL provided.");

        // Extract the file path from the Firebase Storage URL
        const decodedUrl = decodeURIComponent(fileUrl);
        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/`; 
        if (!decodedUrl.startsWith(baseUrl)) throw new Error("Invalid Firebase URL.");

        const path = decodedUrl.replace(baseUrl, "").split("?")[0]; // Get path from URL

        // Create a reference to the file
        const fileRef = ref(storage, path);

        // Delete the file
        await deleteObject(fileRef);
        
        return { success: true, message: "File deleted successfully" };
    } catch (error) {
        console.error("Error deleting file:", error);
        return { success: false, message: error.message };
    }
};


module.exports ={app,uploadFile,deleteFile}