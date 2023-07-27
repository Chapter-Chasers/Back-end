const nodemailer = require('nodemailer');
const express = require("express");
const cron = require('node-cron');
const router = express.Router();
const clint = require('../../clint');



// const pg = require("pg");

// const DB = new pg.Client('postgres://chapter_chasers_user:S4qG9dcGm3Je5hyWFUbD9NLTX97JbPVK@dpg-ciuiha5iuiedpv0a0jo0-a.oregon-postgres.render.com/chapter_chasers?ssl=true');
// const {DB_URL} = require('../../config');

const axios = require("axios");

async function getquotes() {
  const url = `https://chasers-back.onrender.com/quote`;
  const res = await axios.get(url);
  return res.data.content;
}
///const qoute = await getquotes()


let emailarr = new Array();
let emailarr2 = new Array();
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'chapterchasers4@gmail.com',
    pass: 'ltwdamtoadkfzmvf'
  },
});

///////////////////
router.post('/send-feedback', (req, res) => {
  const { email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'chapterchasers4@gmail.com',
    subject: 'Feedback Form Submission',
    html: `<h1> \nFrom: ${email}\n\nMessage:\n${message} </h1> `
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.json({ message: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Thank you for your feedback!' });
    }
  });
});

////////////////////

const sendDailyEmail = async () => {
  try {
    const emailData = await clint.query('SELECT email FROM emails');
    const emailList = emailData.rows.map((row) => row.email);
    const quote = await getquotes();


    const mailOptions = {
      from: 'chapterchasers4@gmail.com',
      to: emailList.join(','),
      subject: 'YOUR Quotes',
      text: `This is your daily email! Your quote is: ${quote}`,
    };


    const info = await transporter.sendMail(mailOptions);
    console.log('Daily email sent:', info.response);
  } catch (error) {
    console.error('Error sending daily email:', error);
  }
};
cron.schedule('0 12 * * *', () => {
  sendDailyEmail();
});


router.post('/subscribe', (req, res) => {
  const { name, email } = req.body;

  // Perform proper error handling for database query
  const query = 'INSERT INTO emails (names, email) VALUES ($1, $2)';
  clint
    .query(query, [name, email])
    .then(() => {
      // Database query success
      console.log(email);
      const mailOptions = {
        from: 'chapterchasers4@gmail.com',
        to: email,
        subject: 'Subscription Successful',
        text: `Thank you ${name}! You are now subscribed to our newsletter!`,
      };

      // Ensure that the transporter is defined and initialized before using it
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('An error occurred while sending the email.');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).send('Subscription successful! Check your email.');
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred while processing the request.');
    });
});



module.exports = router;