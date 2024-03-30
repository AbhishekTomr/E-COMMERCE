import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";

export const sendMail = async (email: string, verificationCode: any) => {
  try {
    const transporter = nodemailer.createTransport(
      sendGridTransport({
        auth: {
          api_key:
            "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",
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
