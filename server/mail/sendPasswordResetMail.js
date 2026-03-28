import { client } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./mailTemplates.js";
import { sender } from "./mailtrap.config.js";


const sendPasswordResetEmail = async (email, url) => {
    const recipient = [{email}];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
            category: "Password Reset"
        })

        console.log("Email sent successfully");
    } catch (error) {
        console.log('Error:', error.message); 
        throw new Error(error);
    }
};

export default sendPasswordResetEmail;