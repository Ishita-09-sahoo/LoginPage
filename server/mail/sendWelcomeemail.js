import { client, sender } from "./mailtrap.config.js";

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "63f87865-6551-4c73-8626-a583a4153573",
      template_variables: {
        company: "MY SWEET ABODE",
        name: name,
      },
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error sending welcome mail: ${error}`);
  }
};

export default sendWelcomeEmail;