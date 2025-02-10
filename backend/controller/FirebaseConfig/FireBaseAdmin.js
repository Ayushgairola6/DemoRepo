const admin = require('firebase-admin');
const crypto = require("crypto");
 require("dotenv").config();
 const serviceAccountjson = Buffer.from(process.env.SERVICE_ACCOUNT_KEY,'base64').toString('utf-8')
const serviceAccount = JSON.parse(serviceAccountjson);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "registration-form-71d05.firebasestorage.appshot.com"
})

// INSERT INTO users ( name, images, about, location, interests ,email, hashed_password,gender,relationship_goals) VALUES
//   ( 'Alice Johnson', ARRAY['https://randomuser.me/api/portraits/women/1.jpg'], 'Passionate about tech and traveling.', 'New York, USA', ARRAY['Technology', 'Travel', 'Photography'],'demo1@gmail.com','12345','female','short-term'),
//   ( 'Michael Smith', ARRAY['https://randomuser.me/api/portraits/men/2.jpg'], 'Loves coding and coffee.', 'San Francisco, USA', ARRAY['Programming', 'Gaming', 'Music'],'demo2@gmail.com','12345','male','marriage'),
//   ( 'Sophia Williams', ARRAY['https://randomuser.me/api/portraits/women/3.jpg'], 'Avid reader and aspiring writer.', 'Toronto, Canada', ARRAY['Reading', 'Writing', 'Poetry'],'demo3@gmail.com','12345','female','short-term'),
//   ( 'Daniel Brown', ARRAY['https://randomuser.me/api/portraits/men/4.jpg'], 'Fitness enthusiast and outdoor explorer.', 'Sydney, Australia', ARRAY['Fitness', 'Hiking', 'Cycling'],'demo4@gmail.com','12345','male','marriage'),
//   ('Emma Davis', ARRAY['https://randomuser.me/api/portraits/women/5.jpg'], 'Loves painting and digital art.', 'Berlin, Germany', ARRAY['Painting', 'Digital Art', 'Design'],'demo5@gmail.com','12345','female','short-term'),
//   ( 'James Miller', ARRAY['https://randomuser.me/api/portraits/men/6.jpg'], 'Software engineer by day, guitarist by night.', 'London, UK', ARRAY['Coding', 'Music', 'Guitar'],'demo6@gmail.com','12345','male','marriage'),
//   ( 'Olivia Wilson', ARRAY['https://randomuser.me/api/portraits/women/7.jpg'], 'Food lover and aspiring chef.', 'Paris, France', ARRAY['Cooking', 'Baking', 'Food Blogging'],'demo7@gmail.com','12345','female','casual'),
//   ( 'Liam Anderson', ARRAY['https://randomuser.me/api/portraits/men/8.jpg'], 'Entrepreneur and startup enthusiast.', 'Tokyo, Japan', ARRAY['Business', 'Startups', 'Investing'],'demo8@gmail.com','12345','male','marriage'),
//   ( 'Ava Thomas', ARRAY['https://randomuser.me/api/portraits/women/9.jpg'], 'Yoga instructor and mindfulness coach.', 'Bali, Indonesia', ARRAY['Yoga', 'Meditation', 'Wellness'],'demo9@gmail.com','12345','female','casual'),
//   ( 'Benjamin Martinez', ARRAY['https://randomuser.me/api/portraits/men/10.jpg'], 'Avid traveler and documentary filmmaker.', 'Los Angeles, USA', ARRAY['Travel', 'Filmmaking', 'Photography'],'demo10@gmail.com','12345','male','marriage'),
//   ( 'Noah White', ARRAY['https://randomuser.me/api/portraits/men/11.jpg'], 'Blockchain enthusiast and investor.', 'Singapore', ARRAY['Blockchain', 'Finance', 'Tech'],'demo11@gmail.com','12345','female','short-term'),
//   ( 'Charlotte Green', ARRAY['https://randomuser.me/api/portraits/women/12.jpg'], 'Dancer and fitness coach.', 'Madrid, Spain', ARRAY['Dancing', 'Fitness', 'Music'],'demo12@gmail.com','12345','male','marriage'),
//   ('Ethan Hall', ARRAY['https://randomuser.me/api/portraits/men/13.jpg'], 'Science fiction fan and amateur astronomer.', 'Austin, USA', ARRAY['Astronomy', 'Sci-Fi', 'Writing'],'demo13@gmail.com','12345','female','casual'),
//   ('Amelia Wright', ARRAY['https://randomuser.me/api/portraits/women/14.jpg'], 'Blogger and digital nomad.', 'Lisbon, Portugal', ARRAY['Blogging', 'Travel', 'Photography'],'demo14@gmail.com','12345','male','casual'),
//   ( 'Mason Scott',ARRAY ['https://randomuser.me/api/portraits/men/15.jpg'], 'Mechanical engineer and car enthusiast.', 'Detroit, USA', ARRAY['Cars', 'Engineering', 'Racing'],'demo15@gmail.com','12345','female','short-term'),
//   ( 'Isabella Baker', ARRAY['https://randomuser.me/api/portraits/women/16.jpg'], 'Fashion designer and stylist.', 'Milan, Italy', ARRAY['Fashion', 'Styling', 'Art'],'demo16@gmail.com','12345','male','marriage'),
//   ( 'Elijah Carter', ARRAY['https://randomuser.me/api/portraits/men/17.jpg'], 'Finance expert and crypto investor.', 'Zurich, Switzerland', ARRAY['Finance', 'Cryptocurrency', 'Business'],'demo17@gmail.com','12345','female','marriage'),
//   ( 'Mia Perez', ARRAY['https://randomuser.me/api/portraits/women/18.jpg'], 'Health coach and nutritionist.', 'Seoul, South Korea', ARRAY['Health', 'Fitness', 'Nutrition'],'demo19@gmail.com','12345','male','casual'),
//   ( 'Lucas Edwards', ARRAY['https://randomuser.me/api/portraits/men/19.jpg'], 'Startup mentor and angel investor.', 'Berlin, Germany', ARRAY['Business', 'Startups', 'Investing'],'demo20@gmail.com','12345','female','casual'),
//   ( 'Harper Collins', ARRAY['https://randomuser.me/api/portraits/women/20.jpg'], 'Animal rights activist and vegan chef.', 'Amsterdam, Netherlands', ARRAY['Activism', 'Vegan Cooking', 'Nature'],'demo21@gmail.com','12345','male','marriage'),
//   ( 'Henry Rodriguez',ARRAY ['https://randomuser.me/api/portraits/men/21.jpg'], 'Gamer and live streamer.', 'Los Angeles, USA', ARRAY['Gaming', 'Streaming', 'Tech'],'demo22@gmail.com','12345','female','short-term'),
//   ( 'Grace Simmons',ARRAY ['https://randomuser.me/api/portraits/women/22.jpg'], 'Human rights lawyer and writer.', 'Washington, USA', ARRAY['Law', 'Writing', 'Activism'],'demo23@gmail.com','12345','male','short-term'),
//   ( 'Jack Torres',ARRAY ['https://randomuser.me/api/portraits/men/23.jpg'], 'Surfer and environmentalist.', 'Gold Coast, Australia', ARRAY['Surfing', 'Environment', 'Travel'],'demo24@gmail.com','12345','female','friendship'),
//   ( 'Lily Foster',ARRAY ['https://randomuser.me/api/portraits/women/24.jpg'], 'Podcaster and media creator.', 'New York, USA', ARRAY['Podcasting', 'Media', 'Tech'],'demo25@gmail.com','12345','male','friendship'),
//   ( 'Wyatt Hughes', ARRAY['https://randomuser.me/api/portraits/men/25.jpg'] ,'Filmmaker and cinematographer.', 'Toronto, Canada', ARRAY['Filmmaking', 'Photography', 'Music'],'demo26@gmail.com','12345','female','friendship'),
//   ( 'Ella Bennett', ARRAY['https://randomuser.me/api/portraits/women/26.jpg'], 'Art curator and history buff.', 'Rome, Italy', ARRAY['Art', 'History', 'Museums'],'demo27@gmail.com','12345','male','marriage'),
//   ( 'Sebastian Russell', ARRAY['https://randomuser.me/api/portraits/men/27.jpg'], 'AI researcher and data scientist.', 'Boston, USA', ARRAY['AI', 'Machine Learning', 'Coding'],'demo28@gmail.com','12345','female','marriage'),
//   ( 'Zoe Patterson',ARRAY ['https://randomuser.me/api/portraits/women/28.jpg'], 'Wildlife photographer and explorer.', 'Cape Town, South Africa', ARRAY['Wildlife', 'Photography', 'Travel'],'demo29@gmail.com','12345','male','marriage');


const bucket = admin.storage().bucket();


const uploadToFirebase = async (file, path) => {
    try {
        const truncatedFileName = file.originalname.substring(0,10);
        const fileName = `${path}/${Date.now()}_${truncatedFileName}`;
        const storageRef = bucket.file(fileName);

        const stream = storageRef.createWriteStream({
            metadata: { contentType: file.mimetype },
        });

        await new Promise((resolve, reject) => {
            stream.on('error', reject);
            stream.on('finish', resolve);
            stream.end(file.buffer);
        });

        const downloadUrl = await storageRef.getSignedUrl({
            action: 'read',
            expires: Date.now() + 7 *24 * 60 *60 *1000 // store for a week 
        });

        // console.log('File uploaded:', downloadUrl);
        return downloadUrl[0];
    } catch (error) {
        console.error('Error uploading file to Firebase:', error);
        throw error;
    }
};

// function to delete media from firebase when a post is deleted 

const deleteImage = async (fileUrl,filePath) => {
    try {
        if (fileUrl) {
            const bucketName = "registration-form-71d05.firebasestorage.app";  
            // extracting the bucketName and its length from the fileUrl;
            const startIndex = fileUrl.indexOf(`${bucketName}/`) + `${bucketName}/`.length;
            const filePathEncoded = fileUrl.slice(startIndex, fileUrl.indexOf("?"));
            const filePath = decodeURIComponent(filePathEncoded);  
         
            const storageRef = bucket.file(filePath);
            await storageRef.delete();
            
        }
    } catch (error) {
        console.error('Error deleting file from Firebase:', error);
        throw error;
    }
};




module.exports = { admin, bucket, uploadToFirebase, deleteImage };