const nodemailer = require('nodemailer');
const express = require("express");
const cron = require('node-cron');
const router = express.Router();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
const axios = require("axios");

async function getquotes(){
    const url=`https://chasers-back.onrender.com/quote`;
    const res= await axios.get(url) ;
    return res.data.content;    
} 
const quote = getquotes();

let arremail = [];
console.log(arremail);
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'chapterchasers4@gmail.com',
    pass: 'ltwdamtoadkfzmvf'
  },
});
const sendDailyEmail = (transporter) => {
  const mailOptions = {
    from: 'chapterchasers4@gmail.com',
    to: arremail,
    subject: 'YOUR Quotes',
    text: `This is your daily email! ${quote}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Daily email sent: ' + info.response);
    }
  });
};
cron.schedule('0 12 * * *', () => {
 try{ sendDailyEmail(transporter);}
 catch(e){console.log(e)};
});


router.post('/subscribe', (req, res) => {
  const {email} = req.body;
    arremail.push(email);
  const mailOptions = {
    from: 'chapterchasers4@gmail.com',
    to: email,
    subject: 'Subscription Successful',
    text: `You are now subscribed to our newsletter! ${quote}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Subscription successful! Check your email.');
    }
  });
});

module.exports=router;