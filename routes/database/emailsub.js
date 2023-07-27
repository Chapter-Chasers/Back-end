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
  const { name, message } = req.body;
  const mailOptions = {
    from: "",
    to: 'chapterchasers4@gmail.com',
    subject: 'Feedback Form Submission',
    html: `<h1> \nFrom: ${name}\n\nMessage:\n${message} </h1> `
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

const sendDailyEmail = async (transporter) => {
  router.get("/get", (req, res) => {
    let sql = `SELECT email FROM emails`;
    clint.query(sql).then((emaildata) => {
      res.status(200).send(emaildata.rows);
      emailarr.push(emaildata.rows);
      emailarr[0].map((e) => {
        emailarr2.push(e.email);
      })
      console.log("we are inside");
    });
  });
  const serverUrl = 'http://localhost:3002/get';
  axios.get(serverUrl)
    .then((response) => {
      console.log('Response from server:', response.data);
      // Do something with the response data here
    })
    .catch((error) => {
      console.error('Error making GET request:');
    });
  // console.log('Error making GET request:' + emailarr2);
  const qoute = await getquotes()
  const mailOptions = {
    from: 'chapterchasers4@gmail.com',
    to: emailarr2,
    subject: 'YOUR Quotes',
    text: `This is your daily email! Your qoute is  ${qoute} `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Daily email sent: ' + info.response);
    }
  });
};
//0 12 * * *
//'*/20 * * * * *'
cron.schedule('0 12 * * *', () => {
  try { sendDailyEmail(transporter); }
  catch (e) { console.log(e) };
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