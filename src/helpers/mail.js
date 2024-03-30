import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";

export const sendMail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport(
      sendGridTransport({
        auth: {
          api_key:
          `${process.env.SENDGRID_API_KEY}`,
        },
      })
    );

    const mailOptions = {
      from: "imabhishek111@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `<p>this is your vairfication code: ${verificationCode}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: ", mailResponse);
  } catch (err) {
    console.error(err);
  }
};
