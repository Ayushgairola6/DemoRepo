const { client } = require("../db.js");

const RecieveReviews = (req, res) => {
    try {
        const userID = req.user.id;
         console.log(req.user)
        if (!userID) { return res.status(400).json({ message: "User Id not found" }); }

        const { review } = req.body;
        // console.log(review);
        if (!review) { return res.status(401).json({ message: "All fields are mandatory" }); }
     
        const query =`INSERT INTO reviews (user_id,text) VALUES ($1,$2)`
        client.query(query, [userID, review], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
            if (result.rowCount === 0) {
                return res.status(400).json({ message: "error while receiving your feedback" });
            } else {
                return res.status(200).json({ message: "Review received successfully" });
            }
        });



    } catch (error) {
        console.log(error);
    }
}

exports.data = { RecieveReviews }