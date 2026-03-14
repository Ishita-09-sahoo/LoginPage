import { VERIFICATION_EMAIL_TEMPLATE } from "./mailTemplates.js";
import { client,sender } from "./mailtrap.config.js";

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent", response);
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending verification mail: ${error}`);
    }
}

export default sendVerificationEmail;