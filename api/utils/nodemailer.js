const nodemailer = require("nodemailer");
const {config}=require("@api/config/config")
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
    auth: {
        user: config.myEmail,
        pass: config.emailPassword
    },
  secure: true,
 
});

async function main() {
  const info = await transporter.sendMail({
    from: `"Miltondw 👻" < ${config.myEmail} >`, 
    to: "cdkcolombia1@gmail.com",
    subject: "Hello I'm Milton",
    text: "Hello, I'm Milton. I am reaching out to introduce myself and express my interest in connecting with you.", 
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p style="font-family: Arial, sans-serif; color: #333; font-size:23px;">Hello,</p>
        <p>I'm Milton. I am reaching out to introduce myself and express my interest in connecting with you.</p>
        <p>Looking forward to hearing from you.</p>
        <p>Best regards,</p>
        <p>Milton</p>
      </div>
    ` 
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
