const client = require("./db.js");

const queryFunction = async () => {
    // const query = `
    //     INSERT INTO quizquestions (category, question) VALUES
    //     ('Hobbies/Lifestyle', 'How do you like to spend your free time?'),
    //     ('Hobbies/Lifestyle', 'How important is it for you and your partner to have similar hobbies?'),
    //     ('Politics', 'How do you feel about discussing politics with your partner?'),
    //     ('Politics', 'How important is it that you and your partner share similar political beliefs?'),
    //     ('Emotional Maturity/Support', 'How do you react when your partner is emotionally distressed?'),
    //     ('Emotional Maturity/Support', 'How comfortable are you with showing vulnerability in a relationship?'),
    //     ('Mental Stability/Support', 'How do you typically handle stress or anxiety?'),
    //     ('Mental Stability/Support', 'How do you support your partner when they are struggling mentally or emotionally?'),
    //     ('Spirituality/Religion', 'How important is spirituality or religion in a relationship for you?'),
    //     ('Spirituality/Religion', 'How comfortable are you with a partner who practices a different religion or spirituality than you?'),
    //     ('Finances', 'How do you prefer to handle finances in a relationship?'),
    //     ('Finances', 'What’s your approach to budgeting and saving in a relationship?'),
    //     ('Conflict Resolution', 'How do you handle disagreements with your partner?'),
    //     ('Conflict Resolution', 'How do you feel about compromise in a relationship?'),
    //     ('Intimacy/Romanticism', 'How do you define romantic intimacy in a relationship?'),
    //     ('Intimacy/Romanticism', 'How do you feel about public displays of affection (PDA)?'),
    //     ('Education', 'How important is a partner’s level of education to you?'),
    //     ('Education', 'How do you view lifelong learning in a relationship?'),
    //     ('Goals', 'How important is it for you and your partner to share long-term goals?'),
    //     ('Goals', 'How do you feel about supporting each other’s individual goals?'),
    //     ('Family/Friends', 'How important is it to have a strong relationship with your partner’s family?'),
    //     ('Family/Friends', 'How do you feel about balancing family time and couple time?'),
    //     ('Culture', 'How important is cultural compatibility in a relationship?');
    // `;
const query = `SELECT * FROM quiz_response`
    try {
        const res = await client.query(query);
        console.log(`got ${res.rows[0]} rows.`);
    } catch (err) {
        console.error("Error inserting data:", err);
    }
};

queryFunction();
