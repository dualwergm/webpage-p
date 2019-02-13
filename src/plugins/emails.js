const nodemailer = require("nodemailer");
const buildMsg = require('./buildMsg');
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(jData){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'piensatech@gmail.com', // generated ethereal user
      pass: 'piensatech0214' // generated ethereal password
    }
  });

  const msg = buildMsg(jData);

  let mailOptions = {
    from: '"Piensatech 🤖" <piensatech@gmail.com>', // sender address
    to: "dualwergm@gmail.com, dualwergm@hotmail.com", // list of receivers
    subject: "Solicitud de información 😉 ✔", // Subject line
    text: msg // plain text body
    //html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
}

module.exports = sendMail;
