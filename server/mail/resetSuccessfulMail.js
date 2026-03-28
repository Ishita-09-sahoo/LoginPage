import { client } from "./mailtrap.config.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./mailTemplates.js";
import { sender } from "./mailtrap.config.js";


const sendPasswordResetEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Email sent successfully")
    } catch (error) {
        console.log('Error:', error.message); 
    }
};

export default sendPasswordResetEmail;